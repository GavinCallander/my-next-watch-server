const BCRYPT = require('bcryptjs');
const MONGOOSE = require('mongoose');

const userSchema = new MONGOOSE.Schema({
    username: {
        type: String,
        required: [true, 'username is a required field']
    },
    password: {
        type: String,
        required: [true, 'password is a required field']
    },
    lists: [{
        type: MONGOOSE.Schema.Types.ObjectId,
        ref: 'List'
    }],
    movies: [{
        type: MONGOOSE.Schema.Types.ObjectId,
        ref: 'Movie'
    }]
});

userSchema.pre('save', function(next) {
    if (this.isNew) {
        this.password = BCRYPT.hashSync(this.password, 12)
    }
    next();
});

userSchema.set('toJSON', {
    transform: (doc, user) => {
        delete user.password
        return user
    }
});

userSchema.methods.isAuthenticated = function(typedPassword) {
    return BCRYPT.compareSync(typedPassword, this.password);
};

module.exports = MONGOOSE.model('User', userSchema);