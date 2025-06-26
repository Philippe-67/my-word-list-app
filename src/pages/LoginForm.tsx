import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddUserForm from './AddUserForm';


interface LoginFormProps {
    onLogin: (token: string) => void; // Ajouter une prop pour gérer la connexion
}

const LoginForm: React.FC<LoginFormProps> = ({onLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
   
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userCredentials = { email, password };

        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userCredentials),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la connexion');
            }

            const data = await response.json();
             
            // Stocker le token dans le localStorage
            localStorage.setItem('token', data.token);
            onLogin(data.token); // Appeler la fonction pour mettre à jour l'état d'authentification
            setMessage(`Bonjour : ${data.user.username}, vous êtes connecté.`);
            navigate('/add-word'); // Rediriger après la connexion
            setEmail('');
            setPassword('');
       
        } catch (error) {
            if (error instanceof Error) {
                setMessage(error.message); // Type d'erreur sécurisé
            } else {
                setMessage('Une erreur inconnue est survenue.');
            }
        }
    };
   
    return (
        <>
        <form onSubmit={handleSubmit}>
            <h2>Bienvenue ! Veuillez vous connecter ou vous enregistrer.</h2>
            <h3>Connexion</h3>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
            <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
            <button type="submit">Se connecter</button>
            {message && <p>{message}</p>} {/* Afficher un message de retour */}

        </form>
         <AddUserForm /> 
        </>
    );
};

export default LoginForm;







