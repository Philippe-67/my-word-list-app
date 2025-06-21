// frontend/src/components/Dashboard.tsx
import React, { useEffect, useState } from 'react';

interface DashboardProps {
    token: string; // Prop pour le token
}

const Dashboard:  React.FC<DashboardProps> = ({ token }) => {
    const [wordCount, setWordCount] = useState(0);
    const [testCount, setTestCount] = useState(0);
    const [quizCount, setQuizCount] = useState(0);
    const [knownWordsCount, setKnownWordsCount] = useState(0);

    useEffect(() => {
       // const token = localStorage.getItem('token'); // Récupérer le token de l'utilisateur

        // Récupérer le nombre de mots dans le dictionnaire
        fetch('http://localhost:5000/api/words', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` , // Ajouter le token dans l'en-tête
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des mots');
                }
                return response.json();
            })
            .then((data) => setWordCount(data.length))
            .catch((error) => console.error('Erreur:', error));

        // Pour les tests et les quiz, tu peux les gérer ici ou ailleurs selon la logique de ton application.
        // Voici des valeurs par défaut à titre d'exemple.
        setTestCount(5);  // Remplacer par la logique pour récupérer les tests effectués
        setQuizCount(3);  // Remplacer par la logique pour récupérer les quiz complétés
        setKnownWordsCount(10); // Remplacer par la logique pour récupérer les mots connus
    }, [token]);

    return (
        <div>
            <h1>Tableau de Bord</h1>
            <p>Nombre de mots dans votre dictionnaire : {wordCount}</p>
            <p>Nombre de tests effectués : {testCount}</p>
            <p>Nombre de quiz complétés : {quizCount}</p>
            <p>Nombre de mots que vous semblez connaître : {knownWordsCount}</p>
        </div>
    );
};

export default Dashboard;

