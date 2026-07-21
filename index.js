import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';


const app = express();
const port = 4000;

// middleware

app.use(express.json());

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


app.post('/book/:id', async (req, res) => {

    const bookId = req.params.id;
    const { author, readDate, rating, review, delete: deleteBtn} = req.body;


    if(deleteBtn){
        try {

            await db.query("DELETE FROM books WHERE id = $1 RETURNING * ", [bookId] )
            console.log(`Book with ID ${bookId} has been deleted from the database.`);

            //redirecting to the home page after deletion.
            res.status(200).json({ success: true, message: 'Item deleted successfully!'});

        }
        catch(err){
            console.log('Error deleting book from the database', err)
            res.status(500).json({success: false, message: 'Error deleting review'})
        }

    }
    else{
        try{
            await db.query("UPDATE books SET rating = $1, review = $2 WHERE id = $3", [rating, review, bookId]);
            res.status(200).json({success: true, message: "Review updated successfully!"})
        }
        catch(err){
            console.log('Error updating book review', err);
            res.status(500).json({success: false, message: 'Error updating review'})
        }
    }

})



// function addingDataToDatabase() {
     
//    try
//     {

//         bookInfo.forEach( async (book) => { 
 
//                 const result = await db.query("INSERT INTO books(id, cover, title, Author, dateofreview, review, rating) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING * ", [book.id, book.cover, book.title, book.author, book.dateofreview, book.review, book.rating]);
//                 console.log(result.rows[0].id)        

//          });
       
//     }
//     catch(err){
//         console.log(err) 
//     }

// }

async function getDataFromDatabase() {
    
    try {
        const result = await db.query("SELECT * FROM books") 

        const bookInfoFromDatabase = result.rows;

        //console.log(bookInfoFromDatabase);

        return bookInfoFromDatabase;

    }
    catch (err){
        console.log('Error fetching data from the database', err)
    }
}




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);   
})