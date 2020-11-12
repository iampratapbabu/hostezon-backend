const express = require("express");
const authController = require('../controllers/authContoller');
const blogController = require("../controllers/blogController");

const router = express.Router();

router.route('/top-5-blogs').get(blogController.topBlogs,blogController.getAllBlogs)

router.route('/').get(blogController.getAllBlogs)
router.route('/create-blog').post(authController.protect,blogController.createBlog);

router.route('/:slug')
	.get(blogController.getBlog)   //isme findOneAndUpdate({slug:req.params.slug}) use krenge jisme object ki tarah 
	.patch(blogController.updateBlog)  //parameter pass krte hai eb.
	

 router.route('/single/:id')    //agar id se search karna chahte hain then ise use kr skte haint
 	.get(blogController.getSingleBlog)     //isme Blog.findByIdAndUpdate() use krenge
	.patch(blogController.updateSingleBlog)  
 	.delete(blogController.deleteSingleBlog);   

 	
    
    



module.exports = router;
