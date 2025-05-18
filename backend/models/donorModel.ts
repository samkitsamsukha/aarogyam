import mongoose from "mongoose";

const donorSchema = new mongoose.Schema(
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
		organType: {
			type: String,
			required: true,
			enum: ["Kidney", "Liver", "Heart", "Lung", "Pancreas", "Intestine"],
		},
		organAvailabilityDate: {
			type: Date,
			required: true,
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
			type: String, // e.g., URL to identity proof file
			required: true,
		},
		status: {
			type: String,
			enum: ["Pending", "Approved", "Rejected", "Withdrawn", "Matched"],
			default: "Pending",
		},
	},
	{ timestamps: true }
);

export const Donor = mongoose.model("Donor", donorSchema);