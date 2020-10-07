const express = require("express");
const authController = require('../controllers/authContoller');
const blogController = require("../controllers/blogController");

const router = express.Router();

router.route('/top-5-blogs').get(blogController.topBlogs,blogController.getAllBlogs)

router.route('/').get(blogController.getAllBlogs)
router.route('/create-blog').post(blogController.createBlog);

router.route('/:slug')
	.get(blogController.getBlog)   //isme findOneAndUpdate() use krenge
	.patch(blogController.updateBlog)
	

 router.route('/:id')    //agar id se search karna chahte hain then ise use kr skte haint
 	.get(blogController.getBlog)     //isme Blog.findByIdAndUpdate() use krenge
	.patch(blogController.updateBlog)  
 	.delete(blogController.deleteBlog);   
    
    



module.exports = router;
