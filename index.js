const express = require('express')
const cors = require('cors')

const connectToDb = require("./dbconnection")
const userRoute = require("./user.route")

const app = express()
app.use(express.json())
app.use( cors({
    origin: ['http://localhost:3000']
}) )

app.use('/', userRoute)
connectToDb()


app.get("/", ( req, res )=>{
    res.json({"messaage": "Listen"})
})

app.listen(4000, ()=>{
    "App is listening on 4000ports"
})