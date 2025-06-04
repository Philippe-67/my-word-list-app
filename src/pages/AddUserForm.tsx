// frontend/src/components/AddUserForm.tsx
import React, { useState } from 'react';

const AddUserForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newUser = { username, password, email };
        const token = localStorage.getItem('token'); // Récupérer le token de l'utilisateur

        fetch('http://localhost:5000/api/users/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '', // Ajouter le token dans l'en-tête
            },
            body: JSON.stringify(newUser),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur lors de l\'ajout de l\'utilisateur');
                }
                return response.json();
            })
            .then((data) => {
                setMessage(`Utilisateur ajouté : ${data.user.username}`);
                // Réinitialiser les champs du formulaire
                setUsername('');
                setPassword('');
                setEmail('');
            })
            .catch((error) => {
                setMessage(error.message);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Ajouter un Utilisateur</h2>
            <input
                type="text"
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Ajouter l'utilisateur</button>
            {message && <p>{message}</p>} {/* Afficher un message de retour */}
        </form>
    );
};

export default AddUserForm;
