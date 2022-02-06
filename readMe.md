# MEMORY GAME

### Pour accéder à l'application
- En ligne : [ici](https://memory-game-oclock.herokuapp.com/)
- En local : 
    1. Cloner le repo 
    2. Taper dans le terminal `npm install`
    2. ...puis `npm start`
    3. Aller à [http://localhost:3000](http://localhost:3000)


**note** : Lorsque le joueur séléctionne sa deuxième carte, il faut attendre deux secondes pour la validation de la paire (ou non).

##### L'application est hébergé sur la plateforme **Heroku**.
Après avoir crée un compte, pour déployer une application, il suffit de:

`herohu create memory-game`
`git push heroku master`

##### Le backend est codé avec **Node.js** et **express.js**
##### Les données sont persistées dans un base de donnée MongoDB