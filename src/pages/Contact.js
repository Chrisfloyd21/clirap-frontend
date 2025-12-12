import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col, Card } from 'react-bootstrap';
import axiosClient from '../axios-client';
import MyNavbar from '../components/MyNavbar';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosClient.post('/contact', formData)
      .then(() => {
        setStatus({ type: 'success', text: 'Grazie! Il tuo messaggio è stato inviato. Ti risponderemo presto.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      })
      .catch(() => setStatus({ type: 'danger', text: 'Si è verificato un errore. Riprova più tardi.' }));
  };

  return (
    <>
      <MyNavbar />
      <div className="bg-light py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card className="shadow border-0">
                <Card.Body className="p-5">
                  <h2 className="text-center mb-4 fw-bold text-success">Contattaci</h2>
                  <p className="text-center text-muted mb-5">
                    Hai domande sui nostri progetti? Vuoi collaborare o fare una donazione? 
                    Compila il modulo qui sotto.
                  </p>
                  
                  {status && <Alert variant={status.type}>{status.text}</Alert>}
                  
                  <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                            <Form.Label>Nome e Cognome</Form.Label>
                            <Form.Control required type="text" placeholder="Mario Rossi" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                            <Form.Label>Indirizzo Email</Form.Label>
                            <Form.Control required type="email" placeholder="mario@email.it" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Oggetto</Form.Label>
                      <Form.Control type="text" placeholder="Es: Info Adozioni a distanza" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} />
                    </Form.Group>
                    
                    <Form.Group className="mb-4">
                      <Form.Label>Messaggio</Form.Label>
                      <Form.Control required as="textarea" rows={5} placeholder="Scrivi qui il tuo messaggio..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                    </Form.Group>
                    
                    <div className="d-grid">
                        <Button variant="success" type="submit" size="lg">Invia Messaggio</Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
              
              <div className="text-center mt-4 text-muted">
                <small>Oppure scrivici direttamente a: <strong>info@clirap-italia.org</strong></small>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default Contact;