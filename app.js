const express = require("express");
const userRouter = require("./routes/userRoute");
const blogRouter = require("./routes/blogRoute");
const academicsRouter = require("./routes/academicsRoute");
const shopRouter = require("./routes/shopRoute");
const socialRouter = require('./routes/socialRoute')



const app = express();
app.use(express.json());

app.get("/hostezon/v1", (req, res) => {
  res.send("Hostezon (v1.0) Backend by - Tej Pratap");
});

app.use("/hostezon/v1/users", userRouter);      	//common users
app.use("/hostezon/v1/blogs", blogRouter);  		//hosteZON-blogs
app.use("/hostezon/v1/academics",academicsRouter);  //hosteZON-academics
app.use("/hostezon/v1/shop",shopRouter); 			//hosteZON-shop
app.use("/hostezon/v1/social",socialRouter); 		//hosteZON-social

module.exports = app;
