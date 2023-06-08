require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const connection = require('./db')
const userRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")
const trainingRoutes = require("./routes/trainings")

//open connection with database
connection()

//middleware
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 8080

// routes
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/training", trainingRoutes)

app.get("/", (req, res) => {
    res.send("TEST")
})

app.listen(port, () => console.log(`Listening on port: ${port}, http://localhost:${port}`))