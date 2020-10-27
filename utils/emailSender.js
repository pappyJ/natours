const nodemailer = require('nodemailer');

const pug = require('pug');

const htmlToText = require('html-to-text');


//end of modules requiring 

//creating a complex Email Hander

class Email 

{
    constructor (user , url)

    {
        this.to = user.email;

        this.firstname = user.name.split(' ')[0];

        this.url = url;

        this.from = `JOSHPEE TECH SOLUTIONS <${process.env.EMAIL_FROM}>`;
    }

    newTransport()

    {
        if (process.env.NODE_ENV === 'production')

        {
            return nodemailer.createTransport({


                service : 'SENDGRID',

                auth:

                {
                    user : process.env.SENDGRID_USERNAME,

                    pass : process.env.SENDGRID_PASSWORD
                }

            })
        }

        return nodemailer.createTransport({

            host: process.env.EMAIL_HOST,

            port: process.env.EMAIL_PORT,

            auth:
            
            {
                user: process.env.EMAIL_USERNAME,

                pass: process.env.EMAIL_PASSWORD

            }


        });
    }

    async send(template , subject)

    {
        const html = pug.renderFile(`${__dirname}/../views/${template}.pug` , 
        
        {

            firstname : this.firstname,

            url : this.url,

            subject

        })

        const mailOPtions = 

        {
            from : this.from,

            to : this.to,

            subject,

            html,

            text : htmlToText.fromString(html)
        }

        await this.newTransport().sendMail(mailOPtions);
        
    }

    async sendWelcome()

    {
        await this.send('welcome' , 'Welcome To The Natours Family!!');
    }

    async passwordReset()

    {
        await this.send('passwordReset' , 'Your Password Reset Token ( Valid For 10 Minutes )')
    }
}

//normal email handler

// const emailSender = async options =>

// {
//     const transporter = nodemailer.createTransport({


//         // host: process.env.EMAIL_HOST,

//         service: 'Gmail',

//         // port: process.env.EMAIL_PORT,

//         // secure: true,

//         auth:
        
//         {
//             // user: process.env.EMAIL_USERNAME,

//             // pass: process.env.EMAIL_PASSWORD

//             //for Gmail

//             user: 'peterjoshua828@gmail.com',

//             pass: 'sisterangela'
//         }


//     })

//     const mailOPtions = 

//     {
//         from: 'JOSHPEE TECH SOLUTIONS <peterjoshua828@gmail.com',

//         to: options.email,

//         subject: options.subject,

//         text: options.message,

//         // html
//     }

//     await transporter.sendMail(mailOPtions);
// }

// module.exports = emailSender;

module.exports = Email;