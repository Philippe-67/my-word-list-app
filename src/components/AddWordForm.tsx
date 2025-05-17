// frontend/src/components/AddWordForm.tsx
import React, { useState } from 'react';

const AddWordForm: React.FC = () => {
    const [frenchWord, setFrenchWord] = useState('');
    const [englishWord, setEnglishWord] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newWord = { frenchWord, englishWord };

        fetch('http://localhost:5000/api/words/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newWord),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Mot ajouté:', data);
                // Optionnel : Réinitialiser le formulaire ou mettre à jour la liste de mots
                setFrenchWord('');
                setEnglishWord('');
            })
            .catch((error) => console.error('Erreur:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Mot en français"
                value={frenchWord}
                onChange={(e) => setFrenchWord(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Mot en anglais"
                value={englishWord}
                onChange={(e) => setEnglishWord(e.target.value)}
                required
            />
            <button type="submit">Ajouter le mot</button>
        </form>
    );
};

export default AddWordForm;

