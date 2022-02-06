//Récupération des meilleurs résultats
const resultatScore = document.querySelector('.resultat')

//Définition de la fonction permettant la requête HTTP vers le serveur
const getScore = async () => {
    //On synchronise (async/await) chaque étape afin de s'assurer de l'ordre d'éxécution des instructions.
    const scores = await fetch('https://memory-game-oclock.herokuapp.com/score')
    const scoreJson = await scores.json()
    //On s'assure d'avoir récupérer les résultats dans la console avant de les afficher dans la page HTML.
    console.log(scoreJson.resultat)
    scoreJson.resultat.forEach((score) => {
        resultatScore.insertAdjacentHTML('beforeend', `
        <div class="score">${score} s</div>
    `)
    })
}
getScore()