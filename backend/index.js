const express = require("express");
const { Donor } = require("./models/donorModel");
const { connectDB } = require("./db/db");
const { Recipient } = require("./models/recipientModel");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.post("/register", async (req, res) => {
    await connectDB();
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res
            .status(400)
            .json({ error: "Name, email, password, and role are required." });
    }

    let UserModel;
    if (role === "donor") {
        UserModel = Donor;
    } else if (role === "recipient") {
        UserModel = Recipient;
    } else {
        return res.status(400).json({ error: "Invalid role." });
    }

    try {
        const existing = await UserModel.findOne({ email });
        if (existing) {
            return res.status(409).json({ error: "Email already registered." });
        }
        const user = new UserModel({ name, email, password });
        await user.save();
        res.status(201).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully.` });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Server error." });
    }
});

app.post("/login", async (req, res) => {
    await connectDB();
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return res.status(400).json({ error: "Email, password, and role are required." });
    }

    let UserModel;
    if (role === "donor") {
        UserModel = Donor;
    } else if (role === "recipient") {
        UserModel = Recipient;
    } else {
        return res.status(400).json({ error: "Invalid role." });
    }

    try {
        const user = await UserModel.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ error: "Invalid credentials." });
        }
        const token = jwt.sign(
            { id: user._id, email: user.email, role },
            JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: "Server error." });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
