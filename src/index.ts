import express from "express";
import userRouter from "./routers/users";
import bodyParser from 'body-parser'
import catchAllErrors from "./middleware/error";
require("dotenv").config();

const app = express();
const cors = require("cors");

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static("public"));
app.use((req,res,next)=>{
  console.log(`${req.method} ${req.url}`)
  return next()
})

// Serve Homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Routes 
app.use('/api/users',userRouter)

// Errors
app.use(catchAllErrors)

// Start Server
const port = Number(process.env.PORT) || 3000;
const listener = app.listen(port, () => {
  const address = listener.address();
  if (address && typeof address === "object") {
    console.log(
      `Your app is listening at http://${
        address.address === "::" || address.address === "127.0.0.1"
          ? "localhost"
          : address.address
      }:${address.port}`
    );
  } else {
    console.log(`Your app is listening on port ${port}`);
  }
});
