import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import axiosClient from '../axios-client';
import MyNavbar from '../components/MyNavbar';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient.get('/posts').then(({ data }) => {
      setPosts(data.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <MyNavbar />
      <Container className="py-5">
        <h2 className="text-center mb-5">Notizie & Attività</h2>
        {loading ? <Spinner animation="border" /> : (
          <Row>
            {posts.map(post => (
              <Col md={6} lg={4} key={post.id} className="mb-4">
                <Card className="h-100 shadow-sm border-0">
                  <div style={{height: '200px', backgroundColor: '#eee', overflow:'hidden'}}>
                     {/* Image avec fallback si vide */}
                     {post.image_url ? 
                        <img src={post.image_url} alt={post.title_it} style={{width:'100%', height:'100%', objectFit:'cover'}} loading="lazy"/> 
                        : <div className="d-flex align-items-center justify-content-center h-100 text-muted">No Image</div>
                     }
                  </div>
                  <Card.Body>
                    <small className="text-muted">{new Date(post.created_at).toLocaleDateString()}</small>
                    <Card.Title className="mt-2">{post.title_it}</Card.Title>
                    <Card.Text>{post.excerpt_it}...</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};
export default Blog;