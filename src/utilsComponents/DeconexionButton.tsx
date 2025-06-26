import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ButtonDeconexion: React.FC = () => {
  const navigate = useNavigate(); // Utilisez useNavigate pour créer une fonction de navigation
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  

  const handleLogout = () => {
    localStorage.removeItem("token"); // Supprime le token du localStorage
    setIsAuthenticated(false);
    navigate("/login"); // Redirigez vers la page de connexion
  };
  return (
    <>
      {isAuthenticated && (
        <button className="buttonDeconexion" onClick={handleLogout}>
          Déconnexion
        </button>
      )}
    </>
  );
};
export default ButtonDeconexion;
