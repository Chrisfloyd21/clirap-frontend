import { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken, setUser } = useStateContext();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    axiosClient.post('/login', { email, password })
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        navigate('/admin/dashboard');
      })
      .catch(err => setError('Credenziali non valide. Riprova.'));
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Card style={{ width: '100%', maxWidth: '400px' }} className="shadow-sm border-0">
        <Card.Body className="p-4">
            <div className="text-center mb-4">
                <h3 className="fw-bold text-success">Admin Area</h3>
                <p className="text-muted small">Accedi per gestire il sito Clirap Italia</p>
            </div>
            
            {error && <Alert variant="danger" className="text-center">{error}</Alert>}
            
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                <Form.Label>Email Amministratore</Form.Label>
                <Form.Control type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
                </Form.Group>
                
                <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
                </Form.Group>
                
                <Button variant="success" type="submit" className="w-100 mb-3">
                    Accedi al Dashboard
                </Button>
            </Form>
            <div className="text-center">
                <Link to="/" className="text-decoration-none text-muted small">← Torna al sito web</Link>
            </div>
        </Card.Body>
      </Card>
    </div>
  );
};
export default Login;