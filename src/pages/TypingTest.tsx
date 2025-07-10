import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface TypingTestProps {
    token: string; // Prop pour le token
}

const TypingTest: React.FC<TypingTestProps> = ({ token }) => {
    const [words, setWords] = useState<{ _id: string; frenchWord: string; englishWord: string }[]>([]);
    const [currentWord, setCurrentWord] = useState<{ frenchWord: string; englishWord: string } | null>(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [result, setResult] = useState('');
    const [stars, setStars] = useState(0); // État pour les étoiles
    const [testFinished, setTestFinished] = useState(false); // État pour vérifier si le test est terminé

    useEffect(() => {
        fetch('http://localhost:5000/api/words', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Ajouter le token dans l'en-tête
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des mots');
            }
            return response.json();
        })
        .then((data) => {
            setWords(data);
            setNewWord(data); // Appeler setNewWord pour définir le mot actuel
        })
        .catch((error) => console.error('Erreur:', error));
    }, [token]);

    const setNewWord = (data: { _id: string; frenchWord: string; englishWord: string }[]) => {
        const randomWord = data[Math.floor(Math.random() * data.length)];
        setCurrentWord(randomWord);
        setUserAnswer('');
        setResult('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentWord) {
            if (userAnswer.toLowerCase() === currentWord.englishWord.toLowerCase()) {
                setResult('Correct !');
                setStars(stars + 1); // Ajouter une étoile à chaque bonne réponse
            } else {
                setResult('Incorrect ! La bonne réponse est : ' + currentWord.englishWord);
            }
            // Vérifiez si l'utilisateur a atteint un certain nombre de réponses
            if (stars + 1 >= 5) { // Par exemple, 5 bonnes réponses
                setTestFinished(true);
            } else {
                setTimeout(() => setNewWord(words), 1000); // Attendre 1 seconde avant d'afficher un nouveau mot
            }
        }
    };

    const restartTest = () => {
        setStars(0);
        setResult('');
        setTestFinished(false);
        // Réinitialiser le test pour redémarrer avec un nouveau mot
        setNewWord(words);
    };

    return (
        <>
            <Header />
            <Navbar />
            <div className="container">
                <div className="main">
                    <h1>Test de Saisie</h1>
                    {testFinished ? (
                        <div>
                            <h2>Test terminé ! Vous avez obtenu {stars} étoiles.</h2>
                            <button onClick={restartTest}>Relancer le Test</button>
                        </div>
                    ) : (
                        currentWord && (
                            <div>
                                <h2>{currentWord.frenchWord}</h2>
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        value={userAnswer}
                                        onChange={(e) => setUserAnswer(e.target.value)}
                                        placeholder="Entrez la traduction en anglais"
                                        required />
                                    <button type="submit">Vérifier</button>
                                </form>
                                {result && <p>{result}</p>}
                                <div>
                                    {/* Affichage des étoiles */}
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <span 
                                            key={index} 
                                            className={`star ${index < stars ? 'filled' : ''}`}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TypingTest;
