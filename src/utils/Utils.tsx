 function isLogin(): boolean {
    const token = localStorage.getItem('token');
    return token !== null; // Retourne true ou false
}

// Utilisation correcte
if (isLogin()) {
    console.log("L'utilisateur est connecté.");
} else {
    console.log("L'utilisateur n'est pas connecté.");
}
export default isLogin;