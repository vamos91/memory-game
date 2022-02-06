//************Connexion à la base de données MongoDB */

//Module permettant de communiquer avec MongoDB
const mongoose = require('mongoose')

//Configuration permettant la connexion
var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// 'MONGO_URL' contient l'URL de connexion
const URL = process.env.MONGO_URL

//Connexion à la BDD
mongoose.connect(URL, options, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Connecté à la base de données');
    }
})

module.exports = mongoose;