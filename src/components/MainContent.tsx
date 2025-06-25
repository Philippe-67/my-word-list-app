// MainContent.tsx
import React from 'react';
import AddWordForm from '../pages/AddWordForm';
import Dashboard from '../pages/Dashboard';
import Quiz from '../pages/Quiz';
import TypingTest from '../pages/TypingTest';
import WordList from '../pages/WordList';



const MainContent: React.FC<{ activeComponent: string }> = ({ activeComponent }) => {
    return (
        <div>
            {/* <Dashboard token={''} />
            {activeComponent === 'quiz' && <Quiz token={''} />}
            {activeComponent === 'typingTest' && <TypingTest token={''} />}
            {activeComponent === 'addWord' && <AddWordForm token={''} />}
            {activeComponent === 'wordList' && <WordList token={''} />} */}
              <div>
            {activeComponent === 'dashboard' && <Dashboard token={''} />}
            {activeComponent === 'quiz' && <Quiz token={''} />}
            {activeComponent === 'typingTest' && <TypingTest token={''} />}
            {activeComponent === 'addWord' && <AddWordForm token={''} />}
            {activeComponent === 'wordList' && <WordList token={''} />}
        </div>
        </div>
    );
};

export default MainContent;
