import { useEffect, useState } from 'react';
import { Container, Table, Button, Form, Modal } from 'react-bootstrap';
import axiosClient from '../../axios-client';
import { useStateContext } from '../../context/ContextProvider';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { token, setToken } = useStateContext();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [show, setShow] = useState(false);
  const [newProject, setNewProject] = useState({ title_it: '', description_it: '', category: 'Education', image_url: '' });

  // Sécurité : Redirection si pas de token
  if (!token) { navigate('/login'); }

  const loadData = () => {
    axiosClient.get('/projects').then(({ data }) => setProjects(data.data));
  };

  useEffect(() => { loadData(); }, []);

  const handleLogout = () => {
    axiosClient.post('/logout').then(() => {
      setToken(null);
      navigate('/login');
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    axiosClient.post('/projects', newProject).then(() => {
      setShow(false);
      loadData();
    });
  };

  const handleDelete = (id) => {
    if(window.confirm('Cancellare?')) {
      axiosClient.delete(`/projects/${id}`).then(() => loadData());
    }
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between mb-4">
        <h2>Dashboard Admin</h2>
        <Button variant="danger" onClick={handleLogout}>Logout</Button>
      </div>
      
      <Button variant="success" className="mb-3" onClick={() => setShow(true)}>+ Nuovo Progetto</Button>

      <Table striped bordered hover>
        <thead><tr><th>ID</th><th>Titolo</th><th>Azioni</th></tr></thead>
        <tbody>
          {projects.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.title_it}</td>
              <td><Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}>Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Creation */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton><Modal.Title>Aggiungi Progetto</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreate}>
            <Form.Group className="mb-2">
              <Form.Control placeholder="Titolo" onChange={e => setNewProject({...newProject, title_it: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control as="textarea" placeholder="Descrizione" onChange={e => setNewProject({...newProject, description_it: e.target.value})} />
            </Form.Group>
             <Form.Group className="mb-2">
              <Form.Control placeholder="URL Immagine" onChange={e => setNewProject({...newProject, image_url: e.target.value})} />
            </Form.Group>
            <Button type="submit" variant="success">Salva</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};
export default Dashboard;