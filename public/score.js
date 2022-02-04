//Récup les meilleurs résultats
const resultatScore = document.querySelector('.resultat')
const getScore = async () => {
    const scores = await fetch('http://localhost:3000/score')
    const scoreJson = await scores.json()
    console.log(scoreJson.resultat)
    scoreJson.resultat.forEach((score) => {
        resultatScore.insertAdjacentHTML('beforeend', `
        <div class="score">${score} s</div>
    `)
    })
}
getScore()