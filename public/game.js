
// Mettre un événement 'click' sur chaque carte
// Répartir les fruits par paire sous forme de carte de manière aléatoire
// Il faut donc 14 paires de fruit repartie aléatoirement.
// Répartir 14 paires de fruit aléatoirement
//-> Séléctionner 14 fruits aléatoire parmi les 28 fruits et les mettre dans un tableau
//-> un fruit sélectionné ne peut plus être sélectionné
// Mettre un événement au click sur chaque carte permettant de voir le fruit.
const grid = document.querySelector('.grille')
//------------------------------
const initGame = () => {
    grid.innerHTML = ''
    const randomFruits = []
    const randomFruitsByPair = []
    let n = 0;

    while (n < 14) {
        const randomId = Math.floor(Math.random() * 18) + 1
        if (!randomFruits.includes(`./images/fruit${randomId}.png`)) {
            randomFruits.push(`./images/fruit${randomId}.png`)
            n++
        }
    }
    const indiceArrayFinal = []
    const indiceArrayBase = []
    let randomBaseArrayIndice = 0
    let randomArrayTestIndice = 0

    for (let index = 0; index < randomFruits.length; index++) {
        //Sélection d'un fruit aléatoire parmi ceux dans le premier tableau
        while (true) {
            randomBaseArrayIndice = Math.floor(Math.random() * randomFruits.length)
            //Si le fruit a déjà été sélectionner on fait rien sinon...
            if (!indiceArrayBase.includes(randomBaseArrayIndice)) {
                //...on le mémorise le fruit dans un tableau
                indiceArrayBase.push(randomBaseArrayIndice)
                break
            }
        }

        //1ere sélection d'un emplacement aléatoire dans le 2eme tableau
        while (true) {
            //nombre aléatoire concerant le deuxième array
            randomArrayTestIndice = Math.floor(Math.random() * 28)
            //Si le nombre aléatoire existe deja on recommence
            if (!indiceArrayFinal.includes(randomArrayTestIndice)) {
                indiceArrayFinal.push(randomArrayTestIndice)
                randomFruitsByPair[randomArrayTestIndice] = randomFruits[randomBaseArrayIndice]
                break;
            }
        }

        //2eme sélection d'un emplacement aléatoire dans le 2eme tableau
        while (true) {
            //nombre aléatoire concerant le deuxième array
            randomArrayTestIndice = Math.floor(Math.random() * 28)
            //Si le nombre aléatoire existe deja on recommence
            if (!indiceArrayFinal.includes(randomArrayTestIndice)) {
                indiceArrayFinal.push(randomArrayTestIndice)
                randomFruitsByPair[randomArrayTestIndice] = randomFruits[randomBaseArrayIndice]
                break;
            }
        }
    }

    randomFruitsByPair.forEach((fruit) => {
        grid.insertAdjacentHTML('beforeend', `
        <div class="card">
            <img src=${fruit} alt=${fruit} "/>
        </div>
    `)
    })
}
//------------------------------
initGame()

const time = 120;
let counter = 0
const progressBar = document.querySelector('.progress-bar-front')
progressBar.style.width = '0%'
let interval = 0
const t = setInterval(() => {
    counter++
    interval += 100 / time
    progressBar.style.width = `${interval}%`
    progressBar.innerText = `${counter}s`
    if (interval >= 100) {
        alert('Vous avez perdu !')
        clearInterval(t)
        //initGame()
    }
}, 1000)


const cardPlayedToCompare = []
let winCondition = 0;
const compareCard = (arrayOfCard) => {
    return arrayOfCard[0].firstElementChild.src.slice(29) === arrayOfCard[1].firstElementChild.src.slice(29) ? true : false
}

const cards = document.querySelectorAll('.card')
cards.forEach((card) => {
    card.addEventListener('click', (event) => {
        //découverte de la carte
        card.firstElementChild.style.zIndex = 4
        //mémorisation dela carte
        cardPlayedToCompare.push(card)
        console.log(cardPlayedToCompare)
        if (cardPlayedToCompare.length >= 2) {
            setTimeout(() => {
                if (!compareCard(cardPlayedToCompare)) {
                    cardPlayedToCompare[0].firstElementChild.style.zIndex = -3
                    cardPlayedToCompare[1].firstElementChild.style.zIndex = -3
                } else {
                    winCondition++
                    if (winCondition === 2) {
                        alert('Vous avez gagné !')
                        console.log(counter)
                        //Requête HTTP
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
                            console.log(data)
                        })
                        
                        clearInterval(t)
                        //initGame()
                        //réinitialisartion du jeux
                    }
                }
                cardPlayedToCompare.splice(0, cardPlayedToCompare.length)
            }, 2000)
        }
    })
})

//------------------------------

