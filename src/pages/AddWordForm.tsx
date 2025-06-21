import React, { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

interface AddWordFormProps {
    token: string; // Prop pour le token
}

const AddWordForm: React.FC<AddWordFormProps> = ({ token }) => {
    const [frenchWord, setFrenchWord] = useState('');
    const [englishWord, setEnglishWord] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newWord = { frenchWord, englishWord };

        console.log('voici le token récupéré:', token); // Cela devrait afficher le token correct

        try {
            const response = await fetch('http://localhost:5000/api/words/add-word', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Ajouter le token dans l'en-tête
                },
                body: JSON.stringify(newWord),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout du mot');
            }

            const data = await response.json();
            console.log('Mot ajouté:', data);
            setMessage('Mot ajouté avec succès');
            // Réinitialiser le formulaire
            setFrenchWord('');
            setEnglishWord('');
        } catch (error) {
            setMessage('Une erreur est survenue lors de l\'ajout du mot.'); // Message d'erreur convivial
            console.error('Erreur:', error);
        }
    };

    return (
        <>
        <Header/>
        <form onSubmit={handleSubmit}>
            <h1>Ajout de mot(s)</h1>
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
            <button type="submit">Ajouter le mot</button>
            {message && <p>{message}</p>} {/* Afficher un message de retour */}
        </form>
        <Footer/>
        </>
    );
};

export default AddWordForm;
