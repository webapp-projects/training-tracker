const router = require("express").Router()
const { Exercise, validate } = require("../models/exercise")
const {Training} = require("../models/training");
const verifyToken = require("../middleware/verifyToken")

// get exercises for given training id
router.get("/:id", verifyToken, async (req, res) => {
    try {
        const training = await Training.findById(req.params.id)
        await training.populate('exercises')
        res.send({ exercises: training.exercises })
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

module.exports = router