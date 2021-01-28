const express = require("express");
const morgan = require('morgan');


const userRouter = require("./routes/userRoute");
const blogRouter = require("./routes/blogRoute");
const commentRouter = require('./routes/commentRoute');
const academicsRouter = require("./routes/academicsRoute");



const app = express();
app.use(express.json()); //very necessary

//MIDDLEWARES
if(process.env.NODE_ENV="development"){
	app.use(morgan('dev'));
}

//for making request without error with react
app.use((req,res,next) =>{
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get("/", (req, res) => {
  res.send("Hostezon (v1.0) Backend by - Tej Pratap Main");
});

app.get("/hostezon/v1", (req, res) => {
  res.send("Hostezon (v1.0) Backend by - Tej Pratap");
});


//all router files
app.use("/hostezon/v1/users", userRouter);      	//common users
app.use("/hostezon/v1/blogs", blogRouter);  		//hosteZON-blogs
app.use("/hostezon/v1/comments",commentRouter);		//comment router
app.use("/hostezon/v1/academics",academicsRouter);  //hosteZON-academics


module.exports = app;
