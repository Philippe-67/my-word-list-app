import React, { useEffect } from 'react';

import { useQuestions } from '../hooks/useQuestions';
import { useStars } from '../hooks/useStars';
//import { useTypingTest } from '../hooks/useTypingTest';

import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StarsDisplay from '../components/StarsDisplay';
import { useTypingTest } from '../hooks/useTypingTestLogic';

interface Word {
  _id: string;
  frenchWord: string;
  englishWord: string;
  categoryWord:string
}

interface TypingTestProps {
  token: string;
}

const TypingTest: React.FC<TypingTestProps> = ({ token }) => {
  const { questions } = useQuestions(token);
  const { starsCount, starsStatus, updateStar, resetStars } = useStars();

  const {
    currentWord,
    userAnswer,
    setUserAnswer,
    result,
    handleAnswer,
    restart,
    testFinished,
    score,
  } = useTypingTest({ questions, onFinish: () => {} });

  // Charger un mot à chaque changement
  useEffect(() => {
    if (questions.length > 0 && !currentWord) {
      // La première fois
      handleAnswer('', () => {}); // juste pour déclencher la première question
    }
  }, [questions]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentWord) return;
    const isCorrect = userAnswer.toLowerCase() === currentWord.englishWord.toLowerCase();
    handleAnswer(userAnswer, (index: number, correct: boolean) => {
      updateStar(index, correct);
    });
  };

  const handleRestart = () => {
    resetStars();
    restart();
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="container">
        <div className="main" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h1>Test de Saisie</h1>
          <StarsDisplay starsCount={starsCount} starsStatus={starsStatus} />

          {testFinished ? (
            <div>
              <h2>Vous avez {score} bonnes réponses.</h2>
              <button onClick={handleRestart}>Rejouer</button>
            </div>
          ) : currentWord ? (
            <div>
              <h2>{currentWord.frenchWord}</h2>
              <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                <input
                  type="text"
                  placeholder="Entrez la traduction en anglais"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  required
                  style={{ padding: '8px', width: '70%', fontSize: '16px' }}
                />

                <button type="submit" style={{ padding: '8px 16px', marginLeft: '10px' }}>
                  Vérifier
                </button>
              </form>
              {result && <p style={{ marginTop: '10px' }}>{result}</p>}
            </div>
          ) : (
            <p>Chargement...</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TypingTest;
