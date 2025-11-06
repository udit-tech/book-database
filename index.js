const {initializeDatabase}= require("./db/db.connect")
const express = require("express")

const NEWBook = require("./model/book.model")
initializeDatabase();

const app=express()
app.use(express.json())

app.get("/",(req,res)=>{

    res.send("Hi this is get request ")
})

async function createBook(newBook){

    try{

        const book = new NEWBook(newBook)
        const savedBook = await book.save()
        return savedBook



    }catch(error){

        throw error
    }
}

app.post("/books",async(req,res)=>{


    try{

        const addBook = await createBook(req.body)
        res.status(201).json({message : "Book Successfully added",book : addBook})


    }catch(error){

        res.status(500).json({error : "Failed to add Book "})


    }

})

async function getAllBooks(){

    try{

        const allBooks = await NEWBook.find()
        return allBooks


    }catch(error){

        throw error
    }
}

app.get("/books",async(req,res)=>{
    
    try{

        const allBooks = await getAllBooks()

        if(allBooks){

            res.send(allBooks)
        }else{

            res.status(404).json({error : "book not found"})
            
        }




    }catch(error){

        res.status(500).json({error : "Failed to get books"})


    }
})

async function getBookDetailsByTitle(bookTitle){

    try{

        const getBook= await NEWBook.findOne({title : bookTitle})
        return getBook


    }catch(error){


        throw error

    }

}
app.get("/books/:bookTitle",async(req,res)=>{

    try{

        const findBookByTitle= await getBookDetailsByTitle(req.params.bookTitle)

        if(findBookByTitle){

            res.send(findBookByTitle)
        }else{

            res.status(404).json({error : "Book not found"})
        }


    }catch(error){

        res.status(500).json({error : "unable to fetch book data"})



    }
})

async function findBookByGenre(bookGenre){

    try{

        const bookByGenre= await NEWBook.find({genre : bookGenre})
        return bookByGenre

    }catch(error){

        throw error


    }
}

app.get("/books/genre/:bookGenre",async(req,res)=>{


    try{

        const bookByGenre = await findBookByGenre(req.params.bookGenre)
        if(bookByGenre){

            res.send(bookByGenre)

        }else{

            res.status(404).json({error : "book data not found"})
        }


    }catch(error){


        res.status(500).json({error : "error in fetching book data"})
    }
})

async function getBooksByPublishedYear(PublishedYear){

    try{
        const bookByYear = await NEWBook.findOne({publishedYear:PublishedYear})

        return bookByYear


    }catch(error){

        throw error

    }
}

app.get("/books/year/:publishedYear",async(req,res)=>{

    try{

        const BookByPublishedYear = await getBooksByPublishedYear(req.params.publishedYear)

        if(BookByPublishedYear){

            res.send(BookByPublishedYear)

        }else{

            res.status(404).json({error : "book not found"})
        }

    }catch(error){


        res.status(500).json({error : "failed to fetch book data"})

    }
})

async function findByAuthor(bookAuthor){

    try{

        const findBookByAuthor= await NEWBook.findOne({author:bookAuthor})
        return findBookByAuthor


    }catch(error){

        throw error
    }
}

app.get("/books/author/:bookAuthor",async(req,res)=>{


    try{

        const bookData = await findByAuthor(req.params.bookAuthor)

        if(bookData){

            res.send(bookData)
        }else{

            res.status(404).json({error : "book data not found"})
        }


    }catch(error){

        res.status(500).json({error : "error in fetching book data"})
    }
})

async function findAndUpdateRating(bookID,datatoUpdate){

    try{

        const bookUpdated= await NEWBook.findByIdAndUpdate(bookID,datatoUpdate,{new:true})
        return bookUpdated


    }catch(error){

        throw error
    }
}

app.post("/books/updatesByID/:bookID",async(req,res)=>{

    try{

        const bookData = await findAndUpdateRating(req.params.bookID,req.body)
        if(bookData){

            res.status(202).json({message : "book data is updates",book : bookData})

        }else{

            res.status(404).json({error : "book data is not found by id"})
        }

    }catch(error){

        res.status(500).json({error : "Failed to update data"})
    }
})

async function findByTitleAndUpdate(bookTitle ,dataToUpdate){

    try{

        const bookDetails = await NEWBook.findOneAndUpdate({title:bookTitle},dataToUpdate,{new : true})

        return bookDetails


    }catch(error){

        throw error
    }


}

app.post("/books/updatesByTitle/:bookTitle",async(req,res)=>{

    try{

        const bookdata = await findByTitleAndUpdate(req.params.bookTitle,req.body)

        if(bookdata){

            res.status(202).json({message : "book data is updated", book : bookdata})
        }else{

            res.status(404).json({error : "book data not found"})
        }


    }catch(error){


        res.status(500).json({error : "failed to  update data"})

    }
})
//this is comment


async function deleteByID(bookId){

    try{

        const bookdeleted = await NEWBook.findByIdAndDelete(bookId)
        return bookdeleted


    }catch(error){

        throw error
    }
}

app.delete("/books/:bookID",async(req,res)=>{


    try{

        const bookDeleted = await deleteByID(req.params.bookID)

        if(bookDeleted){

            res.status(200).json({message : "book data successfully deleted"})


        }else{
            res.status(404).json({error : "book data not found"})
        }


    }catch(error){

        res.status(500).json({error : "failed to delete data"})
    }
})



PORT = 3004

app.listen(PORT,()=>{

    console.log(`Server i running in PORT ${PORT}`)
})