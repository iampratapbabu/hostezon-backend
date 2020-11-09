const Comment = require('../models/commentsModel');

exports.getAllComment = async(req,res) =>{
	try{
		const comments = await Comment.find();
		res.status(200).json({
			status:"success",
			results:comments.length,
			data:comments
		});
	}catch(err){
		console.log(err);
		res.status(400).json({
			message:"Error occured code jumped to catch block"
		});
	}
	
}


exports.createComment = async(req,res,next) =>{
    try{
	const newComment = await Comment.create(req.body);

	res.status(201).json({
		status:"success",
		newComment
	});
	}catch(err){
		console.log(err);
		res.status(400).json({
			message:"Error occured code jumped to catch block"
		});
	}
}