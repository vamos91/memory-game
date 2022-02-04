const mongoose = require('mongoose')

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const URL = process.env.MONGO_URL

mongoose.connect(URL, options, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Connecté à la base de données');
    }
})

module.exports = mongoose;