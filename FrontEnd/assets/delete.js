document.addEventListener("DOMContentLoaded", () => {
  const galerieModale = document.querySelector(".modale-gallery");
  const galeriePrincipale = document.querySelector(".gallery");

  document.addEventListener("click", (event) => {
    if (!event.target.classList.contains("trash-icon")) return;

    const figure = event.target.closest("figure");
    if (!figure) return;

    const projectId = figure.dataset.id;
    if (!projectId) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`http://localhost:5678/api/works/${projectId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      if (!res.ok) throw new Error("Erreur suppression API");

      telechargerGalerieModale();
      telechargerGaleriePrincipale();
    })
    .catch(err => console.error("Erreur DELETE :", err));
  });

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

  // la mise a jour pour la fin 
  telechargerGalerieModale();
  telechargerGaleriePrincipale();
});
