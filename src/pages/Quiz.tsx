// // frontend/src/pages/Quiz.tsx
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';


interface QuizProps {
    token: string; // Prop pour le token
}


const Quiz: React.FC<QuizProps> = ({ token }) => {
    const [, setWords] = useState<{ _id: string; frenchWord: string; englishWord: string }[]>([]);
    const [quiz, setQuiz] = useState<{ frenchWord: string; correctAnswer: string; options: string[] }[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);

     useEffect(() => {
      //   const token = localStorage.getItem('token'); // Récupérer le token de l'utilisateur

        // Récupérer les mots pour générer le quiz
        fetch('http://localhost:5000/api/words', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':  `Bearer ${token}` , // Ajouter le token dans l'en-tête
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
                generateQuiz(data);
            })
            .catch((error) => console.error('Erreur:', error));
    }, [token]);

    const generateQuiz = (words: { _id: string; frenchWord: string; englishWord: string }[]) => {
        const shuffledWords = words.sort(() => 0.5 - Math.random()).slice(0, 5);
        const quizQuestions = shuffledWords.map(word => {
            const options = [word.englishWord];
            while (options.length < 4) {
                const randomWord = words[Math.floor(Math.random() * words.length)].englishWord;
                if (!options.includes(randomWord)) {
                    options.push(randomWord);
                }
            }
            return {
                frenchWord: word.frenchWord,
                correctAnswer: word.englishWord,
                options: options.sort(() => Math.random() - 0.5), // Mélanger les options
            };
        });
        setQuiz(quizQuestions);
    };

    const handleAnswer = (answer: string) => {
        if (answer === quiz[currentQuestionIndex].correctAnswer) {
            setScore(score + 1);
        }
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    return (<>
       <Header/>
        <div>
            <h1>Quiz de Mots</h1>
            {currentQuestionIndex < quiz.length ? (
                <div>
                    <h2>{quiz[currentQuestionIndex].frenchWord}</h2>
                    <div>
                        {quiz[currentQuestionIndex].options.map((option, index) => (
                            <button key={index} onClick={() => handleAnswer(option)}>
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <h2>Quiz terminé ! Votre score : {score}/{quiz.length}</h2>
                </div>
            )}
        </div>
        </>
    );
};

export default Quiz;
