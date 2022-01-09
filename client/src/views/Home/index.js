import React from "react";
import PostCard from "../../components/PostCard";
import { useQuery } from "@apollo/client";
import { GET_POST } from "../../graphql/Query/GetPosts";
import Masonry from "react-masonry-component";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./styles.module.css";

// Masory Options
const masonryOptions = {
  transitionDuration: 0,
};

const Home = ({user}) => {
  const { loading, data, error } = useQuery(GET_POST);
  return (
    <div className={styles.homePage}>
      <InfiniteScroll
        dataLength={!loading && data?.getPosts?.length}
        inverse={true}
        loader={loading && <div>loading</div>}
        className="flex flex-col-reverse h-full"
        scrollableTarget="scrollableDiv"
        scrollThreshold={"100%"}
        initialScrollY={0}
        style={{height:"100%"}}
      >
        <Masonry
          elementType={"ul"}
          className={styles.photolist}
          options={masonryOptions}
          disableImagesLoaded={false}
          updateOnEachImageLoad={false}
        >
          {data?.getPosts.map((post) => (
            <li className={styles.photoitem} key={post._id} >
              <PostCard post={post} user={user} />
            </li>
          ))}
        </Masonry>
      </InfiniteScroll>
    </div>
  );
};

export default Home;
