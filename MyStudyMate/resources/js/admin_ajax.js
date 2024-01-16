// Wait for the DOM to be ready
document.addEventListener("DOMContentLoaded", function () {
    chnagerManupulation('emploisTemps');
    // Get all nav buttons and the highlight element
    const navButtons = document.querySelectorAll(".nav-button");
    const slectRole = document.getElementById("selectRole");
    const isdeleg = document.getElementById("isdeleg");
    const highlightElement = document.getElementById("nav-content-highlight2");


    // Function to handle the active state
    function handleActive(index) {
      navButtons.forEach((button, i) => {
        button.classList.remove(`active-side${i + 1}`);
        button.classList.remove(`active-side`);
      });
      const center = document.querySelector(".center");
      navButtons[index].classList.add(`active-side${index + 1}`);
      navButtons[index].classList.add(`active-side`);
      if(navButtons[index].querySelector("span").textContent === "Affectation des Salle"){
        chnagerManupulation('affectationSalle');
        center.style.opacity = 0;
      }else if(navButtons[index].querySelector("span").textContent === "Gestion des emplois du temps"){
        chnagerManupulation('emploisTemps');
        center.style.opacity = 0;
      }else if(navButtons[index].querySelector("span").textContent === "Ajouter Membres"){
        chnagerManupulation('addEtudiant');
        center.style.opacity = 0;
      }else if(navButtons[index].querySelector("span").textContent === "Gérer Annonces Département"){
        chnagerManupulation('annonce');
        center.style.opacity = 0;
      }
    }

    // Add event listeners to each nav button
    navButtons.forEach((button, index) => {
      button.addEventListener("click", () => handleActive(index));
    });

    //show and hide delegue input
    slectRole.addEventListener('change', ()=>{
        var value = slectRole.value;
        console.log(value)
        if(value == 5)
            isdeleg.style.display= 'block';
        else
            isdeleg.style.display= 'none';

    })
  });

//   ajax part

function chnagerManupulation(url) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const center = document.querySelector(".center");
            document.querySelector(".center").innerHTML = xhr.responseText;
            setTimeout(function () {
                center.style.opacity = 1; // Set opacity to 1 to fade in the content
            }, 30);
        }
    };
    xhr.open("GET", url, true); //erreur
    xhr.send();
}




