import { useState, useEffect } from 'react';
import type { QuizQuestion, Word } from '../types/types';
//import { Word, QuizQuestion } from '../types';

interface UseQuizProps {
  questions: Word[];
  onFinish?: () => void;
}

export const useQuiz = ({ questions, onFinish }: UseQuizProps) => {
  const [questionsQuiz, setQuestionsQuiz] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [finished, setFinished] = useState<boolean>(false);

  // Fonction pour générer une question avec options
  const generateOptions = (word: Word, allQuestions: Word[]): string[] => {
    const options = [word.englishWord];
    while (options.length < 4) {
      const randWord = allQuestions[Math.floor(Math.random() * allQuestions.length)].englishWord;
      if (!options.includes(randWord)) options.push(randWord);
    }
    return options.sort(() => Math.random() - 0.5);
  };

  const generateQuestions = () => {
    const quizQuestions: QuizQuestion[] = questions.slice(0, 5).map((w) => {
      const options = generateOptions(w, questions);
      return {
        frenchWord: w.frenchWord,
        correctAnswer: w.englishWord,
        options: options,
      };
    });
    setQuestionsQuiz(quizQuestions);
    setCurrentQuestion(quizQuestions[0]);
  };

  // Charger la première question quand questions arrivent
  useEffect(() => {
    if (questions.length > 0 && questionsQuiz.length === 0) {
      generateQuestions();
    }
  }, [questions]);

  const handleAnswer = (
    answer: string,
    updateStar: (index: number, correct: boolean) => void
  ) => {
    if (!currentQuestion) return;
    const correct = answer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
    if (correct) setScore(prev => prev + 1);
    updateStar(questionIndex, correct);

    if (questionIndex + 1 >= 5) {
      setFinished(true);
      if (onFinish) onFinish();
    } else {
      setTimeout(() => {
        const nextIdx = questionIndex + 1;
        setQuestionIndex(nextIdx);
        // Transforme Word en QuizQuestion pour la nouvelle question
        const nextWord = questions.slice(0, 5)[nextIdx];
        const options = generateOptions(nextWord, questions);
        setCurrentQuestion({
          frenchWord: nextWord.frenchWord,
          correctAnswer: nextWord.englishWord,
          options: options,
        });
      }, 1000);
    }
  };

  const restart = () => {
    setQuestionIndex(0);
    setScore(0);
    setFinished(false);
    generateQuestions();
  };

  return {
    currentQuestion,
    handleAnswer,
    result: '',
    score,
    finished,
    restart,
  };
};
