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
		password: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			
			match: /^[0-9]{10,15}$/,
		},
		bloodType: {
			type: String,
			
			enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
		},
		requiredOrgan: {
			type: String,
			
			enum: ["Kidney", "Liver", "Heart", "Lung", "Pancreas", "Intestine"],
		},
		waitingSince: {
			type: Date,
			default: Date.now,
		},
		medicalCondition: {
			diagnosis: { type: String },
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
			type: String,
		},
		status: {
			type: String,
			enum: ["Waiting", "Matched", "Transplanted", "None", "Withdrawn"],
			default: "None",
		},
		matchedDonor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Donor",
			default: null,
		}
	},
	{ timestamps: true }
);

export const Recipient =  mongoose.model("Recipient", recipientSchema);
