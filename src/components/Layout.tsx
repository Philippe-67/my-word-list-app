
// import React, { useState } from 'react';
// import Footer from "./Footer";
// import Navbar from "./Navbar";
// import MainContent from './MainContent'; // Assurez-vous d'importer MainContent

// interface LayoutProps {
//     // children: React.ReactNode;
//     activeComponent: string; // Ajoutez activeComponent ici
// }
// const Layout: React.FC<LayoutProps> = ({  activeComponent }) => {
//       // État local pour gérer le composant actif
//     const [currentComponent, setCurrentComponent] = useState<string>(activeComponent);

//         const handleSelect = (component: string) => {
//         console.log(`Selected component: ${component}`);
//         // Ici, vous pouvez gérer la logique pour changer le composant actif, par exemple en utilisant un état:
//          setCurrentComponent(component); // Met à jour l'état avec le composant sélectionné
//     };

//     return (
//         <div>
//             <Navbar onSelect={handleSelect} /> {/* Passer la fonction onSelect */}
//              <main>
//                 {/* {children} Cela affichera les routes */}
//                  <MainContent activeComponent={activeComponent} />{/* Optionnel : Si vous souhaitez afficher MainContent ici aussi */}
//             </main>
//             <Footer />
//         </div>
//     );
// };

// export default Layout;
// import React, { useState } from 'react';
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import MainContent from './MainContent';

// const Layout: React.FC<{ activeComponent: string }> = ({ activeComponent }) => {
//     const [currentComponent, setCurrentComponent] = useState<string>(activeComponent);

//     const handleSelect = (component: string) => {
//         console.log(`Selected component: ${component}`);
//         setCurrentComponent(component);
//     };

//     return (
//         <div>
//             <Navbar onSelect={handleSelect} />
//             <main>
//                 <MainContent activeComponent={currentComponent} />
//             </main>
//             <Footer />
//         </div>
//     );
// };

// export default Layout;
