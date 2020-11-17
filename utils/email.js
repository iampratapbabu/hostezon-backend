const nodemailer = require('nodemailer');

const sendEMail = async options =>{
	//create a transporter
	const transporter = nodemailer.createTransport({
		service:'Gmail',
   			//Gmail and yahoo jaise kuchh operators ka host waigrah define rehta hai pehle se
		auth:{				//lekin third party ka use krenge to host and port define krna prta hai
			user:process.env.GMAIL_USERNAME,
			pass:process.env.GMAIL_PASSWORD
		}
		//IN GMAIL  activate less secure options
	});

	//define the email options
	const mailOptions = {
		from:'hosteZON <digitaldost.official@gmail.com>',
		to:options.email,
		subject:options.subject,
		text:options.message
		//html if we want then html code bhi bhej skte hain
	}

	//Actually send the mail

	await transporter.sendMail(mailOptions);

};

module.exports = sendEMail;