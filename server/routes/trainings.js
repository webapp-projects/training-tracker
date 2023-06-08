const router = require("express").Router()
const { Training, validate } = require("../models/training")
const {User} = require("../models/user");
const verifyToken = require("../middleware/verifyToken")
const mongoose = require("mongoose");
const {Exercise} = require("../models/exercise");

router.get("/", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.decoded)
        await user.populate({
            path: 'trainings',
            populate: { path: 'exercises' }
        })

        res.send({ trainings: user.trainings })
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
    }
})

router.post("/", verifyToken, async (req, res) => {
    try {
        const { error } = validate(req.body)
        if (error)
            return res.status(400).send({ message: error.details[0].message })

        const user = await User.findById(req.decoded)
        const training = new Training( {...req.body, exercises: []} )
        await training.save()
        user.trainings.push(training._id)
        await user.save()

        res.send({ training: training })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: "Internal Server Error"})
    }
})

router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const deleted = await Training.findOneAndDelete({ _id: req.params.id })
        if (deleted) {
            await deleted.populate('exercises')
            console.log(deleted)
            for (let i = 0; i < deleted.exercises.length; i++) {
                console.log(deleted.exercises[i])
                await Exercise.findOneAndDelete({ _id: deleted.exercises[i]._id })
            }
            await User.findByIdAndUpdate(
                req.decoded,
                { $pull: { trainings: new mongoose.Types.ObjectId(req.params.id) } }
            )
            return res.status(200).json({ message: 'Training deleted' });
        }
        return res.status(404).json({ error: 'Training not found' });
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: "Internal Server Error"})
    }
})

module.exports = router