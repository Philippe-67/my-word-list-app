// frontend/src/pages/WordList.tsx
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
interface WordListProps {
    token: string; // Prop pour le token
}
const WordList: React.FC<WordListProps> = ({ token }) => {
    const [words, setWords] = useState<{ _id: string; frenchWord: string; englishWord: string, categoryWord:string }[]>([]);
    const [editingWord, setEditingWord] = useState<{ _id: string; frenchWord: string; englishWord: string, categoryWord:string} | null>(null);
    const [frenchWord, setFrenchWord] = useState('');
    const [englishWord, setEnglishWord] = useState('');
    const [categoryWord, setCategoryWord] = useState('');

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
     const handleEdit = (word: { _id: string; frenchWord: string; englishWord: string;categoryWord: string }) => {
        setEditingWord(word);
        setFrenchWord(word.frenchWord);
        setEnglishWord(word.englishWord);
        setCategoryWord(word.categoryWord);
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
                body: JSON.stringify({ frenchWord, englishWord, categoryWord }),
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
                    setCategoryWord('');
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
        <div>
            <Header/>
            <Navbar/>
        </div>
        <div className='container'>
            <h1>Liste de Mots</h1>
            <ul>
                {words.map((word) => (
                    <li key={word._id}>
                        <span><em>{word.frenchWord}</em> - <strong>{word.englishWord}</strong>-<em>{word.categoryWord}</em></span>
                        <button type='button' onClick={() => handleEdit(word)}>Modifier</button>
                        <button type='button' onClick={() => handleDelete(word._id)}>Supprimer</button>
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
                    <input
                        type="text"
                        placeholder="Catégorie"
                        value={categoryWord}
                        onChange={(e) => setCategoryWord(e.target.value)}
                        required />
                    <button type="submit">Mettre à Jour</button>
                    <button onClick={() => setEditingWord(null)}>Annuler</button>
                </form>
            )}
        </div>
        <Footer/>
        </>
    );
};

export default WordList;
