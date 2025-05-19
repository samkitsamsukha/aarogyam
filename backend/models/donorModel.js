const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		gender: {
			type: String,
			enum: ["Male", "Female", "Other"]
		},
		password: {
			type: String,
			required: true
		},
		age: {
			type: Number,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		phone: {
			type: String,
			match: /^[0-9]{10,15}$/,
		},
		bloodType: {
			type: String,
			enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
		},
		organType: {
			type: String,
			enum: ["Kidney", "Liver", "Heart", "Lung", "Pancreas", "Intestine"],
		},
		organAvailabilityDate: {
			type: Date,
		},
		isLivingDonor: {
			type: Boolean,
			default: false,
		},
		medicalHistory: {
			conditions: [{ type: String }],
			allergies: [{ type: String }],
			recentMedications: [{ type: String }],
			smokingHistory: {
				type: Boolean,
				default: false, 
			},
			alcoholUse: {
				type: Boolean,
				default: false,
			},
			chronicDiseases: [{ type: String }],
			infections: {
				hiv: { type: Boolean, default: false },
				hepatitis: { type: Boolean, default: false },
				tuberculosis: { type: Boolean, default: false },
			},
		},
		geoLocation: {
			lat: { type: Number },
			lng: { type: Number },
		},
		proof: {
			type: String,
		},
		status: {
			type: String,
			enum: ["Pending", "Matched", "None", "Transplanted"],
			default: "None",
		},
	},
	{ timestamps: true }
);

const Donor = mongoose.model("Donor", donorSchema);

module.exports = Donor;