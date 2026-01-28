
const addPhotoBtn = document.querySelector(".add-photo-btn");
const galerieWrapper = document.querySelector(".galerie-wrapper");
const addPhotoContent = document.querySelector(".add-photo-content");
const arrowBack = document.createElement("button"); 
arrowBack.classList.add("arrow-left");
arrowBack.innerHTML = `<img src="./assets/icons/arrow-left.svg" alt="Retour">`;

// la flèche dans la modale ajout photo
addPhotoContent.prepend(arrowBack);

// Input image, titre, catégorie
const inputImage = document.createElement("input");
inputImage.type = "file";
inputImage.accept = "image/png, image/jpeg";
inputImage.style.display = "none"; 

const cadreBleu = document.querySelector(".cadre-ajout-photo");
cadreBleu.appendChild(inputImage);

// Bouton Valider
const validerBtn = document.getElementById("valider-projet");

// l'ouverture de la vue "Ajout photo"
addPhotoBtn.addEventListener("click", () => {
  galerieWrapper.style.display = "none";
  addPhotoBtn.style.display = "none";
  addPhotoContent.style.display = "block";
  resetAddPhoto(); 
});

//  la flèche back
arrowBack.addEventListener("click", () => {
  addPhotoContent.style.display = "none";
  galerieWrapper.style.display = "block";
  addPhotoBtn.style.display = "block";
  resetAddPhoto();
});

//  pour choisir une image
cadreBleu.addEventListener("click", () => {
  inputImage.click();
});

//  l'image choisie
inputImage.addEventListener("change", () => {
  const file = inputImage.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      let previewImg = cadreBleu.querySelector("img.preview");
      if (!previewImg) {
        previewImg = document.createElement("img");
        previewImg.classList.add("preview");
        cadreBleu.appendChild(previewImg);
      }
      previewImg.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
  checkFormValidity();
});

// Vérification des champs pour activer le bouton Valider
const titreInput = document.getElementById("titre");
const categorieSelect = document.getElementById("categorie");

[titreInput, categorieSelect].forEach(el => {
  el.addEventListener("input", checkFormValidity);
});

function checkFormValidity() {
  const imageSelected = inputImage.files.length > 0;
  const titreFilled = titreInput.value.trim() !== "";
  const categorieSelected = categorieSelect.value.trim() !== "";
  if (imageSelected && titreFilled && categorieSelected) {
    validerBtn.classList.add("active"); 
  } else {
    validerBtn.classList.remove("active"); 
  }
}

// Reset ajout photo
function resetAddPhoto() {
  titreInput.value = "";
  categorieSelect.value = "";
  validerBtn.classList.remove("active");
  const previewImg = cadreBleu.querySelector("img.preview");
  if (previewImg) previewImg.remove();
  inputImage.value = "";
}

// Gestion clic Valider (ajouter photo)
validerBtn.addEventListener("click", () => {
  if (validerBtn.classList.contains("active")) {
    // ici on met le code pour envoyer sur l'API
    console.log("Photo ajoutée !");
    // reset modale après ajout
    resetAddPhoto();
    addPhotoContent.style.display = "none";
    galerieWrapper.style.display = "block";
    addPhotoBtn.style.display = "block";
  }
});
const previewImage = document.createElement("img");
previewImage.src = URL.createObjectURL(file);
previewImage.classList.add("preview");
cadreAjoutPhoto.appendChild(previewImage);
