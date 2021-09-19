const mongoose = require('mongoose')

const PostsModel = mongoose.model(
    "bdd-authentification",
    {
        user: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        mail: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true,
        },
    },
    "users"
);

module.exports = { PostsModel }