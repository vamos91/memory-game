//**********************************************************************/
//**********************************************************************/
//**************************MEMORY GAME*********************************/
//*************************Nicolas ACARD********************************/
//**********************************************************************/

// Sélectionner aléatoirement 14 fruits parmi les 18 proposés et les stocker dans un tableau.
// Répartir 14 paires de fruit aléatoirement, les stocker dans un autre tableau et les afficher dans la page HTML via le DOM.
// Mettre un événement au click sur chaque carte permettant de voir le fruit.
// Une fonction de comparaison de déclanchera au click de la deuxième carte.
//=> au terme de 2 secondes la paire est soit validé et reste face visible ou soit invalidé et retourne
//face caché.

//Au chargement de la page: 

//=> Un compte à rebours de 120 secondes sera déclenché.
//  =>Si le joueur retourne toutes les cartes dans le temps impartis alors une requête HTTP (AJAX) permettra 
//      de persister le résultat de son score en BDD et affichera 'vous avez gagné dans une alert'
//  => Si le joueur ne parvient pas à retourner toutes les cartes dans le temps impartis, l'application affichera 'vous avez perdu'.
//=>une requête HTTP (AJAX) permettra d'affiché les 3 meilleurs résultats (résultat stocké dans une BDD MongoDB).


//******************************************************************************************
// Répartir les fruits par paire sous forme de carte de manière aléatoire



//On stocke l'élément html 'grille' dans une variable
//(Afin d'avoir accés à cette "l"ment du DOM et d'affiché les cartes (ligne 88). 
const grid = document.querySelector('.grille')

//Définition d'une fonction permettant de répartir les fruits par paire dans un tableau de 28 éléments (2x14 paires de fruits)
const initGame = () => {
    //Déclaration de variables
    grid.innerHTML = ''
    const randomFruits = []
    const randomFruitsByPair = []
    let n = 0;

    // Sélectionner aléatoirement 14 fruits parmi les 18 proposés et les sotcker dans un tableau.
    while (n < 14) {
        //on répète 14 fois: 
            //=> un nombre aléatoire entre 1 et 18 (images)
        const randomId = Math.floor(Math.random() * 18) + 1
        //si le tableau de contient pas l'image aléatoire...
        if (!randomFruits.includes(`./images/fruit${randomId}.png`)) {
            //...alors on la stocke dans ce tableau
            randomFruits.push(`./images/fruit${randomId}.png`)
            //on incrémente la variable pour la condition de sortie de boucle.
            n++
        }
    }


    // Répartir 14 paires de fruit aléatoirement, les stocker dans un autre tableau (randomFruitsByPair)
    //Déclaration de quelques variables
    const indiceArrayFinal = []
    const indiceArrayBase = []
    let randomBaseArrayIndice = 0
    let randomArrayTestIndice = 0


    
    for (let index = 0; index < randomFruits.length; index++) {
        //Sélection d'un fruit aléatoire parmi ceux dans le premier tableau
        while (true) {
            // Il ne faut pas sélectionner deux fois le même fruit, donc...
            // On va stocké un nombre aléatoire (de 0 à la taille du premier tableau) dans un tableau
            // Cette valeur sera l'indice de l'élément du tableau contenant l'image.
            randomBaseArrayIndice = Math.floor(Math.random() * randomFruits.length)
            //Si l'indice a déjà été sélectionné, on ne fait rien et on continue de boucler, sinon...
            if (!indiceArrayBase.includes(randomBaseArrayIndice)) {
                //...on mémorise l'indice dans un autre tableau
                indiceArrayBase.push(randomBaseArrayIndice)
                break
            }
        }

        //1ere sélection d'un emplacement (indice) aléatoire dans le 2eme tableau
        while (true) {
            //nombre aléatoire concerant le deuxième tableau
            randomArrayTestIndice = Math.floor(Math.random() * 28)
            // Il ne faut pas sélectionner deux fois le même indice, donc...
            // Si le nombre aléatoire existe deja on boucle, sinon...
            if (!indiceArrayFinal.includes(randomArrayTestIndice)) {
                //...on le mémorise l'indice dans un tableau
                indiceArrayFinal.push(randomArrayTestIndice)
                // On stocke le fruit aléatoire dans le tableau suivant:
                randomFruitsByPair[randomArrayTestIndice] = randomFruits[randomBaseArrayIndice]
                break;
            }
        }

        // Idem ! ...de la même manière, 2eme sélection d'un emplacement (indice) aléatoire dans le 2eme tableau
        while (true) {
            randomArrayTestIndice = Math.floor(Math.random() * 28)
            if (!indiceArrayFinal.includes(randomArrayTestIndice)) {
                indiceArrayFinal.push(randomArrayTestIndice)
                randomFruitsByPair[randomArrayTestIndice] = randomFruits[randomBaseArrayIndice]
                break;
            }
        }
    }

    //Affichage dynamique des fruits via le tableau 'randomFruitsByPair' contenant les 14 paires de fruit.
    randomFruitsByPair.forEach((fruit) => {
        grid.insertAdjacentHTML('beforeend', `
        <div class="card">
            <img src=${fruit} alt=${fruit} "/>
        </div>
    `)
    })
}

//Appel de la fonction.
initGame()
//******************************************************************************************


//************Initialisation et affichage d'une barre de progression************************
const time = 120;
let counter = 0
const progressBar = document.querySelector('.progress-bar-front')
progressBar.style.width = '0%'
let interval = 0
//Calcule pour le défilement de la barre progression.
const t = setInterval(() => {
    counter++
    interval += 100 / time
    //affichage de la barre de progression
    progressBar.style.width = `${interval}%`
    progressBar.innerText = `${counter}s`
    if (interval >= 100) {
        //Si la barre de progression arrive à son terme alors on affiche le message suivant:
        alert('Vous avez perdu !')
        clearInterval(t)
        //=> Possibilité de réinitialiser la partie à la fin du temps.
        //initGame()
    }
}, 1000)

//***************************************************************************************



//***************************Comparaison de paire de carte*************************************

const cardPlayedToCompare = []
let winCondition = 0;
//Fonction de comparaison de deux cartes
const compareCard = (arrayOfCard) => {
    return arrayOfCard[0].firstElementChild.src.slice(29) === arrayOfCard[1].firstElementChild.src.slice(29) ? true : false
}

//Sélection de toutes les cartes
const cards = document.querySelectorAll('.card')
cards.forEach((card) => {
    //Pour chaque carte, plaçons un événement au click sur l'élément du DOM 'card'.
    card.addEventListener('click', (event) => {
        //plaçons la carte face visible.
        card.firstElementChild.style.zIndex = 4
        //Mémorisation de la carte retournée dans un tableau
        cardPlayedToCompare.push(card)
        // Si le tableau contient deux éléments///
        if (cardPlayedToCompare.length >= 2) {
            //... on difère l'appel de la fonction de comparaison de 2 secondes pour que le joueur
            // ait le temps de voir les deux cartes avant que celles-ci soient retournées face caché en cas d'échec.
            setTimeout(() => {
                // ...on appel la fonction de comparaison passant le tableau en paramètre
                //Si ce la ne match pas...
                if (!compareCard(cardPlayedToCompare)) {
                    //...alors on cache les cartes
                    cardPlayedToCompare[0].firstElementChild.style.zIndex = -3
                    cardPlayedToCompare[1].firstElementChild.style.zIndex = -3
                } else {
                    //...Sinon on incrémente une variable...
                    winCondition++
                    //...permettant de stopper le jeux et de déclarer le joueur vainqueur.
                    if (winCondition === 14) {
                        //Affichage du message de succès.
                        alert('Vous avez gagné !')
                        //Requête HTTP (AJAX) vers la partie backend de l'application et permettant la persistance en BDD
                        //Adresse vers le serveur en ligne.
                        fetch('https://memory-game-oclock.herokuapp.com/score/new', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({"score": counter.toString()})
                        })
                        .then(response => response.json())
                        .then((data) => {
                            //Affichage dans la console du succès de l'opération
                            console.log('Enregistrement en base donnée : ok')
                            console.log(data)
                        })  
                        clearInterval(t)
                    }
                }
                //On vide le tableau
                cardPlayedToCompare.splice(0, cardPlayedToCompare.length)
            }, 2000)
        }
    })
})
