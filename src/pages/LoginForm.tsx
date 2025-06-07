// // frontend/src/components/LoginForm.tsx
// import React, { useState } from 'react';

// const LoginForm: React.FC = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         const userCredentials = { email, password };

//         fetch('http://localhost:5000/api/users/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(userCredentials),
//         })
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Erreur lors de la connexion');
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 // Stocker le token dans le localStorage
//                 localStorage.setItem('token', data.token);
//                 setMessage(`Connecté en tant que : ${data.user.username}`);
//                 // Réinitialiser les champs du formulaire
//                 setEmail('');
//                 setPassword('');
//             })
//             .catch((error) => {
//                 setMessage(error.message);
//             });
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <h2>Connexion</h2>
//             <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//             />
//             <input
//                 type="password"
//                 placeholder="Mot de passe"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//             />
//             <button type="submit">Se connecter</button>
//             {message && <p>{message}</p>}
//         </form>
//     );
// };

// export default LoginForm;
// frontend/src/components/LoginForm.tsx


import React, { useState } from 'react';
import isLogin from '../utils/Utils';
import AddWordForm from './AddWordForm';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const[token,setToken]=useState<string|null>(null);

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
            setToken(data.token);
            // localStorage.setItem('username', data.user.username)
            console.log("voici les infos du user:",data.token, data.user.username)
            setToken(data.token);
            setMessage(`Bonjour : ${data.user.username},jai bien ton token":${data.token}`);

            // Réinitialiser les champs du formulaire
            setEmail('');
            setPassword('');
            setIsAuthenticated(true);
        //     if (isLogin()) {
        //         console.log("L'utilisateur est connecté.");
                
        //     } else {
        //         console.log("L'utilisateur n'est pas connecté.");
        //     }
             
        //    ;
        } catch (error) {
            if (error instanceof Error) {
                setMessage(error.message); // Type d'erreur sécurisé
            } else {
                setMessage('Une erreur inconnue est survenue.');
            }
        }
    };
    // Afficher AddWordForm si l'utilisateur est connecté
    if (isAuthenticated) {
        return <AddWordForm token={token!} />; // Passer le token en tant que prop
    }


    return (
        <form onSubmit={handleSubmit}>
            <h2>Connexion</h2>
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
            <button type="submit">Se connecter</button>
            {message && <p>{message}</p>} {/* Afficher un message de retour */}
            
        </form>
    );
};

export default LoginForm;





