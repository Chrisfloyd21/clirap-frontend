import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// Pages Publiques
import Home from './pages/Home';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Login from './pages/Login';

// Pages Admin & Layout
import AdminLayout from './components/AdminLayout'; // Assurez-vous d'avoir créé ce fichier (voir réponse précédente)
import Dashboard from './pages/admin/Dashboard';
import PostsAdmin from './pages/admin/PostsAdmin';
import MessagesAdmin from './pages/admin/MessagesAdmin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/progetti" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contatti" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        {/* ADMIN (Nécessite le Layout Admin pour la sidebar et la sécurité) */}
        <Route path="/admin" element={<AdminLayout />}>
           <Route path="dashboard" element={<Dashboard />} />
           <Route path="posts" element={<PostsAdmin />} />
           <Route path="messages" element={<MessagesAdmin />} />
           {/* Redirection par défaut */}
           <Route index element={<Navigate to="/admin/dashboard" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;