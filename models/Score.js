const mongoose = require('mongoose')

const ScoreSchema = mongoose.Schema({
    timing: {type: String}
})

const scoreModel = mongoose.model('score', ScoreSchema)

module.exports = scoreModel