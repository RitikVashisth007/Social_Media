import { setContext } from '@apollo/client/link/context'
import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    split,
  } from "@apollo/client";
import { getMainDefinition } from '@apollo/client/utilities';
  import { WebSocketLink } from '@apollo/client/link/ws';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql'
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/graphql",
  options: {
    lazy: true,
    reconnect: true,
  },
});

const authLink = setContext(() => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const token = userInfo?.token
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);


const Client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});


export default Client