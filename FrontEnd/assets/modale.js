
const modale = document.querySelector(".modale");
const overlay = document.querySelector(".overlay");
const boutonOuvrir = document.querySelector(".edit-mode");
const boutonFermer = document.querySelector(".close-modale");
const galerieModale = document.querySelector(".modale-gallery");

overlay.style.display = "none";
modale.style.display = "none";

// Ouvrir la modale
boutonOuvrir.addEventListener("click", () => {
    overlay.style.display = "block";
    modale.style.display = "flex"; 
    telechargerGalerie();
});

// Fermer via la croix
boutonFermer.addEventListener("click", () => {
    fermerModale();
});

// Fermer via l'overlay
overlay.addEventListener("click", () => {
    fermerModale();
});

// Fonction pour fermer la modale et overlay
function fermerModale() {
    modale.style.display = "none";
    overlay.style.display = "none";
}

// Télécharger  la galerie
function telechargerGalerie() {
    fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(projets => {
            galerieModale.innerHTML = ""; 
            projets.forEach(projet => afficherImageGalerie(projet));
        })
        .catch(error => console.error("Erreur chargement galerie :", error));
}

//  afficher une l'image dans la galerie
function afficherImageGalerie(projet) {
    const figure = document.createElement("figure");
    figure.classList.add("modal-figure");

    const image = document.createElement("img");
    image.src = projet.imageUrl;
    image.alt = projet.title;

    const iconePoubelle = document.createElement("i");
    iconePoubelle.classList.add("fa-solid", "fa-trash-can", "trash-icon");

    figure.appendChild(image);
    figure.appendChild(iconePoubelle);
    galerieModale.appendChild(figure);
}
