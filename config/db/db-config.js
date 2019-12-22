const mongoose = require('mongoose')

const connection = async () => {
    await mongoose.connect('mongodb://localhost/nfldb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Mongodb connected'))
    .catch(err => console.log(err))
}

module.exports = connection
