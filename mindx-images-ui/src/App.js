import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Pagination from "./components/Pagination/Pagination";
import Card from "./components/Card/Card";
import axios from "axios";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Box from "./components/Box/Box";
import TextInputWithFocusButton from "./components/Input/Input";

// this.state = { postData: { status, data }, activePage }
// this.setState

const MAX_ITEMS_PER_PAGE = 4;

function App() {
  const [postData, setPostData] = React.useState({
    status: "idle",
    data: null,
  });
  const [activePage, setActivePage] = React.useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const activePage = urlParams.get("activePage");
    return activePage ? +activePage : 1;
  });

  // magic number
  // const fetchPosts = React.useMemo(() => {
  //   const fetch = async () => {
  //     try {
  //       setPostData(preState => ({
  //         ...preState,
  //         status: 'loading',
  //       }))
  //       const res = await axios.get('http://localhost:8080/api/posts', {
  //         params: {
  //           offset: (activePage - 1) * MAX_ITEMS_PER_PAGE
  //         }
  //       });

  //       if (res.data.success) {
  //         setPostData({
  //           status: 'success',
  //           data: {
  //             posts: res.data.data.data,
  //             total: res.data.data.total
  //           }
  //         })
  //       } else {
  //         setPostData(preState => ({
  //           ...preState,
  //           status: 'error',
  //         }))
  //       }
  //     } catch (err) {
  //       setPostData(preState => ({
  //         ...preState,
  //         status: 'error',
  //       }))
  //     }
  //   }
  //   return fetch;
  // }, [activePage]);

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

  // componentDidMount() {
  //   window.history.pushState({page: activePage}, "", `?activePage=${activePage}`)
  // }

  // componentDidUpdate(prevState, prevProps) {
  //   if (this.state.activePage !== prevState.activePage) {
  //     window.history.pushState({page: this.state.activePag}, "", `?activePage=${activePage}`)
  //   }
  // }
  const isFirstRender = React.useRef(false);

  console.log('renderrrr')
  React.useEffect(() => {
    console.log('use effect set is first render', isFirstRender.current)

    isFirstRender.current = true;
  }, []);

  React.useEffect(() => {
    console.log('use effect set state', isFirstRender.current)

    if (!isFirstRender.current) {
      window.history.pushState(
        { page: activePage },
        "",
        `?activePage=${activePage}`
      );
    } else {
      isFirstRender.current = false;
    }
    
  }, [activePage]);

  // const maxPage = postData && postData.data && postData.total ? Math.ceil(postData?.data?.total / MAX_ITEMS_PER_PAGE) : 0;
  // const maxPage = postData?.data?.total ? Math.ceil(postData?.data?.total / MAX_ITEMS_PER_PAGE) : 0;

  // console.log("total", postData?.data?.total);

  const maxPage = React.useMemo(() => {
    // console.log("use memo", postData?.data?.total);
    return postData?.data?.total
      ? Math.ceil(postData?.data?.total / MAX_ITEMS_PER_PAGE)
      : 0;
  }, [postData?.data?.total]);
  // console.log("maxPage", maxPage);

  // console.log("render", postData);

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
            <Card
              title={post.title}
              description={post.description}
              imageUrl={post.imageUrl}
              note={post.createdName}
            />
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <div className="App">
      <Container>
        <div className="App-content">{renderPosts()}</div>
        <div className="App-pagination">
          <Pagination
            activePage={activePage}
            handleChangePage={handleChangePage}
            maxPage={maxPage}
          />
        </div>
      </Container>
      {/* <Box /> */}
      <TextInputWithFocusButton />
    </div>
  );
}

export default App;
