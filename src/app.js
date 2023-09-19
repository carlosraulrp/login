const express = require('express')
const session = require('express-session')
const handlebars = require('express-handlebars')
const sessionRouter = require('./routes/sessions')
const viewsRouter = require('./routes/views')
const MongoStore = require('connect-mongo')

const PORT = 8080
const app = express()

app.use(express.urlencoded({ extended: true }))

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://carlosraulrp:811563@cluster0.latafpn.mongodb.net/?retryWrites=true&w=majority",
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 1000
    }),
    secret: "carCode",
    resave: false,
    saveUninitialized: true
}))


app.use("/api/sessions", sessionRouter)
app.use("/", viewsRouter)






app.listen(PORT, () =>{
    console.log(`app running on port: ${PORT}`)
})