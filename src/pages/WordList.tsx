// frontend/src/pages/WordList.tsx
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
interface WordListProps {
    token: string; // Prop pour le token
}
const WordList: React.FC<WordListProps> = ({ token }) => {
    const [words, setWords] = useState<{ _id: string; frenchWord: string; englishWord: string }[]>([]);
    const [editingWord, setEditingWord] = useState<{ _id: string; frenchWord: string; englishWord: string } | null>(null);
    const [frenchWord, setFrenchWord] = useState('');
    const [englishWord, setEnglishWord] = useState('');

    useEffect(() => {
         const token = localStorage.getItem('token'); // Récupère le token de l'utilisateur
         fetch('http://localhost:5000/api/words', {
            method: 'GET',
            headers: {
                
                'Content-Type': 'application/json',
                'Authorization':  `Bearer ${token}` ,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des mots');
                }
                return response.json();
            })
            .then((data) => setWords(data))
            .catch((error) => console.error('Erreur:', error));
    }, [token]);
     const handleEdit = (word: { _id: string; frenchWord: string; englishWord: string }) => {
        setEditingWord(word);
        setFrenchWord(word.frenchWord);
        setEnglishWord(word.englishWord);
    };

      const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingWord) {
            const token = localStorage.getItem('token'); // Récupère le token de l'utilisateur

            fetch(`http://localhost:5000/api/words/update/${editingWord._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization':  `Bearer ${token}` ,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ frenchWord, englishWord }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Erreur lors de la mise à jour du mot');
                    }
                    return response.json();
                })
                .then((data) => {
                    setWords(words.map(word => (word._id === data._id ? data : word)));
                    setEditingWord(null);
                    setFrenchWord('');
                    setEnglishWord('');
                })
                .catch((error) => console.error('Erreur:', error));
        }
    };

  
    const handleDelete = (id: string) => {
        const token=localStorage.getItem('token');
        fetch(`http://localhost:5000/api/words/delete/${id}`, {
            method: 'DELETE',
         headers: {
                'Authorization':`Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(() => {
                setWords(words.filter(word => word._id !== id));
            })
            .catch((error) => console.error('Erreur:', error));
    };

    return (
        <>
        <Header/>
        <Navbar/>
        <div>
            <h1>Liste de Mots</h1>
            <ul>
                {words.map((word) => (
                    <li key={word._id}>
                        {word.frenchWord} - {word.englishWord}
                        <button onClick={() => handleEdit(word)}>Modifier</button>
                        <button onClick={() => handleDelete(word._id)}>Supprimer</button>
                    </li>
                ))}
            </ul>

            {editingWord && (
                <form onSubmit={handleUpdate}>
                    <h2>Modifier le Mot</h2>
                    <input
                        type="text"
                        placeholder="Mot en français"
                        value={frenchWord}
                        onChange={(e) => setFrenchWord(e.target.value)}
                        required />
                    <input
                        type="text"
                        placeholder="Mot en anglais"
                        value={englishWord}
                        onChange={(e) => setEnglishWord(e.target.value)}
                        required />
                    <button type="submit">Mettre à Jour</button>
                    <button onClick={() => setEditingWord(null)}>Annuler</button>
                </form>
            )}
        </div>
        </>
    );
};

export default WordList;
