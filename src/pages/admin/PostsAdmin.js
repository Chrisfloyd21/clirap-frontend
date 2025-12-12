import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axiosClient from '../../axios-client';

const PostsAdmin = () => {
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);
  const [newPost, setNewPost] = useState({ title_it: '', content_it: '', image_url: '' });

  const loadPosts = () => {
    // Note: l'API publique est paginée, pour l'admin on voudrait idéalement une route non paginée ou gérer la pagination
    axiosClient.get('/posts').then(({ data }) => setPosts(data.data)); 
  };

  useEffect(() => { loadPosts(); }, []);

  const handleDelete = (id) => {
    if(window.confirm('Eliminare articolo?')) {
      axiosClient.delete(`/posts/${id}`).then(() => loadPosts());
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    axiosClient.post('/posts', newPost).then(() => {
      setShow(false);
      setNewPost({ title_it: '', content_it: '', image_url: '' });
      loadPosts();
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-4">
        <h3>Gestione Blog</h3>
        <Button variant="success" onClick={() => setShow(true)}>+ Nuovo Articolo</Button>
      </div>

      <Table bordered hover className="bg-white">
        <thead><tr><th>Titolo</th><th>Data</th><th>Azioni</th></tr></thead>
        <tbody>
          {posts.map(p => (
            <tr key={p.id}>
              <td>{p.title_it}</td>
              <td>{new Date(p.created_at).toLocaleDateString()}</td>
              <td><Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}>Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={() => setShow(false)} size="lg">
        <Modal.Header closeButton><Modal.Title>Scrivi Articolo</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreate}>
            <Form.Group className="mb-3">
              <Form.Label>Titolo</Form.Label>
              <Form.Control required onChange={e => setNewPost({...newPost, title_it: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contenuto</Form.Label>
              <Form.Control required as="textarea" rows={6} onChange={e => setNewPost({...newPost, content_it: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL Immagine</Form.Label>
              <Form.Control onChange={e => setNewPost({...newPost, image_url: e.target.value})} />
            </Form.Group>
            <Button type="submit" variant="success">Pubblica</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default PostsAdmin;