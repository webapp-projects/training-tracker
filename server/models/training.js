const mongoose = require("mongoose")
const Joi = require("joi")
const {Schema} = require("mongoose");

const trainingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    time: { type: Number, required: true },
    exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }]
})

const validate = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label("name"),
        time: Joi.number().required().label("time"),
        exercises: Joi.array().label("exercises")
    })
    return schema.validate(data)
}

const Training = mongoose.model("Training", trainingSchema)

module.exports = { Training, validate }
