// Wait for the DOM to be ready
document.addEventListener("DOMContentLoaded", function () {




    // Check if the previous URL ends with "/choixMode"
    var referrer = document.referrer;
    var added='';
    var lastSegment = referrer.substr(referrer.lastIndexOf('/') + 1);

    if (lastSegment == "chefDep") {
        chnagerManupulation('chefDep/annonce');
        fetchData();
        var navButtons = document.querySelectorAll(".nav-button");
        navButtons.forEach((button, i) => {
            button.classList.remove(`active-side${i + 1}`);
            button.classList.remove(`active-side`);
          });
        navButtons[1].classList.add(`active-side2`);
        navButtons[1].classList.add(`active-side`);
    }
    var referrer1 = window.location.pathname;
    var added1='';
    var lastSegment1 = referrer1.substr(referrer1.lastIndexOf('/') + 1);
    console.log(lastSegment1);
    if (lastSegment1 !== "chefDep"){
    chnagerManupulation('emploisTemps');
    }
    chnagerManupulation('information');
    chnagerManupulation('annonce');
    chnagerManupulation('annonceee');
    chnagerManupulation('chefDep/annonce');
    // Get all nav buttons and the highlight element
    var navButtons = document.querySelectorAll(".nav-button");
    var iconAdd = document.getElementById("addClick");
    var selectRole = document.getElementById("selectRole");
    var isdeleg = document.getElementById("isdeleg");
    var highlightElement = document.getElementById("nav-content-highlight2");
    var navtoggle = document.getElementById("nav-toggle");
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
        setTimeout(function () {
            document.getElementById("depart").addEventListener('change', function () {
                chargersalles(this.value);
            });
        }, 2000);
        chargersalles("libre");
        setTimeout(function () {
            document.getElementById("affectbut").addEventListener('click', function () {
                affectsalle();
                fetchAffectationSalle();
            });
        }, 2000);

      }else if(navButtons[index].querySelector("span").textContent === "Information"){
        chnagerManupulation('information');
        center.style.opacity = 0;
      }else if(navButtons[index].querySelector("span").textContent === "Emplois du Temps"){
        chnagerManupulation('emploisTemps');
        center.style.opacity = 0;
      }else if(navButtons[index].querySelector("span").textContent === "Ajouter abscence"){
        chnagerManupulation('addAbscence');
        center.style.opacity = 0;
        setTimeout(function () {
            document.getElementById("etudFil").addEventListener('change', function() {
                fetch('listEtudiantFIlier?idFil='+this.value)
            .then(response => response.text())
            .then(rep => {
                document.getElementById("etudList").innerHTML = rep;
            });
            });
        }, 2000);
      }else if(navButtons[index].querySelector("span").textContent === "Ajouter Filiere"){
        chnagerManupulation('ajouterfiliere');
        center.style.opacity = 0;
        setTimeout(function () {
            document.getElementById("dep").addEventListener('change', function () {
                fetch('respfil?dep='+this.value)
            .then(response => response.text())
            .then(rep => {
                document.getElementById("respfil").innerHTML = rep;
            });
            });
        }, 1000);
        setTimeout(function () {
            document.getElementById('listfor').addEventListener('change',function () {
                // if(event.target.classList.contains('listCla'))
                var value = this.value;
                fetch('listefiliere?fil='+value)
                .then(response => response.text())
                .then(rep => {
                    document.getElementById("tabfiliere").innerHTML = rep;
                    var supButtons = document.querySelectorAll(".supfil");
                    supButtons.forEach(function (button) {
                    button.addEventListener('click', function () {
                        var id = this.dataset.id;
                        var fil = document.getElementById('filid');
                        deletefil(id);
                        fetchAffectationfil(fil.value);
                    });
                });
                });
            });
        }, 2000);
      }else if(navButtons[index].querySelector("span").textContent === "Ajouter Module"){
        chnagerManupulation('addModule');
        center.style.opacity = 0;
        setTimeout(function () {
            document.getElementById("affectmodule").addEventListener('click', function () {
                var formData = new FormData(document.getElementById('afctform'));
                // AJAX request using fetch
                fetch('/module', {
                    method: 'POST',
                    body: formData
                })
                fetchAffectationmodule(formData.get('fil'));
            });
        }, 2000)
        setTimeout(function () {
            document.getElementById("dep").addEventListener('change', function () {
                fetch('filiere?fil='+this.value)
            .then(response => response.text())
            .then(rep => {
                document.getElementById("fil").innerHTML = rep;
                    fetch('respfil?dep='+this.value)
                .then(response => response.text())
                .then(rep => {
                    document.getElementById("prof").innerHTML = rep;
                });
            });
            });
            document.getElementById("listCla").addEventListener('change', function () {
                fetch('tableModule?module='+this.value)
            .then(response => response.text())
            .then(rep => {
                document.getElementById("tableModule").innerHTML = rep;
                var supButtons = document.querySelectorAll(".supmod");
                supButtons.forEach(function (button) {
                button.addEventListener('click', function () {
                    var id = this.dataset.id;
                    var fil = document.getElementById('filid');
                    deletemodule(id);
                    fetchAffectationmodule(fil.value);
                });
            });
            });
            });
        }, 1200);
      }else if(navButtons[index].querySelector("span").textContent === "Etat Demande"){
        chnagerManupulation('etatDemande');
        center.style.opacity = 0;
      }else if(navButtons[index].querySelector("span").textContent === "Ajouter Classe"){
        chnagerManupulation('addClasse');
        center.style.opacity = 0;
        setTimeout(function () {
            document.getElementById("affectclasse").addEventListener('click', function () {
                var formData = new FormData(document.getElementById('afctform'));
                // AJAX request using fetch
                fetch('/afctclasse', {
                    method: 'POST',
                    body: formData
                })
                fetchAffectationclasse(formData.get('fil'));
            });
        }, 2000)
        setTimeout(function () {
        document.getElementById('listCla').addEventListener('change',function () {
            // if(event.target.classList.contains('listCla'))
            var value = this.value;
            fetch('listeClasse?class='+value)
            .then(response => response.text())
            .then(rep => {
                document.getElementById("tabclasse").innerHTML = rep;
                var supButtons = document.querySelectorAll(".supclass");
                supButtons.forEach(function (button) {
                button.addEventListener('click', function () {
                    var id = this.dataset.id;
                    var fil = document.getElementById('filid');
                    deleteclasse(id);
                    fetchAffectationclasse(fil);
                });
            });
            });
        });
    }, 2000);
      }else if(navButtons[index].querySelector("span").textContent === "Gestion des emplois du temps"){
        chnagerManupulation('emploisTemps');
        center.style.opacity = 0;
        chargerCategories();
      }else if(navButtons[index].querySelector("span").textContent === "Liste des Menbres"){
        chnagerManupulation('list');
        center.style.opacity = 0;

        var select=document.getElementById("memberType");
        console.log(select)
        document.addEventListener('change', function(){
            select = document.getElementById("memberType");
            if (select.value == 0) {
                chnagerManupulation1('allMembers');
            } else if (select.value == 1) {
                chnagerManupulation1('etudMember');
            } else if (select.value == 2) {
                chnagerManupulation1('profMember');
            }
        });
      }else if(navButtons[index].querySelector("span").textContent === "Répondre Demandes Étudiants"){
        chnagerManupulation('repondreDemande');
        document.addEventListener('click',(event)=>{
            if(event.target.classList.contains('mes')){
                console.log(event.target.dataset.id);
               var idm = event.target.dataset.id;
                var mess = document.getElementById('mesform');
                mess.action = 'reponse/' + idm + '';
                fetch("message?etud=" + idm)
                    .then(response => response.text())
                    .then(rep => {
                        document.getElementById("messetud").innerHTML = rep;
                    });
            }
        })

        center.style.opacity = 0;
      }else if(navButtons[index].querySelector("span").textContent === "Ajouter et modifier le contenu d'une filière"){
        chnagerManupulation('formationChoix');
        center.style.opacity = 0;
      }else if(navButtons[index].querySelector("span").textContent === "Ajouter Membres"){
        chnagerManupulation('addEtudiant');
        center.style.opacity = 0;

        var isprof,isdeleg,value;
        document.addEventListener('change', ()=>{

            selectRole = document.getElementById("selectRole");
            isdeleg = document.getElementById("isdeleg");
            isprof = document.getElementById("isprof");
            value = selectRole.value;

            if(value == 3){
                isdeleg.style.display= 'flex';
                isprof.style.display= 'none';
                document.getElementById("etudfor").addEventListener('change', function () {
                    fetch("modeetud?formation=" + this.value)
                        .then(response => response.text())
                        .then(rep => {
                            document.getElementById("modeetud").innerHTML = rep;
                        });
            });

            setTimeout(function () {
                document.getElementById("classetudfor").addEventListener('change', function () {
                    fetch("classeetud?filiere=" + this.value)
                        .then(response => response.text())
                        .then(rep => {
                            document.getElementById("classeetud").innerHTML = rep;
                        });
            });
            }, 1000);
            setTimeout(function () {
                document.getElementById("tpetudfor").addEventListener('change', function () {
                    fetch("tpetud?classe=" + this.value)
                        .then(response => response.text())
                        .then(rep => {
                            document.getElementById("tpetud").innerHTML = rep;
                        });
            });
            }, 1000);

            }else if(value ==2){

                isprof.style.display= 'flex';
                isdeleg.style.display= 'none';
            }else{
                isprof.style.display= 'none';
                isdeleg.style.display= 'none';
            }

        })
        // selectRole = document.getElementById("selectRole");
      }else if(navButtons[index].querySelector("span").textContent === "Gérer Annonces Département"){
        chnagerManupulation('chefDep/annonce');
        fetchData();
        center.style.opacity = 0;
      }else if(navButtons[index].querySelector("span").textContent === "Gérer Annonces Modules"){
        chnagerManupulation('annonce');
        center.style.opacity = 0;
      }else if(navButtons[index].querySelector("span").textContent === "Gérer Emplois du Temps Salle"){
        chnagerManupulation('chefDep/emploisTemps');
        center.style.opacity = 0;
        setTimeout(function () {
        document.getElementById('sallesel').addEventListener('change', function () {
            var sl=document.getElementById('sal');
            sl.value=this.value;
            fetch("emploi?salle=" + this.value)
                .then(response => response.text())
                .then(rep => {
                    document.getElementById("salle").innerHTML = rep;
                    var supButtons = document.querySelectorAll(".supreser");
                   supButtons.forEach(function (button) {
                    button.addEventListener('click', function () {
                    var id = this.dataset.id;
                    var fil = document.getElementById('sl');
                    deletereserv(id);
                    fetchAffectationreserv(fil.value);
                });
            });
                });
        });
        document.getElementById('submitemp').addEventListener('click', submitreserv);
    }, 1000);
      }else if(navButtons[index].querySelector("span").textContent === "Annonces des Professeurs"){
        chnagerManupulation('annonceProf');
        center.style.opacity = 0;
      }else if(navButtons[index].querySelector("span").textContent === "Gérer Annonces Filiere"){
        chnagerManupulation('annonceee');
        center.style.opacity = 0;
      }else if(navButtons[index].querySelector("span").textContent === "Justifier Absence"){
        chnagerManupulation('justify');
        center.style.opacity = 0
        setTimeout(function () {
            var supButtons = document.querySelectorAll(".absc");
                supButtons.forEach(function (button) {
                button.addEventListener('click', function () {
                    var id=this.dataset.id;
                    console.log(id)
                    var inp=document.getElementById("hidinp");
                   inp.value=id;
                   var mess = document.getElementById('justiForm');
                  mess.action = 'justify/' + id + '';
                });
            });
        }, 1000);
      }else if (navButtons[index].querySelector("span").textContent === "Demandes") {
        chnagerManupulation('Demandes');

        setTimeout(function () {
            var select = document.getElementById("DemandesType");
            select.addEventListener('change', function () {
                if (select.value == 0) {
                    chnagerManupulation1('demandesTp');
                } else if (select.value == 1) {
                    chnagerManupulation1('demandeLettre');
                    var radio = document.getElementById('matcProf');
                    var hidden = document.getElementById('hiddenMat');
                    hidden.value = radio.value;
                } else if (select.value == 2) {
                    chnagerManupulation1('demandeRendezVous');
                    var radio = document.getElementById('matcProf');
                    var hidden = document.getElementById('hiddenMat');
                    hidden.value = radio.value;
                } else if (select.value == 4) {
                    chnagerManupulation1('signalInci');
                    var radio = document.getElementById('matcProf');
                    var hidden = document.getElementById('hiddenMat');
                    hidden.value = radio.value;
                } else if (select.value == 5) {
                    chnagerManupulation1('signalMate');
                    var radio = document.getElementById('matcProf');
                    var hidden = document.getElementById('hiddenMat');
                    hidden.value = radio.value;
                }
            });

            var radios = document.querySelectorAll('.matcProf');
            radios.forEach(function (radio) {
                radio.addEventListener('click', function () {
                    console.log(this.value);
                    var hidden = document.getElementById('hiddenMat');
                    hidden.value = this.value;
                });
            });

            var hidden = document.getElementById('hiddenMat');
            hidden.value = radios[0].value; // Assuming you want to initialize with the value of the first radio button
        }, 1200);

        center.style.opacity = 0;
    }
    }
    // Add event listeners to each nav button
    navButtons.forEach((button, index) => {
      button.addEventListener("click", () => handleActive(index));
    });
    document.addEventListener('click',(event)=>{
        if(event.target.classList.contains('addClick') ){
            chnagerManupulation('formAn');
            center.style.opacity = 0;
        }else if(event.target.classList.contains('edit')){
            referrer = window.location.pathname;
            added='';
            lastSegment = referrer.substr(referrer.lastIndexOf('/') + 1);
            if (lastSegment == "chefDep"){
                console.log("asasd222")
                chnagerManupulation('edit');
                editannonce(event.target);
            }else if (lastSegment == "home"){
            chnagerManupulation('edit');
            editannonceProf(event.target);
            }
            center.style.opacity = 0;
        }else if(event.target.classList.contains('delete')){
            deleteAnnonces(event.target);
            chnagerManupulation('annonce');
            fetchData();
        }
    })
    document.addEventListener('click', (event) => {
        var supButtons = document.querySelectorAll(".forchoix");
                supButtons.forEach(function (button) {
                button.addEventListener('click', function () {
                    var id = this.dataset.id;
                    chnagerManupulation('filiereChoix?formation=' + id);
                });
            });
        var tmp = document.querySelectorAll(".filchoix");
                tmp.forEach(function (button) {
                button.addEventListener('click', function () {
                    var id = this.dataset.id;
                    chnagerManupulation('filierePage?idFiliere=' + id);
                });
            });
        if (event.target.classList.contains('th1')) {
            console.log(event.target);
            toggleColumn(0);
        } else if (event.target.classList.contains('th2')) {
            toggleColumn(1);
        } else if (event.target.classList.contains('th3')) {
            toggleColumn(2);
        } else if (event.target.classList.contains('th4')) {
            toggleColumn(3);
        }
    });
    // Function to make an AJAX request
    function fetchData() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/fetch-annonce', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Handle the response data and update the page
                var responseData = JSON.parse(xhr.responseText);
                updatePage(responseData.annonces);
            }
        };

        xhr.send();
    }

    // Function to update the page content
    function updatePage(annonces) {
        var container = document.querySelector('.listAnnonce');
        console.log(annonces);
        // Process and display the fetched data
        annonces.forEach(function (item) {

            container.innerHTML +='<div class="annonce-card">\
            <div id="delete" data-id="'+item.id_annonce+'" class="new delete">\
            <svg class="icon delete" data-id="'+item.id_annonce+'" xmlns="http://www.w3.org/2000/svg" height="20" width="15" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by  @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path  fill="#fefefe" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>\
            </div>\
        <div class="posinew edit" data-id="'+item.id_annonce+'">\
            <svg class="icon edit" data-id="'+item.id_annonce+'" xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#fefefe" d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>\
        </div>\
        <div class="containerAnnonceText">\
            <div class="imgholder">\
            </div>\
            <div class="containerAnnonceText" style="width: 100%;">\
                <h1 class="head-card">'+item.titre+'</h1>\
                <p class="text-card" style="width: 100%;"">'+item.resume+'</p>\
            </div>\
        </div>\
        </div>\
        </div>';
        });
    }
    // Fetch data when the page loads
    // fetchData();

    //delete data
    function deleteAnnonces(ele){
        var id = ele.dataset.id;
        fetch('/annonce/' + id, {
            method: 'GET',
        })
    }
  //edit data
 function editannonce(ele) {
      console.log("test");
        var id = ele.dataset.id;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/annonce/'+ id +'/edit', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Handle the response data and update the page
                var responseData = JSON.parse(xhr.responseText);
                console.log(responseData.annonce);
                edit(responseData.annonce);
            }
        };
            function edit(annonce){
                var container=document.getElementById('editAnnonce');
                var desc=document.getElementById('disc');
                var resume=document.getElementById('resume');
                var title=document.getElementById('title');
                container.action='annonce/'+annonce.id_annonce+'';
                title.value=annonce.titre;
                resume.value=annonce.resume;
                desc.value=annonce.Description;
        }
    xhr.send();
};
  //edit data
  function editannonceProf(ele) {
    console.log("test");
      var id = ele.dataset.id;
      var xhr = new XMLHttpRequest();
      xhr.open('GET', '/annonce/'+ id +'/edit', true);
      xhr.onreadystatechange = function () {
          if (xhr.readyState == 4 && xhr.status == 200) {
              // Handle the response data and update the page
              var responseData = JSON.parse(xhr.responseText);
              console.log(responseData.annonce);
              editProf(responseData.annonce);
          }
      };
          function editProf(annonce){
            console.log(annonce);
              var container=document.getElementById('editAnnonce');
              var desc=document.getElementById('disc');
              var resume=document.getElementById('resume');
              var title=document.getElementById('title');
              container.action='annonceProf/'+annonce.id_annonce+'';
              title.value=annonce.titre;
              resume.value=annonce.resume;
              desc.value=annonce.Description;
      }
  xhr.send();
};
chargerCategories();

    function chargerCategories() {
        var tmp;
        fetch("emploisTemps")
            .then(response => response.text())
            .then(rep => {
                document.getElementById("filieresel").addEventListener('change', function() {
                    var fil=document.getElementById("fil");
                    fil.value=this.value;
                        chargerProduits(this.value);
                        chargerModules(this.value);
                    });

                    document.getElementById('submitemp').addEventListener('click', submitForm);

            })
            .catch(error => console.error('Error loading categories:', error));
    }
    function chargerProduits(val) {
        fetch("emploi?filiere=" + val)
        .then(response => response.text())
        .then(rep => {
            document.getElementById("emploi").innerHTML = rep;
        })
    }
    function chargerModules(val) {
        fetch("formemploi?module=" + val)
        .then(response => response.text())
        .then(rep => {
            document.getElementById("efrom").innerHTML = rep;
            var supButtons = document.querySelectorAll(".supemp");
                supButtons.forEach(function (button) {
                button.addEventListener('click', function () {
                    var id = this.dataset.id;
                    deleteemp(id);
                    chargerProduits(val);
                });
            });
        })
    }

    function submitForm() {
                // Get form data
                var formData = new FormData(document.getElementById('formemp'));

                // AJAX request using fetch
                fetch('/addEmploi', {
                    method: 'POST',
                    body: formData
                })
                var fil=document.getElementById("filieresel");
                var tmp=document.getElementById("fil");
                tmp.value=fil.value;
                            chargerProduits(fil.value);
                            chargerModules(fil.value);
    }
    function submitreserv() {
                // Get form data
                var formData = new FormData(document.getElementById('formres'));

                // AJAX request using fetch
                fetch('/reservation', {
                    method: 'POST',
                    body: formData
                })
                var sl=document.getElementById("sal");
                fetchAffectationreserv(sl.value);
    }
    function affectsalle() {
                // Get form data
                var formData = new FormData(document.getElementById('afctform'));

                // AJAX request using fetch
                fetch('/afctsalle', {
                    method: 'POST',
                    body: formData
                })
    }
    function chargersalles(val) {
        fetch("lissalle?salle=" + val)
        .then(response => response.text())
        .then(rep => {
            document.getElementById("tabsalle").innerHTML = rep;
                var supButtons = document.querySelectorAll(".supsal");
                supButtons.forEach(function (button) {
                button.addEventListener('click', function () {
                    var nom = this.dataset.id;
                    deletesalle(nom);
                     fetchAffectationSalle();
                });
            });
        })
    }
    function deletesalle(ele){
        var id = ele;
        fetch('/salle/' + id, {
            method: 'GET',
        })
    }
    function deleteclasse(ele){
        var id = ele;
        fetch('/classe/' + id, {
            method: 'GET',
        })
    }
    function deletemodule(ele){
        var id = ele;
        fetch('/module/' + id, {
            method: 'GET',
        })
    }
    function deleteemp(ele){
        var id = ele;
        fetch('/emploi/' + id, {
            method: 'GET',
        })
    }
    function deletefil(ele){
        var id = ele;
        fetch('/filiere/' + id, {
            method: 'GET',
        })
    }
    function deletereserv(ele){
        var id = ele;
        fetch('/reservation/' + id, {
            method: 'GET',
        })
    }

    function fetchAffectationSalle() {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const center = document.querySelector(".center");
                center.innerHTML = xhr.responseText;
                setTimeout(function () {
                    center.style.opacity = 1; // Set opacity to 1 to fade in the content
                }, 30);
            }
            chargersalles("libre");
                document.getElementById("depart").addEventListener('change', function () {
                    chargersalles(this.value);
                });
                document.getElementById("affectbut").addEventListener('click', function () {
                    affectsalle();
                    fetchAffectationSalle();
                });
        };

        xhr.open("GET", 'affectationSalle', true);
        xhr.send();
    }
    function fetchAffectationclasse(value) {
                fetch('listeClasse?class='+value)
                .then(response => response.text())
                .then(rep => {
                    document.getElementById("tabclasse").innerHTML = rep;
                    var supButtons = document.querySelectorAll(".supclass");
                    supButtons.forEach(function (button) {
                    button.addEventListener('click', function () {
                        var id = this.dataset.id;
                        var fil = document.getElementById('filid');
                        deleteclasse(id);
                      fetchAffectationclasse(fil.value);
                    });
                });
                });
    }
    function fetchAffectationfil(value) {
        fetch('listefiliere?fil='+value)
        .then(response => response.text())
        .then(rep => {
            document.getElementById("tabfiliere").innerHTML = rep;
            var supButtons = document.querySelectorAll(".supfil");
            supButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                var id = this.dataset.id;
                var fil = document.getElementById('filid');
                deletefil(id);
                fetchAffectationfil(fil.value);
            });
        });
        });
    }
    function fetchAffectationmodule(value) {
                fetch('tableModule?module='+value)
                .then(response => response.text())
                .then(rep => {
                    document.getElementById("tableModule").innerHTML = rep;
                    var supButtons = document.querySelectorAll(".supmod");
                    supButtons.forEach(function (button) {
                    button.addEventListener('click', function () {
                        var id = this.dataset.id;
                        var fil = document.getElementById('filid');
                        deletemodule(id);
                      fetchAffectationmodule(fil.value);
                    });
                });
                });
    }
    function fetchAffectationreserv(value) {
        fetch("emploi?salle=" + value)
        .then(response => response.text())
        .then(rep => {
            document.getElementById("salle").innerHTML = rep;
            var supButtons = document.querySelectorAll(".supreser");
           supButtons.forEach(function (button) {
            button.addEventListener('click', function () {
            var id = this.dataset.id;
            var fil = document.getElementById('sl');
            deletereserv(id);
            fetchAffectationreserv(fil.value);
        });
    });
        });
    }
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
function chnagerManupulation1(url) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const center = document.querySelector("#center");
            document.querySelector("#center").innerHTML = xhr.responseText;
            setTimeout(function () {
                center.style.opacity = 1; // Set opacity to 1 to fade in the content
            }, 30);
        }
        ;
    };

    xhr.open("GET", url, true); //erreur
    xhr.send();
}



function toggleColumn(columnIndex) {
    var table = document.querySelector('.contenufilier .table');
    var rows = table.querySelectorAll('.table-row');

    // Retirez la classe 'active' de toutes les cellules du header
    var headerCells = document.querySelectorAll('.th');
    headerCells.forEach(function (cell) {
        cell.classList.remove('active');
    });

    // Ajoutez la classe 'active' à la cellule du header cliquée
    headerCells[columnIndex].classList.add('active');

    // Parcours chaque ligne et masque les cellules non désirées
    rows.forEach(function (row) {
        var cells = row.children;
        for (var i = 0; i < cells.length; i++) {
            if (i === columnIndex) {
                cells[i].style.display= '';
            } else {
                cells[i].style.display= 'none';
            }
        }
    });
}

