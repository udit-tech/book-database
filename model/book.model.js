const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({

    title :{

        type : String,
        require : true
    },
    author : {

        type : String,
        require : true
    },
    publishedYear : Number,
    genre : [{
        type : String,
        enum : ["Non-fiction","Business","Autobiography"]

    }],
    language : String,
    country : String,
    rating : {

        type : Number,
        default : 0,
        max : 5,
        min : 0
    },
    summary : String,
    coverImageUrl : String

})

const NEWBook = mongoose.model("NEWBook",bookSchema)

module.exports = NEWBook
