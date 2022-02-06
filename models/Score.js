//Définition du model 'Score'

//Module permettant de communiquer avec MongoDB
const mongoose = require('mongoose')

//Définition du schema (champs de la base de données)
const ScoreSchema = mongoose.Schema({
    timing: {type: String}
})

const scoreModel = mongoose.model('score', ScoreSchema)

module.exports = scoreModel