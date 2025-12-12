import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MyNavbar from '../components/MyNavbar';

const Home = () => {
  return (
    <>
      <MyNavbar />
      {/* Hero Section */}
      <div className="bg-light text-center py-5 mb-5" style={{backgroundColor: '#f8f9fa'}}>
        <Container>
          <h1 className="display-4 fw-bold text-success mb-3">Insieme per un futuro migliore</h1>
          <p className="lead mb-4 text-secondary mx-auto" style={{maxWidth: '700px'}}>
            Clirap Italia rappresenta il ponte di solidarietà tra l'Italia e l'Africa. 
            Combattiamo l'ingiustizia e la povertà attraverso l'educazione e lo sviluppo sostenibile.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Button as={Link} to="/progetti" variant="success" size="lg" className="px-4 shadow-sm">
              Scopri i Progetti
            </Button>
            <Button as={Link} to="/contatti" variant="outline-dark" size="lg" className="px-4">
              Diventa Volontario
            </Button>
          </div>
        </Container>
      </div>

      {/* Section Mission */}
      <Container className="mb-5">
        <Row className="align-items-center g-5">
          <Col md={6}>
            <h2 className="text-success fw-bold mb-3">Chi Siamo</h2>
            <p className="text-muted">
              Il <strong>CLIRAP</strong> (Cercle de Lutte contre l'Injustice, le Racisme et l'Abandon des Pauvres) è nato con una visione chiara: ridare dignità alle comunità dimenticate.
            </p>
            <p className="text-muted">
              La nostra sezione italiana si impegna a sensibilizzare l'opinione pubblica e a raccogliere fondi vitali per finanziare la costruzione di scuole, dispensari e infrastrutture agricole. Crediamo che l'istruzione sia l'arma più potente per cambiare il mondo.
            </p>
            <ul className="list-unstyled mt-3 text-secondary">
              <li className="mb-2">✅ <strong>Trasparenza:</strong> Ogni donazione è tracciata.</li>
              <li className="mb-2">✅ <strong>Azione Diretta:</strong> Lavoriamo senza intermediari costosi.</li>
              <li className="mb-2">✅ <strong>Sostenibilità:</strong> Progetti che durano nel tempo.</li>
            </ul>
          </Col>
          <Col md={6}>
            {/* Simulation d'image */}
            <div className="rounded shadow-sm" style={{
                height: '350px', 
                background: 'url(https://source.unsplash.com/random/800x600/?solidarity) center/cover no-repeat'
            }}></div>
          </Col>
        </Row>
      </Container>

      {/* Stats Rapides */}
      <div className="bg-success text-white py-5">
        <Container>
          <Row className="text-center">
            <Col md={4}>
              <h2 className="fw-bold">15+</h2>
              <p>Scuole Sostenute</p>
            </Col>
            <Col md={4}>
              <h2 className="fw-bold">2000+</h2>
              <p>Bambini Aiutati</p>
            </Col>
            <Col md={4}>
              <h2 className="fw-bold">100%</h2>
              <p>Passione</p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Home;