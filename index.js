import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';


const app = express();
const port = 4000;

// middleware

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render("index.ejs")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
