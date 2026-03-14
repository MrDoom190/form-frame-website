const express = require("express")
const nodemailer = require("nodemailer")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

// serve frontend files
app.use(express.static(__dirname))

// home route
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "formandframe26@gmail.com",
        pass: "YOUR_APP_PASSWORD"
    }
})

app.post("/contact", async (req, res) => {

    const { name, email, phone, message } = req.body

    const mailOptions = {
        from: email,
        to: "formandframe26@gmail.com",
        subject: "New Client Inquiry",
        text: `
Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}
`
    }

    try {
        await transporter.sendMail(mailOptions)
        res.send({ status: "success" })
    }
    catch (err) {
        res.send({ status: "error" })
    }

})

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000")
})