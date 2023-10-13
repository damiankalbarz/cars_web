require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const userRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")
const connection = require('./db')
const carsRouter = require('./routes/cars');
const tokenVerification = require('./middleware/tokenVerification')



connection()




//middleware
app.use(express.json())
app.use(cors())

app.get("/api/users/", tokenVerification)

// routes
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use('/api/cars', carsRouter);





const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Nas³uchiwanie na porcie ${port}`))

