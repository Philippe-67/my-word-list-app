import { Link } from "react-router-dom";
import '../App.css'


const Header = () => {
    return (
        <header><>
           <div><h1 className="headerTitle">fastoche word</h1></div> 
            <nav className="navBar">
                <ul>
                    <li><Link to="/dashboard">Tableau de Bord</Link></li>
                    <li><Link to="/add-word">Ajout de mots</Link></li>
                    <li><Link to="/">Liste de Mots</Link></li>
                    <li><Link to="/quiz">Quiz</Link></li>
                    <li><Link to="/typingTest">Test de Saisie</Link></li>
                    {/* Ajoutez des liens conditionnels ici pour la déconnexion */}
                     {/* <LoginForm /> */}
                </ul>
            </nav>
            </>
        </header>
    );
};

export default Header;