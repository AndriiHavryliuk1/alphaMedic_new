const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const PORT = 3000;


app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.send("Hello");
})


app.listen(PORT);