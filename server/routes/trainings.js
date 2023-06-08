const router = require("express").Router()
const { Training, validate } = require("../models/training")
const {User} = require("../models/user");
const verifyToken = require("../middleware/verifyToken")

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

module.exports = router