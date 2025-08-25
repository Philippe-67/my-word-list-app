import { useState, useEffect } from 'react';

export interface Word {
  _id: string;
  frenchWord: string;
  englishWord: string;
}

export function useQuestions(token: string): { questions: Word[] } {
  const [questions, setQuestions] = useState<Word[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/words', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((data: Word[]) => setQuestions(data))
      .catch(console.error);
  }, [token]);

  return { questions };
}
