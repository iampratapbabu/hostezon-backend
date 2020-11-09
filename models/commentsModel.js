const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	comment:{
		type:String,
		minlength:[5,"A comment must have atleast 5 characters "]
	},
	rating:{
		type:Number,
		min: 1,
      	max: 10
	},
	cratedAt:{
		type:Date,
		Default:Date.now()
	},
	blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
      required: [true, 'Comment must belong to a tour.']
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'comment must belong to a user']
    }

    
    
   

});

commentSchema.pre(/^find/,function(next){
	this.populate({
		path:'blog',
		select:'title'
	}).populate({
		path:'user',
		select:'name email role'
	})
	next();
})

const Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment;