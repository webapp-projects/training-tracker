const mongoose = require("mongoose")
const Joi = require("joi")

const exerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true }
})

const validate = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label("name"),
        reps: Joi.number().required().label("reps")
    })
    return schema.validate(data)
}

const Exercise = mongoose.model("Exercise", exerciseSchema)

module.exports = { Exercise, validate }
