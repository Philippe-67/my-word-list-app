
const Header = () => {
    return (
        <header>
            <h1>fastoche word</h1>
            <nav>
                <ul>
                    <li><a href="/dashboard">Tableau de Bord</a></li>
                    <li><a href="/add-Word">Ajout de mots</a></li>
                    <li><a href="/word-list">Liste de Mots</a></li>
                    <li><a href="/quiz">Quiz</a></li>
                    <li><a href="/typing-test">Test de Saisie</a></li>
                    {/* Ajoutez des liens conditionnels ici pour la déconnexion */}
                </ul>
            </nav>
        </header>
    );
};

export default Header;