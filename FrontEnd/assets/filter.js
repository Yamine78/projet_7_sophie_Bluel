const gallery = document.querySelector('.gallery');
const filterbuttons = document.querySelector('.filter-buttons')

fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(projects => {
        console.log(projects);

        // fonction pour afficher un projet
        function afficherProjet(projet) {

            const figure = document.createElement("figure")

            const img = document.createElement("img");
            img.src = projet.imageUrl; img.alt = projet.title;

            const figcaption = document.createElement("figcaption");
            figcaption.innerHTML = projet.title

            figure.appendChild(img)
            figure.appendChild(figcaption)
            gallery.appendChild(figure)
        }
        projects.forEach(projet => afficherProjet(projet));


        fetch('http://localhost:5678/api/categories')
            .then(response => response.json())
            .then(categories => {
                console.log(categories);

                // le bouton "Tous"
                const btnTous = document.createElement('button');
                btnTous.innerHTML = 'Tous';
                btnTous.classList.add('btn-filter', 'active'); 
                filterbuttons.appendChild(btnTous);

                btnTous.addEventListener('click', () => {
                    gallery.innerHTML = ''; 
                    projects.forEach(projet => afficherProjet(projet));  // affiche tous les projets
                });

                //  les autres boutons des catégories
                categories.forEach(categorie => {
                    const button = document.createElement('button');
                    button.innerHTML = categorie.name;
                    button.classList.add('btn-filter');

                    filterbuttons.appendChild(button);

                    button.addEventListener('click', () => {
                        gallery.innerHTML = ''; 
                        projects.forEach(projet => {
                            if (projet.categoryId === categorie.id) {
                                afficherProjet(projet);
                            }
                        });
                    });
                });
            })
            .catch(error => console.error('Erreur fetch categories:', error));
    })
    .catch(error => console.error('Erreur:', error));