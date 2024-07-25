import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import expressEjsLayouts from "express-ejs-layouts"
import ejs from "ejs"
import path from "path"
// import { connectDB } from "./connect.js"
import dotenv from "dotenv"
import {sequelize} from "./server.js"
import registerRouter from "./routes/registerUser.js"
import loginRouter from "./routes/loginUser.js"

import pdfRouter from "./routes/home-routes.js"


dotenv.config()

const app = express()

app.use(expressEjsLayouts)
app.engine('html', ejs.renderFile)
app.set('view engine', 'html');

// app.engine('html', expressEjsLayouts.renderFile);
// app.set('view engine', 'html');


app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use("/register", registerRouter)
app.use("/login", loginRouter)
app.use("/pdf", pdfRouter);


const start = () => {
    try{ 
        sequelize.authenticate()
            .then((date => console.log("Connection with database established!")))
            .catch((err) => console.log("Something went wrong while connecting to db"));

        sequelize.sync().then((data) => {
        // console.log(data);
            console.log("All tables synced");
        });

        // await connectDB(URL);
        app.listen(process.env.PORT, () => {
            console.log(`App listening on port: ${process.env.PORT}`)
        })
    }catch(err){
        console.log(err)
    }
}

start();