// // frontend/src/App.tsx
// import React from "react";
// import Dashboard from "./pages/Dashboard"; // Importer le composant Dashboard
// import AddWordForm from "./pages/AddWordForm";
// import WordList from "./pages/WordList";
// import Quiz from "./pages/Quiz"; // Importer le composant Quiz
// import TypingTest from "./pages/TypingTest"; // Importer le composant TypingTest
// import AddUserForm from "./pages/AddUserForm";
// import LoginForm from "./pages/LoginForm";

// const App: React.FC = () => {
//   return (
//     <div>
//       <Dashboard /> {/* Afficher le tableau de bord */}
//       <AddUserForm />
//        <LoginForm /> {/* Afficher le formulaire de connexion */}
//       <AddWordForm />
//       <WordList />
//       <Quiz /> {/* Afficher le quiz */}
//       <TypingTest /> {/* Afficher le test de saisie */}
//     </div>
//   );
// };

// export default App;
//frontend/src/App.tsx

// import React, { useEffect, useState } from "react";
// import Dashboard from "./pages/Dashboard"; 
// import AddWordForm from "./pages/AddWordForm";
// import WordList from "./pages/WordList";
// import Quiz from "./pages/Quiz"; 
// import TypingTest from "./pages/TypingTest"; 
// import AddUserForm from "./pages/AddUserForm";
// import LoginForm from "./pages/LoginForm";

// const App: React.FC = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour vérifier si l'utilisateur est connecté

//     useEffect(() => {
//      //   Vérifie si le token existe dans le localStorage pour déterminer si l'utilisateur est connecté
//         const token = localStorage.getItem('token');
//         setIsLoggedIn(!!token); // Définit isLoggedIn à true si le token existe
//     }, []);

//     return (
//         <div>
//              {isLoggedIn ? ( // Si l'utilisateur est connecté
//                 <>
//                     {/*  <Dashboard />  */}
//                     <AddWordForm />
//                     {/*  <WordList /> */}
//                     {/* // <Quiz />  */}
//                     {/* // <TypingTest />  */}
//                 </>
//             ) : ( // Si l'utilisateur n'est pas connecté
//                 <>
//                     <AddUserForm />
//                     <LoginForm /> 
//                 </>
//              )}
//         </div>
//     );
// };

// export default App;

// import React, { useEffect, useState } from "react";
// import Dashboard from "./pages/Dashboard"; 
// import AddWordForm from "./pages/AddWordForm";
// import WordList from "./pages/WordList";
// import Quiz from "./pages/Quiz"; 
// import TypingTest from "./pages/TypingTest"; 
// import AddUserForm from "./pages/AddUserForm";
// import LoginForm from "./pages/LoginForm";

// const App: React.FC = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour vérifier si l'utilisateur est connecté
//     console.log(isLoggedIn);
//     const [username, setUsername] = useState<string | null>(null); // État pour stocker le nom d'utilisateur

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         const storedUsername = localStorage.getItem('username'); // Récupérer le nom d'utilisateur
//         setIsLoggedIn(!!token); // Définit isLoggedIn à true si le token existe
//         setUsername(storedUsername); // Définir le nom d'utilisateur
//     }, []);

//     return (
//         <div>
//             {/* {isLoggedIn ? ( // Si l'utilisateur est connecté
//                 <>
//                     <h1>Bienvenue, {username}!</h1> 
//                     <Dashboard /> 
//                     <AddWordForm />
//                     <WordList />
//                     <Quiz /> 
//                     <TypingTest /> 
//                 </>
//             ) : ( // Si l'utilisateur n'est pas connecté
//                 <>
//                     <AddUserForm />
//                     <LoginForm /> 
//                 </>
//             )} */}
//             <LoginForm /> 
//             {isLoggedIn ? ( // Si l'utilisateur est connecté
                
//                     <h1>Bienvenue,{username} </h1>):null} 
//                            </div>);}
    


// // // export default App;
// // import React, { useEffect, useState } from "react";
// // import Dashboard from "./pages/Dashboard"; 
// // import AddWordForm from "./pages/AddWordForm";
// // import WordList from "./pages/WordList";
// // import Quiz from "./pages/Quiz"; 
// // import TypingTest from "./pages/TypingTest"; 
// // import AddUserForm from "./pages/AddUserForm";
// // import LoginForm from "./pages/LoginForm";

// // const App: React.FC = () => {
// //     const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour vérifier si l'utilisateur est connecté
// //     const [username, setUsername] = useState<string | null>(null); // État pour stocker le nom d'utilisateur

// //     useEffect(() => {
// //         const token = localStorage.getItem('token');
// //         const storedUsername = localStorage.getItem('username'); // Récupérer le nom d'utilisateur
// //         setIsLoggedIn(!!token); // Définit isLoggedIn à true si le token existe
// //         setUsername(storedUsername); // Définir le nom d'utilisateur
// //     }, []);

// //     return (
// //         <div>
// //             <LoginForm /> 
// //             {isLoggedIn ? ( // Si l'utilisateur est connecté
// //                 <>
// //                     <h1>Bienvenue, {username}!</h1>
// //                     <Dashboard /> 
// //                     <AddWordForm />
// //                     <WordList />
// //                     <Quiz /> 
// //                     <TypingTest /> 
// //                 </>
// //             ) : ( // Si l'utilisateur n'est pas connecté
// //                 <>
// //                     <AddUserForm />
// //                 </>
// //             )}
// //         </div>
// //     );
// // };

// // export default App;


import { BrowserRouter as Router, Route,Routes  } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import LoginForm from './pages/LoginForm';
import AddUserForm from './pages/AddUserForm';
import AddWordForm from './pages/AddWordForm';
import WordList from './pages/WordList';
import Quiz from './pages/Quiz';
import TypingTest from './pages/TypingTest';

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                 <Route path="/" element={<LoginForm />} /> {/* Notez le changement ici */}
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<AddUserForm />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-word" element={<AddWordForm />} />
                <Route path="/word-list" element={<WordList />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/typing-test" element={<TypingTest />} />
            </Routes>
            <Footer />
            
        </Router>
    );
};

export default App;
