const router = require("express").Router()
const { Exercise, validate } = require("../models/exercise")
const {Training} = require("../models/training");
const verifyToken = require("../middleware/verifyToken")
const {User} = require("../models/user");
const mongoose = require("mongoose");

// get exercises for given training id
router.get("/:id", verifyToken, async (req, res) => {
    try {
        const training = await Training.findById(req.params.id)
        if (training) {
            await training.populate('exercises')
            return res.send({ exercises: training.exercises })
        }
        return res.status(404).send({message: `Training ${req.params.id} not found`})
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
    }
})

// save exercise for training
router.post("/:id", verifyToken, async (req, res) => {
    try {
        const { error } = validate(req.body)
        if (error)
            return res.status(400).send({ message: error.details[0].message })

        const training = await Training.findById(req.params.id)
        const exercise = new Exercise( {...req.body} )
        await exercise.save()
        training.exercises.push(exercise._id)
        await training.save()

        res.send({ exercise: exercise })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: "Internal Server Error"})
    }
})

router.delete("/:exerciseId/training/:trainingId", verifyToken, async (req, res) => {
    try {
        const deleted = await Exercise.findOneAndDelete({ _id: req.params.exerciseId })
        if (deleted) {
            await Training.findByIdAndUpdate(
                req.params.trainingId,
                { $pull: { exercises: new mongoose.Types.ObjectId(req.params.exerciseId) } }
            )
            return res.status(200).json({ message: 'Exercise deleted' });
        }
        return res.status(404).json({ error: 'Exercise not found' });
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: "Internal Server Error"})
    }
})

module.exports = router