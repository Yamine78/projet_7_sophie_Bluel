
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const bouton = document.querySelector("#login-button");
const messageErreur = document.querySelector("#message-erreur");

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPassword = /^[A-Za-z0-9]+$/;

bouton.addEventListener("click", async function (event) {
    event.preventDefault();

    console.log("Email saisi :", email.value);
    console.log("Password saisi :", password.value);

    // Vérification des champs vides
    if (email.value === "" || password.value === "") {
        messageErreur.textContent = "Veuillez completer tous les champs";
        return;
    }
    // Vérification regex
    if (!regexEmail.test(email.value) || !regexPassword.test(password.value)) {
        messageErreur.textContent = "Erreur dans l’identifiant ou le mot de passe";
        return;
    }

    // conexxion de l'API
    const loginData = {
        email: email.value,
        password: password.value
    };

    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData)
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.token;
            console.log("Connexion réussie", token);
            localStorage.setItem("token", token);

            // si c'est ok = la page d'accueil
            window.location.href = "index.html";

        } else {
            messageErreur.textContent = "Erreur dans l’identifiant et/ou le mot de passe ";
        }
    } catch (error) {
        console.error("Erreur lors de la requête :", error);
        messageErreur.textContent = "Erreur serveur, veuillez réessayer plus tard";
    }
});