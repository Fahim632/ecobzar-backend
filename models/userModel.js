const mongoose = require("mongoose")
const { stringify } = require("node:querystring")

const { Schema } = mongoose

const userModel = new Schema({
    fastname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    terms: {
        type: Boolean,
    },
    profile: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'editor', 'vender'],
        default: 'user'
    },
    isHold: {
        type: Boolean,
        default: false,
    },
    billingAddress: {
        fastname: {
            type: String,
        },
        lastname: {
            type: String,
        },
        email: {
            type: String,
        },
        companyName: {
            type: String,
        },
        street: {
            type: String
        },
        state: {
            type: String,
        },
        zipCode: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        country: {
            type: String,
        },

    }
})

module.exports = mongoose.model('User',userModel)