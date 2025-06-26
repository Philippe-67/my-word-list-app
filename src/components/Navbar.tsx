// Navbar.tsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './../App.css';

// // interface NavbarProps {
// //     onSelect: (component: string) => void;
// // }

// const Navbar: React.FC<NavbarProps> = ({ onSelect }) => {
//     return (
//         <nav className='navbar'>
//             <ul>
//                 <li onClick={() => onSelect('dashboard')}>Tableau de Bord</li>
//                 <li onClick={() => onSelect('quiz')}>Quiz</li>
//                 <li onClick={() => onSelect('typingTest')}>Typing Test</li>
//                 <li onClick={() => onSelect('addWord')}>Add Word</li>
//                 <li onClick={() => onSelect('wordList')}>Word List</li>
//                 {/* Ajoutez d'autres éléments si besoin */}
//             </ul>
//         </nav>
//     );
// };

//export default Navbar;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './../App.css';
import ButtonDeconexion from '../utilsComponents/DeconexionButton';

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <nav className='navbar'>
            <ul>
                <li onClick={() => navigate('/Dashboard')}>Tableau de Bord</li>
                <li onClick={() => navigate('/quiz')}>Quiz</li>
                <li onClick={() => navigate('/typingTest')}>Typing Test</li>
                <li onClick={() => navigate('/add-word')}>Add Word</li>
                <li onClick={() => navigate('/')}>Word List</li>
                {/* Ajoutez d'autres éléments si besoin */}
                 <ButtonDeconexion/>
            </ul>
        </nav>
    );
};

export default Navbar;

