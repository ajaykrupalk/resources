const mongoose = require('mongoose')

const Schema = mongoose.Schema

const resourceSchema = new Schema({
    URL: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    domain: {
        type: String,
        required: true,
        trim: true,
    },
    imgURL: {
        type: String,
        required: true,
        trim: true,
        default: '../../../assets/default-image.avif',
    },
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Resource', resourceSchema)