const express = require('express')
const router = express.Router()
const ScoreModel = require('../models/Score')

//Récupération des 3 meilleurs scores
router.get('/', async (req, res) => {
    try {
        const scores = await ScoreModel.find()
        const bestScore = []
        let score;
        let plusPetit;
        for (let j = 0; j < 3; j++) {
            plusPetit = parseInt(scores[0].timing)
            for (let index = 0; index < scores.length; index++) {
                score = parseInt(scores[index].timing);
                if (score < plusPetit) {
                    plusPetit = score
                }
            }
            bestScore.push(plusPetit)
            const result = scores.find((score) => score.timing === plusPetit.toString())
            const indexOfplusPetitScore = scores.indexOf(result)
            scores.splice(indexOfplusPetitScore, 1)
        }
        res.status(200).json({ 'resultat': bestScore})
    } catch (error) {  
        res.status(500).json({'resultat': error})  
    }
})

//Persistance des scores en base de données
router.post('/new', async (req, res) => {
    try {
        console.log(req.body)
       const score = await new ScoreModel({
           timing: req.body.score
       })
       await score.save()
       res.status(200).json({'resultat': score})
    } catch (error) {
        res.status(500).json({ 'resultat': error })
    }
})


module.exports = router