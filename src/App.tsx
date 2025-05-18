// frontend/src/App.tsx
import React from "react";
import Dashboard from "./components/Dashboard"; // Importer le composant Dashboard
import AddWordForm from "./components/AddWordForm";
import WordList from "./components/WordList";
import Quiz from "./components/Quiz"; // Importer le composant Quiz
import TypingTest from "./components/TypingTest"; // Importer le composant TypingTest
import AddUserForm from "./components/AddUserForm";

const App: React.FC = () => {
  return (
    <div>
      <Dashboard /> {/* Afficher le tableau de bord */}
      <AddUserForm />
      <AddWordForm />
      <WordList />
      <Quiz /> {/* Afficher le quiz */}
      <TypingTest /> {/* Afficher le test de saisie */}
    </div>
  );
};

export default App;
