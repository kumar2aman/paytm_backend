const express = require('express')
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express();

require('dotenv').config()
const mainRouter = require("./routes/index.js")

app.use(cors())
app.use(bodyParser.json());
app.use("/api/v1/", mainRouter)



// /api/v1/



const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
});