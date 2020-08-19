const MONGOOSE = require('mongoose');

MONGOOSE.connect(process.env.MONGODB_URI || 'mongodb://localhost/my_next_watch', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

module.exports.List = require('./list');
module.exports.Movie = require('./movie');
module.exports.User = require('./user');