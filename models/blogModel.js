const mongoose = require('mongoose');
const Comment = require('./commentsModel');



const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        unique:true,
        required:[true,'A Title is Required for the blog'],
        maxlength: [40, 'A tour name must have less or equal then 40 characters'],
        minlength: [10, 'A tour name must have more or equal then 10 characters']
    },
    slug:String,
    body:{
        type:String,
        required:[true,"Please Provide the Blog body"]
    },
    category:{
        type:String,
        required:[true,'Please Choose a category'],
        enum:{
            values:['Tech','Non-Tech','Confess'],
            message:"Please choose from Tech, Non-Tech and Confess"
        }
    },
    views:{
        type:Number,
        default:100
    },
    rating:{
        type:Number,
        default:7.0,
        min:[1,"Rating cannot be less than 1.0"],
        max:[10,"Rating cnnot be more than 10.0"]
    },
    tags:{
        type:String,
    },

    createdAt:{
        type:Date,
        default:Date.now()
    },
    createdBy:
    {
         type:mongoose.Schema.Types.ObjectId,
         ref:'User'
    },
    likes:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User',
            }
        }
    ],
    comments:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }
    ]
   

    
});


//virtual populating comments
// blogSchema.virtual('comments',{
//     ref:'Comment',
//     foreignField:'blog',
//     localField:'_id'
// });


//comment populating
blogSchema.pre(/^find/,function(next){     
    this.populate({                        
        path:'comments'                     
    })
    next();
})


//user populating
blogSchema.pre(/^find/,function(next){
    this.populate({
        path:'createdBy',
        select:'-__v -email -gender'
    });
    next();
});





const Blog = mongoose.model('Blog',blogSchema);

module.exports = Blog;