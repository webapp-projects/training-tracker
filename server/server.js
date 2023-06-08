require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const connection = require('./db')
const userRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")
const trainingRoutes = require("./routes/trainings")
const exerciseRoutes = require("./routes/exercises")

//open connection with database
connection()

//middleware
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 8080

// routes
app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/training", trainingRoutes)
app.use("/api/exercise", exerciseRoutes)

app.get("/", (req, res) => {
    res.send("TEST")
})

app.listen(port, () => console.log(`Listening on port: ${port}, http://localhost:${port}`))