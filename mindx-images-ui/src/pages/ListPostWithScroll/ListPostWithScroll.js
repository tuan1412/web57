import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "../../components/Card/Card";
import axios from "../../api/request";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
 
const MAX_ITEMS_PER_PAGE = 4;

export default function ListPost() {
  const [postData, setPostData] = React.useState({
    status: "idle",
    data: {
      posts: [],
      total: 0
    },
  });
  const [skip, setSkip] = React.useState(0);

  const fetchPosts = async (skip) => {
    try {
      setPostData((preState) => ({
        ...preState,
        status: "loading",
      }));
      const res = await axios.get("/api/posts", {
        params: {
          offset: skip,
        },
      });

      if (res.success) {
        setPostData((preState) => ({
          status: 'success',
          data: {
            posts: [...preState.data.posts, ...res.data.data],
            total: res.data.total,
          }
        }))
        setSkip(skip);
      } else {
        setPostData((preState) => ({
          ...preState,
          status: "error",
        }));
      }
    } catch (err) {
      setPostData((preState) => ({
        ...preState,
        status: "error",
      }));
    }
  };

  React.useEffect(() => {
    fetchPosts(0);
  }, []);

  const renderPosts = () => {
    const hasMore = skip < postData.data.total;

    return (
      <InfiniteScroll
        dataLength={postData.data.posts.length}
        next={() => fetchPosts(skip + MAX_ITEMS_PER_PAGE)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {postData.data.posts.map((post) => (
          <Row key={post._id}>
            <Col xs={12} md={3} key={post._id}>
              <Link to={`/posts/${post._id}`}>
                <Card
                  title={post.title}
                  description={post.description}
                  imageUrl={post.imageUrl}
                  note={post.createdName}
                />
              </Link>
            </Col>
          </Row>  
        ))}
      </InfiniteScroll>
    );
  };

  return (
    <div className="ListPost">
      <Container>
        <div className="ListPost-content">{renderPosts()}</div>
      </Container>
    </div>
  );
}
