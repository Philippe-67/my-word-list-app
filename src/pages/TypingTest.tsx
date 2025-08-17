// import React, { useEffect, useState } from 'react';
// import Header from '../components/Header';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// interface TypingTestProps {
//     token: string; // Prop pour le token
// }

// const TypingTest: React.FC<TypingTestProps> = ({ token }) => {
//     const [words, setWords] = useState<{ _id: string; frenchWord: string; englishWord: string }[]>([]);
//     const [currentWord, setCurrentWord] = useState<{ frenchWord: string; englishWord: string } | null>(null);
//     const [userAnswer, setUserAnswer] = useState('');
//     const [result, setResult] = useState('');
//     const [stars, setStars] = useState(0); // État pour les étoiles
//     const [testFinished, setTestFinished] = useState(false); // État pour vérifier si le test est terminé
//     const [starStatus, setStarStatus] = useState<'correct' | 'incorrect' | null[]>(Array(5).fill(null));;


//     useEffect(() => {
//         fetch('http://localhost:5000/api/words', {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${token}`, // Ajouter le token dans l'en-tête
//                 'Content-Type': 'application/json',
//             },
//         })
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Erreur lors de la récupération des mots');
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 setWords(data);
//                 setNewWord(data); // Appeler setNewWord pour définir le mot actuel
//             })
//             .catch((error) => console.error('Erreur:', error));
//     }, [token]);

//     const setNewWord = (data: { _id: string; frenchWord: string; englishWord: string }[]) => {
//         const randomWord = data[Math.floor(Math.random() * data.length)];
//         setCurrentWord(randomWord);
//         setUserAnswer('');
//         setResult('');
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (currentWord) {
//              if (userAnswer.toLowerCase() === currentWord.englishWord.toLowerCase()) {
//                  setResult('Correct !');
//                  setStarStatus('correct'); // réponse correcte
//                  setStars(prev => {
//                      const newStars = prev + 1;
//                      if (newStars >= 5) {
//                          setTestFinished(true);
//                      }
//                     return newStars;
//                  });
//             //     // Ajouter une étoile à chaque bonne réponse

//              } else {
//                  setResult('Incorrect ! La bonne réponse est : ' + currentWord.englishWord);
//                  setStars(prev => prev + 1);
//                  setStarStatus('incorrect'); // réponse incorrecte
//              }
//             // // Vérifiez si l'utilisateur a atteint un certain nombre de réponses
//              if (stars + 1 >= 6) { // Par exemple, 5 bonnes réponses
//                  setTestFinished(true);

// };
        
//  } else {
//                 setTimeout(() => {
//                    // setStarStatus(null);
//                     setNewWord(words)
//                 },
//                     1000); // Attendre 1 seconde avant d'afficher un nouveau mot
//             }
        
//     };

//     const restartTest = () => {
//         setStars(0);
//         setResult('');
//         setTestFinished(false);
//         // Réinitialiser le test pour redémarrer avec un nouveau mot
//         setNewWord(words);
//     };

//     return (
//         <>
//             <Header />
//             <Navbar />
//             <div className="container">
//                 <div className="main">
//                     <h1>Test de Saisie</h1>
//                     {testFinished ? (
//                         <div>
//                             <h2>Test terminé ! Vous avez obtenu {stars} étoiles.</h2>
//                             <button onClick={restartTest}>Relancer le test</button>
//                         </div>
//                     ) : (
//                         currentWord && (
//                             <div>
//                                 <h2>{currentWord.frenchWord}</h2>
//                                 <form onSubmit={handleSubmit}>
//                                     <input
//                                         type="text"
//                                         value={userAnswer}
//                                         onChange={(e) => setUserAnswer(e.target.value)}
//                                         placeholder="Entrez la traduction en anglais"
//                                         required />
//                                     <button type="submit">Vérifier</button>
//                                 </form>
//                                 {result && <p>{result}</p>}
//                                 <div>
//                                     {/* Affichage des étoiles */}
//                                     {Array.from({ length: 5 }, (_, index) => {
//                                         let className = 'star';

//                                         if (index < stars) {
//                                             className += 'filled';
//                                         }

//                                         if (index === stars - 1) {
//                                             if (starStatus === 'incorrect') {
//                                                 className = 'star incorrect';
//                                             } else if (starStatus === 'correct') {
//                                                 className = 'star correct';
                                                
//                                             }
//                                         }
//                                          console.log('Étoile', index, 'classe:', className); // Vérification ici
//                                         return (
//                                             <span key={index}
//                                                 className={className}>
//                                                 ★
//                                             </span>
//                                         );
//                                     })}
//                                 </div>
//                             </div>
//                         )
//                     )}
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default TypingTest;
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface TypingTestProps {
  token: string;
}

const TypingTest: React.FC<TypingTestProps> = ({ token }) => {
  const [words, setWords] = useState<{ _id: string; frenchWord: string; englishWord: string }[]>([]);
  const [currentWord, setCurrentWord] = useState<{ frenchWord: string; englishWord: string } | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [result, setResult] = useState('');
  const [stars, setStars] = useState(0);
  const [testFinished, setTestFinished] = useState(false);
  // Tableau pour le statut de chaque étoile : 'correct', 'incorrect' ou null
  const [starsStatus, setStarsStatus] = useState<( 'correct' | 'incorrect' | null )[]>(Array(5).fill(null));

  // Récupération des mots
  useEffect(() => {
    fetch('http://localhost:5000/api/words', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Erreur lors de la récupération des mots');
        return response.json();
      })
      .then((data) => {
        setWords(data);
        setNewWord(data);
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
      const isCorrect = userAnswer.toLowerCase() === currentWord.englishWord.toLowerCase();
      setResult(isCorrect ? 'Correct !' : 'Incorrect ! La bonne réponse est : ' + currentWord.englishWord);
      
      // Mettre à jour le statut de cette étoile
      setStars(prev => {
        const newStars = prev + 1;
        if (newStars >= 5) {
          setTestFinished(true);
        }
        return newStars;
      });
      setStarsStatus(prev => {
        const newStatus = [...prev];
        newStatus[stars] = isCorrect ? 'correct' : 'incorrect';
        return newStatus;
      });
    } else {
      // Si pas de mot actuel, on ne fait rien
      return;
    }

    // Après 1 seconde, charger un nouveau mot sans réinitialiser le statut
    setTimeout(() => {
      setNewWord(words);
    }, 1000);
  };

  const restartTest = () => {
    setStars(0);
    setResult('');
    setTestFinished(false);
    setStarsStatus(Array(5).fill(null));
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
              <button onClick={restartTest}>Relancer le test</button>
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
                    required
                  />
                  <button type="submit">Vérifier</button>
                </form>
                {result && <p>{result}</p>}
                <div style={{ display: 'flex', marginTop: '10px' }}>
                  {/* Affichage des étoiles */}
                  {Array.from({ length: 5 }, (_, index) => {
                    let className = 'star';

                    if (index < stars) {
                      className += ' filled';
                    }

                    if (index < stars && starsStatus[index]) {
                      if (starsStatus[index] === 'correct') {
                        className += ' correct';
                      } else if (starsStatus[index] === 'incorrect') {
                        className += ' incorrect';
                      }
                    }

                    // console.log('Étoile', index, 'classe:', className); // Si besoin
                    return (
                      <span key={index} className={className} style={{ fontSize: '30px', marginRight: '5px' }}>
                        ★
                      </span>
                    );
                  })}
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

