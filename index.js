/***********************Configuration du server interne de node************** */

const express = require('express')
const app = express()

//Module permettant la Partage de ressource cross-origin
var cors = require('cors')
//Définition du port
const port = process.env.PORT || 3000

//Module permettant la gestion de variable d'environnement
const dotenv = require ('dotenv')
const path = require ('path')
dotenv.config()
//Module permettant la connexion à la base de données.
require('./database/connection')


//On autorise l'application à recevoir les requêtes HTTP de n'importe où.
app.use(cors())
//On autorise la gestion des formats de donnée JSON
app.use(express.json())
//Accès au fichier contenant les routes concernant les 'scores'
const score = require('./router/score')
app.use('/score', score)

//Gestion et accès des fichiers statique
app.use(express.static(path.join(__dirname, 'public')));

//Accès et envoie du ficher HTML à la racine (/) de l'application
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

//Configuration du serveur interne de node
app.listen(port, () => {
    console.log('App listen on localhost:' + port)
})