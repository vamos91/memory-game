//***********Définition des routes concernant les scores*************/

const express = require('express')
const router = express.Router()

//Récupération du model 'Score'
const ScoreModel = require('../models/Score')

//Route permettant la récupération des 3 meilleurs scores
router.get('/', async (req, res) => {
    try {
        //On récupère tous les scores en base de données
        const scores = await ScoreModel.find() 
        const bestScore = []
        let score;
        let plusPetit;
        // Récupération des 3 meilleurs scores
        for (let j = 0; j < 3; j++) {
            //On assigne le premier élément du tableau dans une variable
            plusPetit = parseInt(scores[0].timing)
            for (let index = 0; index < scores.length; index++) {
                score = parseInt(scores[index].timing);
                //On parcours le tableau de score et si le score est plus petit que le premier élément...
                if (score < plusPetit) {
                    //on assigne ce score comme étént le plus petit.
                    plusPetit = score
                }
            }
            //On push le résulat dans un tableau
            bestScore.push(plusPetit)

            //On trouve le resultat dans le tableau 'score'
            const result = scores.find((score) => score.timing === plusPetit.toString())
            const indexOfplusPetitScore = scores.indexOf(result)
            //... et on le retire du tableau, afin de boucler sur un tableau qui contient tous les scores sauf le premier.
            scores.splice(indexOfplusPetitScore, 1)
        }
        //Envoie du tableau en response
        res.status(200).json({ 'resultat': bestScore})
    } catch (error) {
        //Envoie d'un  message d'erreur en response
        res.status(500).json({'resultat': error})  
    }
})

//Persistance des scores en base de données
router.post('/new', async (req, res) => {
    try {
        console.log(req.body)
        //Persistance du score en BDD via la model
       const score = await new ScoreModel({
           timing: req.body.score
       })
       //enregistrement en BDD
       await score.save()
       //Réponse du serveur et confirmation du succès de l'opération
       res.status(200).json({'resultat': score})
    } catch (error) {
        //Message d'erreur
        res.status(500).json({ 'resultat': error })
    }
})


module.exports = router