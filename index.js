import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';


const app = express();
const port = 4000;

// middleware

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

//database connection

const db = new pg.Client({

    user : "postgres",
    database: "bookreview",
    host: "localhost",
    password: "12345",
    port: 3000,

})

db.connect()



const bookInfo = {
    id: 1,
    cover: "image",
    title: "The Great Gatsby",
    Author: "F. Scott Fitzgerald",
    dateOfReview: "2023-06-01",
    review: "A classic novel that explores themes of wealth, love, and the American Dream. Fitzgerald's writing is beautiful and the characters are complex and memorable.",
    rating: 5 
}

app.get('/', async (req, res) => {

    addingDataToDatabase();

    res.render("index.ejs", { bookInfo: bookInfo })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

async function addingDataToDatabase() {
     
    try{
         const result = await db.query("INSERT INTO books(id, cover, title, Author, dateofreview, review, rating) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id ", [bookInfo.id, bookInfo.cover, bookInfo.title, bookInfo.Author, bookInfo.dateOfReview, bookInfo.review, bookInfo.rating]);
        console.log(id)
    }
    catch(err){
        console.log(err)
    }

}
