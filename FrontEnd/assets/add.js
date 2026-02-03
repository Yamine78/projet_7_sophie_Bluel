document.addEventListener("DOMContentLoaded", () => {
  const modale = document.querySelector(".modale");
  const overlay = document.querySelector(".overlay");
  const btnModifier = document.querySelectorAll(".edit-mode");
  const btnAjouterPhoto = document.querySelector(".add-photo-btn");
  const btnRetour = document.querySelector(".arrow-left");
  const vueGalerie = document.querySelector(".galerie-wrapper");
  const vueAjout = document.querySelector(".add-photo-content");

  const cadrePhoto = document.querySelector(".cadre-ajout-photo");
  const inputFile = document.createElement("input");
  inputFile.type = "file";
  inputFile.accept = "image/png, image/jpeg";
  inputFile.style.display = "none";
  cadrePhoto.appendChild(inputFile);

  const inputTitre = document.getElementById("titre");
  const selectCategorie = document.getElementById("categorie");
  const btnValider = document.getElementById("valider-projet");

  const galeriePrincipale = document.querySelector(".gallery");
  const galerieModale = document.querySelector(".modale-gallery");

  // gestion de la modale 
  btnModifier.forEach(btn => btn.addEventListener("click", ouvrirModale));
  overlay.addEventListener("click", fermerModale);
  document.querySelector(".close-modale").addEventListener("click", fermerModale);

  function ouvrirModale() {
    overlay.style.display = "block";
    modale.style.display = "flex";
    afficherGalerie();
    telechargerGalerieModale();
  }

  function fermerModale() {
    modale.style.display = "none";
    overlay.style.display = "none";
    resetForm();
  }

  function afficherGalerie() {
    vueGalerie.style.display = "block";
    galerieModale.style.display = "grid";
    btnAjouterPhoto.style.display = "block";
    vueAjout.style.display = "none";
  }

  // bouton pour l'ajout de photo
  btnAjouterPhoto.addEventListener("click", () => {
    vueGalerie.style.display = "none";
    btnAjouterPhoto.style.display = "none";
    vueAjout.style.display = "flex";
    resetForm();
  });

  btnRetour.addEventListener("click", () => {
    afficherGalerie();
    resetForm();
  });

  // l'apercu de l'image 
  cadrePhoto.addEventListener("click", () => inputFile.click());

  inputFile.addEventListener("change", () => {
    const file = inputFile.files[0];
    if (!file) return;

    let preview = cadrePhoto.querySelector("img.preview");
    if (!preview) {
      preview = document.createElement("img");
      preview.classList.add("preview");
      cadrePhoto.appendChild(preview);
    }

    const reader = new FileReader();
    reader.onload = e => preview.src = e.target.result;
    reader.readAsDataURL(file);

    checkFormValidity();
  });

  // le formulaire 
  [inputTitre, selectCategorie].forEach(el => el.addEventListener("input", checkFormValidity));

  function checkFormValidity() {
    const valid = inputFile.files.length && inputTitre.value.trim() !== "" && selectCategorie.value !== "";
    btnValider.classList.toggle("active", valid);
  }

  function resetForm() {
    inputTitre.value = "";
    selectCategorie.value = "";
    btnValider.classList.remove("active");
    const preview = cadrePhoto.querySelector("img.preview");
    if (preview) preview.remove();
    inputFile.value = "";
  }

  // l' Ajout d'une image
  btnValider.addEventListener("click", () => {
    if (!btnValider.classList.contains("active")) return;

    const formData = new FormData();
    formData.append("image", inputFile.files[0]);
    formData.append("title", inputTitre.value.trim());
    formData.append("category", selectCategorie.value);

    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: formData
    })
    .then(res => {
      if (!res.ok) throw new Error("Erreur ajout projet");
      return res.json();
    })
    .then(() => {
      telechargerGaleriePrincipale(); 
      telechargerGalerieModale();     
      fermerModale();                  
    })
    .catch(err => console.error(err));
  });

  // Télécharger la galerie modale 
  function telechargerGalerieModale() {
    fetch("http://localhost:5678/api/works")
      .then(res => res.json())
      .then(projets => {
        galerieModale.innerHTML = "";
        projets.forEach(p => {
          const figure = document.createElement("figure");
          figure.dataset.id = p.id;

          const img = document.createElement("img");
          img.src = p.imageUrl;
          img.alt = p.title;

          const icone = document.createElement("i");
          icone.classList.add("fa-solid", "fa-trash-can", "trash-icon");

          figure.append(img, icone);
          galerieModale.appendChild(figure);
        });
      });
  }

  // Télécharger la galerie du site 
  function telechargerGaleriePrincipale() {
    fetch("http://localhost:5678/api/works")
      .then(res => res.json())
      .then(projets => {
        galeriePrincipale.innerHTML = "";
        projets.forEach(p => {
          const figure = document.createElement("figure");
          const img = document.createElement("img");
          img.src = p.imageUrl;
          img.alt = p.title;

          const caption = document.createElement("figcaption");
          caption.textContent = p.title;

          figure.append(img, caption);
          galeriePrincipale.appendChild(figure);
        });
      });
  }

  // mise a jours a la fin 
  telechargerGaleriePrincipale();
  telechargerGalerieModale();
});
