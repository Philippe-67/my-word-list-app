// frontend/src/components/TypingTest.tsx
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

    useEffect(() => {
        const token = localStorage.getItem('token'); // Récupérer le token de l'utilisateur

        fetch('http://localhost:5000/api/words', {
            method: 'GET',
            headers: {
                'Authorization':  `Bearer ${token}` , // Ajouter le token dans l'en-tête
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
        if (currentWord && userAnswer.toLowerCase() === currentWord.englishWord.toLowerCase()) {
            setResult('Correct !');
        } else {
            setResult('Incorrect ! La bonne réponse est : ' + currentWord?.englishWord);
        }
        setTimeout(() => setNewWord(words), 2000); // Attendre 2 secondes avant d'afficher un nouveau mot
    };

    return (
        <>
        <Header/>
        <Navbar/>
        <div>
            <h1>Test de Saisie</h1>
            {currentWord && (
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
                </div>
            )}
        </div>
        <Footer/>
        </>
    );
};

export default TypingTest;
