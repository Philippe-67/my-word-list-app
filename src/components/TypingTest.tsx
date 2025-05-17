// frontend/src/components/TypingTest.tsx
import React, { useEffect, useState } from 'react';

const TypingTest: React.FC = () => {
    const [words, setWords] = useState<{ _id: string; frenchWord: string; englishWord: string }[]>([]);
    const [currentWord, setCurrentWord] = useState<{ frenchWord: string; englishWord: string } | null>(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [result, setResult] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/words')
            .then((response) => response.json())
            .then((data) => {
                setWords(data);
                setNewWord(data);
            })
            .catch((error) => console.error('Erreur:', error));
    }, []);

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
                            required
                        />
                        <button type="submit">Vérifier</button>
                    </form>
                    {result && <p>{result}</p>}
                </div>
            )}
        </div>
    );
};

export default TypingTest;
