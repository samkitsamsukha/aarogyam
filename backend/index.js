const express = require("express");
const { connectDB } = require("./db/db");
const Donor = require("./models/donorModel");
const Recipient = require("./models/recipientModel");
const jwt = require("jsonwebtoken");
const { checkIfMatchFound } = require("./algo");
const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

app.use(express.json());

app.use(cors({
	origin: "*",
}));

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
    res
      .status(201)
      .json({
        message: `${
          role.charAt(0).toUpperCase() + role.slice(1)
        } registered successfully.`,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error." });
  }
});

app.post("/login", async (req, res) => {
	await connectDB();
	const { email, password, role } = req.body;
	if (!email || !password || !role) {
		return res
			.status(400)
			.json({ error: "Email, password, and role are required." });
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
		console.log(err);
		res.status(500).json({ error: "Server error." });
	}
});

app.post("/onboard-donor", async (req, res) => {
  await connectDB();
  const {
    email,
    gender,
    age,
    phone,
    bloodType,
    organType,
    organAvailabilityDate,
    isLivingDonor,
    medicalHistory,
    geoLocation,
    proof,
    status,
  } = req.body;

	if (!email) {
		return res.status(400).json({ error: "Email is required." });
	}

	try {
		const donor = await Donor.findOne({ email });
		if (!donor) {
			return res
				.status(404)
				.json({ error: "Donor not found. Register first." });
		}

    donor.gender = gender ?? donor.gender;
    donor.age = age ?? donor.age;
    donor.phone = phone ?? donor.phone;
    donor.bloodType = bloodType ?? donor.bloodType;
    donor.organType = organType ?? donor.organType;
    donor.organAvailabilityDate =
      organAvailabilityDate ?? donor.organAvailabilityDate;
    donor.isLivingDonor = isLivingDonor ?? donor.isLivingDonor;
    donor.medicalHistory = medicalHistory ?? donor.medicalHistory;
    donor.geoLocation = geoLocation ?? donor.geoLocation;
    donor.proof = proof ?? donor.proof;
    donor.status = status ?? donor.status;

    await donor.save();
    res.json({ message: "Donor onboarded successfully.", donor });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

app.post("/onboard-recipient", async (req, res) => {
  await connectDB();
  const {
    email,
    gender,
    age,
    phone,
    bloodType,
    requiredOrgan,
    medicalCondition,
    geoLocation,
    proof,
    status,
  } = req.body;

	if (!email) {
		return res.status(400).json({ error: "Email is required." });
	}

	try {
		const recipient = await Recipient.findOne({ email });
		if (!recipient) {
			return res
				.status(404)
				.json({ error: "Recipient not found. Register first." });
		}

    recipient.gender = gender ?? recipient.gender;
    recipient.age = age ?? recipient.age;
    recipient.phone = phone ?? recipient.phone;
    recipient.bloodType = bloodType ?? recipient.bloodType;
    recipient.requiredOrgan = requiredOrgan ?? recipient.requiredOrgan;
    recipient.waitingSince = new Date();
    recipient.medicalCondition = medicalCondition ?? recipient.medicalCondition;
    recipient.geoLocation = geoLocation ?? recipient.geoLocation;
    recipient.proof = proof ?? recipient.proof;
    recipient.status = status ?? recipient.status;

    await recipient.save();
    res.json({ message: "Recipient onboarded successfully.", recipient });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

app.get('/match', async (req,res)=>{
    await checkIfMatchFound();

    return res.json({
        msg: "Worked !!"
    })
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
