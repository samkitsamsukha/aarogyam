import mongoose from "mongoose";

const recipientSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		gender: {
			type: String,
			enum: ["Male", "Female", "Other"],
			required: true,
		},
		age: {
			type: Number,
			required: true,
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
			required: true,
			match: /^[0-9]{10,15}$/,
		},
		bloodType: {
			type: String,
			required: true,
			enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
		},
		requiredOrgan: {
			type: String,
			required: true,
			enum: ["Kidney", "Liver", "Heart", "Lung", "Pancreas", "Intestine"],
		},
		waitingSince: {
			type: Date,
			default: Date.now,
		},
		medicalCondition: {
			diagnosis: { type: String, required: true },
			chronicDiseases: [{ type: String }],
			infections: {
				hiv: { type: Boolean, default: false },
				hepatitis: { type: Boolean, default: false },
				tuberculosis: { type: Boolean, default: false },
			},
			allergies: [{ type: String }],
			previousTransplants: { type: Boolean, default: false },
			recentMedications: [{ type: String }],
			smokingHistory: { type: Boolean, default: false },
			alcoholUse: { type: Boolean, default: false },
		},
		geoLocation: {
			lat: { type: Number },
			lng: { type: Number },
		},
		proof: {
			type: String, // URL to identity/proof of diagnosis document
			required: true,
		},
		status: {
			type: String,
			enum: ["Waiting", "Matched", "Transplanted", "Rejected", "Withdrawn"],
			default: "Waiting",
		},
		matchedDonor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Donor",
			default: null,
		}
	},
	{ timestamps: true }
);

export default mongoose.model("Recipient", recipientSchema);
