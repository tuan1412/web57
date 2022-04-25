import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Pagination from './components/Pagination/Pagination';
import Card from './components/Card/Card';
import axios from 'axios';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [postData, setPostData] = React.useState({
    status: 'idle',
    data: [],
  });
  const [activePage, setActivePage] = React.useState(1);
  

  React.useEffect(() => {
    axios.get('http://localhost:8080/api/posts', {
      params: {
        page: activePage
      }
    })
  }, [activePage])


  const handleChangePage = (newActivePage) => {
    setActivePage(newActivePage);
  }

  console.log('render');

  return (
    <div className="App">
      <Container>
        <div className="App-content">
          <Row>
            {postData.data.map(post => (
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
        </div>
        <div className="App-pagination">
          <Pagination activePage={activePage} handleChangePage={handleChangePage} />
        </div>
      </Container>
    </div>
  );
}

export default App;
