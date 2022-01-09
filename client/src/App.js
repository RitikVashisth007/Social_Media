import "./App.css";
import "antd/dist/antd.less";
import { Switch, Route } from "react-router-dom";
import routes from "./Provider/routes";
import MainLayout from "./Provider/MainLayout";
import AppProvider from "./Provider/AppProvider";
import LoginPage from "./views/Login";
import Register from "./views/Register";
import PrivateRoute from "./Provider/PrivateRoute";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path={["/chat", "/profile", "/settings", "/"]}>
          <AppProvider>
            <MainLayout>
              <PrivateRoute path="/" exact component={routes} />
              <PrivateRoute path="/profile" exact component={routes} />
              <PrivateRoute path="/chat" exact component={routes} />
            </MainLayout>
          </AppProvider>
        </Route>
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </div>
  );
}

export default App;
