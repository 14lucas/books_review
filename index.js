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



// const bookInfo = [{
//     id: 1,
//     cover: "image",
//     title: "The Great Gatsby",
//     author: "F. Scott Fitzgerald",
//     dateofreview: "2023-06-01",
//     review: "A classic novel that explores themes of wealth, love, and the American Dream. Fitzgerald's writing is beautiful and the characters are complex and memorable.",
//     rating: 5 
// },

// {
//     id: 2,
//     cover: "image",
//     title: "The 5AM Club",
//     author: "Robin Sharma",
//     dateofreview: "2023-06-01",
//     review: "A classic novel that explores themes of wealth, love, and the American Dream. Fitzgerald's writing is beautiful and the characters are complex and memorable.",
//     rating: 5 
// },

// ]

app.get('/', async (req, res) => {

    //addingDataToDatabase();
    const bookInfo = await getDataFromDatabase();

    res.render("index.ejs", { bookInfo: bookInfo })

})



function addingDataToDatabase() {
     
   try
    {

        bookInfo.forEach( async (book) => { 
 
                const result = await db.query("INSERT INTO books(id, cover, title, Author, dateofreview, review, rating) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING * ", [book.id, book.cover, book.title, book.author, book.dateofreview, book.review, book.rating]);
                console.log(result.rows[0].id) 
                
                

         });
       
    }
    catch(err){
        console.log(err)
    }

}

async function getDataFromDatabase() {
    
    try {
        const result = await db.query("SELECT * FROM books") 

        const bookInfoFromDatabase = result.rows;

        console.log(bookInfoFromDatabase);

        return bookInfoFromDatabase;

    }
    catch (err){
        console.log('Error fetching data from the database', err)
    }
}




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);   
})