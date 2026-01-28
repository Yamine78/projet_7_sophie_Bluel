const token = localStorage.getItem("token");
console.log("Connexion réussie:", token);

const editBanner = document.querySelector(".edit-banner");        
const editMode = document.querySelector(".edit-mode");            
const editIcon = document.querySelector("h2 i.fa-pen-to-square"); 
const loginLink = document.querySelector(".nav-login");           
const filters = document.querySelector(".filter-buttons");        

function afficherModeEdition() {
  if (token) {
  
    if (editBanner) editBanner.style.display = "flex";  
    if (editMode) editMode.style.display = "inline";    
    if (editIcon) editIcon.style.display = "inline";    
    if (filters) filters.style.display = "none";       

    if (loginLink) {
      loginLink.textContent = "logout"; 
      loginLink.href = "index.html"; 
      loginLink.addEventListener("click", () => {
                localStorage.removeItem("token");                
                location.href = "index.html";    
           });
    }

  } else {
    
    if (editBanner) editBanner.style.display = "none";  
    if (editMode) editMode.style.display = "none";      
    if (editIcon) editIcon.style.display = "none";      
    if (filters) filters.style.display = "flex";        

    if (loginLink) {
      loginLink.textContent = "login";  
      loginLink.href = "login.html";             
    }
  }
}

afficherModeEdition();
