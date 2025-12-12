import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import axiosClient from '../axios-client';
import MyNavbar from '../components/MyNavbar';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient.get('/projects')
      .then(({ data }) => {
        setProjects(data.data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <MyNavbar />
      <Container className="py-5">
        <h2 className="mb-4 text-center">Le Nostre Azioni in Africa</h2>
        {loading ? <Spinner animation="border" /> : (
          <Row>
            {projects.map(p => (
              <Col md={4} key={p.id} className="mb-4">
                <Card className="h-100 border-0 shadow-sm">
                  {/* Lazy loading pour l'écoconception */}
                  <Card.Img variant="top" src={p.image_url || 'https://via.placeholder.com/300'} loading="lazy" />
                  <Card.Body>
                    <Card.Title>{p.title_it}</Card.Title>
                    <Card.Text>{p.description_it.substring(0, 100)}...</Card.Text>
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
export default Projects;