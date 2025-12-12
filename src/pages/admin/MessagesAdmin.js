import React, { useEffect, useState } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import axiosClient from '../../axios-client';

const MessagesAdmin = () => {
  const [messages, setMessages] = useState([]);

  const loadMessages = () => {
    axiosClient.get('/messages').then(({ data }) => setMessages(data));
  };

  useEffect(() => { loadMessages(); }, []);

  const markAsRead = (id) => {
    axiosClient.put(`/messages/${id}`).then(() => loadMessages());
  };

  const deleteMsg = (id) => {
    if(window.confirm('Eliminare?')) {
      axiosClient.delete(`/messages/${id}`).then(() => loadMessages());
    }
  };

  return (
    <div>
      <h3 className="mb-4">Messaggi Ricevuti</h3>
      <Table striped hover responsive className="bg-white shadow-sm">
        <thead>
          <tr>
            <th>Stato</th>
            <th>Da</th>
            <th>Oggetto</th>
            <th>Messaggio</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {messages.map(msg => (
            <tr key={msg.id} className={!msg.is_read ? "fw-bold" : ""}>
              <td>{msg.is_read ? <Badge bg="secondary">Letto</Badge> : <Badge bg="success">Nuovo</Badge>}</td>
              <td>{msg.name} <br/> <small className="text-muted">{msg.email}</small></td>
              <td>{msg.subject}</td>
              <td>{msg.message.substring(0, 50)}...</td>
              <td>
                {!msg.is_read && <Button variant="outline-primary" size="sm" onClick={() => markAsRead(msg.id)} className="me-2">Segna Letto</Button>}
                <Button variant="outline-danger" size="sm" onClick={() => deleteMsg(msg.id)}>X</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default MessagesAdmin;