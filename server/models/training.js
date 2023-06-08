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


/*
* This way you can do this query:

var User = schemas.User;
User
 .find()
 .populate('friends')
 .exec(...)

You'll see that each User will have an array of Users (this user's friends).

And the correct way to insert is like Gabor said:

user.friends.push(newFriend._id);
*/