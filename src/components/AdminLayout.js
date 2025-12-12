import React, { useEffect } from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import { Container, Row, Col, Nav, Navbar, Button } from 'react-bootstrap';
import axiosClient from '../axios-client';

const AdminLayout = () => {
  const { user, token, setUser, setToken } = useStateContext();

  // --- 1. D'ABORD : Les fonctions et les Hooks ---

  const onLogout = (ev) => {
    ev.preventDefault();
    axiosClient.post('/logout').then(() => {
      setUser({});
      setToken(null);
    });
  };

  useEffect(() => {
    // On ne tente de charger l'utilisateur que si un token existe
    if (token) {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data);
            })
            .catch((err) => {
                // Si erreur (ex: token expiré), on peut déconnecter l'utilisateur
                console.error(err);
            });
    }
  }, [token, setUser]); // Les dépendances du useEffect

  // --- 2. ENSUITE : Les Redirections (Early Return) ---
  
  // Si pas de token, on redirige vers le login
  // Cela doit être fait APRES avoir déclaré tous les hooks ci-dessus
  if (!token) {
    return <Navigate to="/login" />;
  }

  // --- 3. ENFIN : Le rendu visuel ---
  
  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={2} className="bg-dark min-vh-100 px-0 d-none d-md-block">
          <div className="p-3 text-white text-center fw-bold border-bottom border-secondary">
            CLIRAP ADMIN
          </div>
          <Nav className="flex-column p-2">
            <Nav.Link as={Link} to="/admin/dashboard" className="text-white-50 mb-2">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/admin/projects" className="text-white-50 mb-2">Progetti</Nav.Link>
            <Nav.Link as={Link} to="/admin/posts" className="text-white-50 mb-2">Blog</Nav.Link>
            <Nav.Link as={Link} to="/admin/messages" className="text-white-50 mb-2">Messaggi</Nav.Link>
            <Nav.Link as={Link} to="/" target="_blank" className="text-success mt-4">
               Voir le Site ↗
            </Nav.Link>
          </Nav>
        </Col>

        {/* Main Content */}
        <Col md={10} xs={12} className="p-0 bg-light">
          <Navbar bg="white" className="shadow-sm px-4 justify-content-between">
            <span className="fw-bold text-secondary">Admin Panel</span>
            <div className="d-flex align-items-center">
              <span className="me-3 text-muted">{user?.name || 'Utilisateur'}</span>
                <Button variant="outline-danger" size="sm" onClick={onLogout}>Logout</Button>
            </div>
          </Navbar>
          
          <div className="p-4">
            <Outlet /> 
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLayout;