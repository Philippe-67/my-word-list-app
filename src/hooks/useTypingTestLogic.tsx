import { useState, useEffect } from 'react';
//import type { Word } from '../types/types';
//import { Word } from './useQuestions';
interface Word {
  _id: string;
  frenchWord: string;
  englishWord: string;
  categoryWord:string
}
interface UseTypingTestProps {
  questions: Word[];
  onFinish?: () => void;
}

export const useTypingTest = ({ questions, onFinish }: UseTypingTestProps) => {
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [testFinished, setTestFinished] = useState(false);

  const setNextQuestion = () => {
    if (questions.length === 0) return;
    const randIndex = Math.floor(Math.random() * questions.length);
    setCurrentWord(questions[randIndex]);
    setUserAnswer('');
    setResult('');
  };

  useEffect(() => {
    if (questions.length > 0 && questionIndex === 0) {
      setNextQuestion();
    }
  }, [questions]);

  const handleAnswer = (
    answer: string,
    updateStar: (index: number, correct: boolean) => void
  ) => {
    if (!currentWord) return;
    const correct = answer.toLowerCase() === currentWord.englishWord.toLowerCase();
    if (correct) {
      setScore(prev => prev + 1);
    }
    // Mettre à jour la star correspondante
    updateStar(questionIndex, correct);

    if (questionIndex + 1 >= 5) {
      setTestFinished(true);
      if (onFinish) onFinish();
    } else {
      setTimeout(() => {
        setQuestionIndex(prev => prev + 1);
        setNextQuestion();
      }, 1000);
    }
  };

  const restart = () => {
    setQuestionIndex(0);
    setScore(0);
    setTestFinished(false);
     setUserAnswer(''); // Ajoutez cette ligne pour réinitialiser l'input
    setTimeout(() => {
    setNewWord();
  }, 100);
  };

  return {
    currentWord,
    userAnswer,
    setUserAnswer,
    result,
    handleAnswer,
    restart,
    testFinished,
    score,
  };
};
function setNewWord() {
    throw new Error('Function not implemented.');
}

