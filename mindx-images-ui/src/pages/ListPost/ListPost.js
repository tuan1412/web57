import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Pagination from "../../components/Pagination/Pagination";
import Card from "../../components/Card/Card";
import axios from "axios";
import { Link, useLocation, useSearchParams } from "react-router-dom";

const MAX_ITEMS_PER_PAGE = 4;

export default function ListPost() {
  const [postData, setPostData] = React.useState({
    status: "idle",
    data: null,
  });
  const location = useLocation();
  const [urlSearchParams, setUrlSearchParams] = useSearchParams()
  const [activePage, setActivePage] = React.useState(() => {
    const activePage = urlSearchParams.get('activePage')
    return activePage ? +activePage : 1;
  });

  console.log(location)

  const fetchPosts = React.useCallback(async () => {
    try {
      setPostData((preState) => ({
        ...preState,
        status: "loading",
      }));
      const res = await axios.get("http://localhost:8080/api/posts", {
        params: {
          offset: (activePage - 1) * MAX_ITEMS_PER_PAGE,
        },
      });

      if (res.data.success) {
        setPostData({
          status: "success",
          data: {
            posts: res.data.data.data,
            total: res.data.data.total,
          },
        });
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
  }, [activePage]);

  React.useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const isFirstRender = React.useRef(false);

  React.useEffect(() => {
    isFirstRender.current = true;
  }, []);

  React.useEffect(() => {
    if (!isFirstRender.current) {
      setUrlSearchParams({ activePage })
    
    } else {
      isFirstRender.current = false;
    }
    
  }, [activePage]);

  const maxPage = React.useMemo(() => {
    return postData?.data?.total
      ? Math.ceil(postData?.data?.total / MAX_ITEMS_PER_PAGE)
      : 0;
  }, [postData?.data?.total]);
  

  const handleChangePage = (newActivePage) => {
    setActivePage(newActivePage);
  };

  const renderPosts = () => {
    const isLoading =
      postData.status === "idle" || postData.status === "loading";
    const isError = postData.status === "error";

    if (isLoading) {
      return <div>Loading....</div>;
    }

    if (isError) {
      return <div>Something went wrong</div>;
    }

    return (
      <Row>
        {postData.data.posts.map((post) => (
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
        ))}
      </Row>
    );
  };

  return (
    <div className="ListPost">
      <Container>
        <div className="ListPost-content">{renderPosts()}</div>
        <div className="ListPost-pagination">
          <Pagination
            activePage={activePage}
            handleChangePage={handleChangePage}
            maxPage={maxPage}
          />
        </div>
      </Container>
    </div>
  );
}
