
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes,  } from 'react-router-dom';
import AddUserForm from './pages/AddUserForm';
import AddWordForm from './pages/AddWordForm';
import LoginForm from './pages/LoginForm';
import WordList from './pages/WordList';
import Quiz from './pages/Quiz';
import Dashboard from './pages/Dashboard';
import TypingTest from './pages/TypingTest';
import './App.css'
const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);
   

    const handleLogin = (token: string) => {
        setToken(token);
        setIsAuthenticated(true);
       
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Supprime le token du localStorage
        setToken(null);
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/add-user" element={<AddUserForm />} />
                    <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
                    <Route path="/add-word" element={isAuthenticated ? <AddWordForm token={token!} /> : <LoginForm onLogin={handleLogin} />} />
                    <Route path="/" element={isAuthenticated ? <WordList token={token!} /> : <LoginForm onLogin={handleLogin} />} />
                    <Route path="/Dashboard" element={isAuthenticated ? <Dashboard token={token!} /> : <LoginForm onLogin={handleLogin} />} /> {/* Ajout de la route pour Quiz */}
                    <Route path="/quiz" element={isAuthenticated ? <Quiz token={token!} /> : <LoginForm onLogin={handleLogin} />} />
                    <Route path="/typingTest" element={isAuthenticated ? <TypingTest token={token!} /> : <LoginForm onLogin={handleLogin} />} /> {/* Ajout de la route pour Quiz */}
                </Routes>
                {isAuthenticated && <button onClick={handleLogout}>Déconnexion</button>}
            </div>
        </Router>
    );
};

export default App;


