import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface QuizProps {
    token: string; // Prop pour le token
}

const Quiz: React.FC<QuizProps> = ({ token }) => {
    const [, setWords] = useState<{ _id: string; frenchWord: string; englishWord: string }[]>([]);
    const [quiz, setQuiz] = useState<{ frenchWord: string; correctAnswer: string; options: string[] }[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [stars, setStars] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/words', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des mots');
            }
            return response.json();
        })
        .then((data) => {
            if (data.length > 0) {
                setWords(data);
                generateQuiz(data);
            } else {
                setError('Aucun mot disponible pour le quiz.');
            }
        })
        .catch((error) => {
            console.error('Erreur:', error);
            setError('Erreur lors de la récupération des mots.');
        })
        .finally(() => setLoading(false));
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
                options: options.sort(() => Math.random() - 0.5),
            };
        });
        setQuiz(quizQuestions);
    };

    const handleAnswer = (answer: string) => {
        if (answer === quiz[currentQuestionIndex].correctAnswer) {
            setScore(score + 1);
            setStars(stars + 1);
        }

        if (currentQuestionIndex + 1 < quiz.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizFinished(true); // Marquer le quiz comme terminé
        }
    };

    const restartQuiz = () => {
        setQuizFinished(false);
        setCurrentQuestionIndex(0);
        setScore(0);
        setStars(0);
        setError(null);
        setLoading(true);
        fetch('http://localhost:5000/api/words', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des mots');
            }
            return response.json();
        })
        .then((data) => {
            if (data.length > 0) {
                setWords(data);
                generateQuiz(data);
            } else {
                setError('Aucun mot disponible pour le quiz.');
            }
        })
        .catch((error) => {
            console.error('Erreur:', error);
            setError('Erreur lors de la récupération des mots.');
        })
        .finally(() => setLoading(false));
    };

    return (
        <>
            <Header />
            <Navbar />
            <div className="container">
                <div className="main">
                    <h1>Quiz de Mots</h1>
                     <div>
                                {Array.from({ length: 5 }, (_, index) => (
                                    <span key={index} className={`star ${index < stars ? 'filled' : ''}`}>
                                        ★
                                    </span>
                                ))}
                            </div>
                    {loading ? (
                        <h2>Chargement...</h2>
                    ) : error ? (
                        <h2>{error}</h2>
                    ) : (
                        <>
                            {quizFinished ? (
                                <div>
                                    <h2>Quiz terminé ! Votre score est de : {score}/{quiz.length}</h2>
                                    <button onClick={restartQuiz}>Rejouer le Quiz</button>
                                </div>
                            ) : (
                                currentQuestionIndex < quiz.length && (
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
                                )
                            )}
                            {/* <div>
                                {Array.from({ length: 5 }, (_, index) => (
                                    <span key={index} className={`star ${index < stars ? 'filled' : ''}`}>
                                        ★
                                    </span>
                                ))}
                            </div> */}
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Quiz;
