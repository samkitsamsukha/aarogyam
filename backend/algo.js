const { connectDB } = require("./db/db");
const { recipientMailHtml } = require("./html_templates/main");
const Donor = require("./models/donorModel");
const Recipient = require("./models/recipientModel");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

class DonorNode {
  constructor(id, bloodGroup, city, age, organType) {
    this.id = id;
    this.bloodGroup = bloodGroup;
    this.city = city;
    this.age = age;
    this.organType = organType;
  }
}

class RecipientNode {
  constructor(id, bloodGroup, city, age, urgency, organType) {
    this.id = id;
    this.bloodGroup = bloodGroup;
    this.city = city;
    this.age = age;
    this.urgency = urgency;
    this.organType = organType;
  }
}

const bloodCompatibilityWithRh = {
  "O-": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
  "O+": ["O+", "A+", "B+", "AB+"],
  "A-": ["A-", "A+", "AB-", "AB+"],
  "A+": ["A+", "AB+"],
  "B-": ["B-", "B+", "AB-", "AB+"],
  "B+": ["B+", "AB+"],
  "AB-": ["AB-", "AB+"],
  "AB+": ["AB+"],
};

function isCompatible(donorBG, recipientBG) {
  return bloodCompatibilityWithRh[donorBG]?.includes(recipientBG);
}

function getCompatibilityScore(d, r) {
  if (!isCompatible(d.bloodGroup, r.bloodGroup)) return 0;
  if (d.organType !== r.organType) return 0;

  let score = 0;
  score += 50; // Blood match
  if (d.city === r.city) score += 20;
  score += r.urgency * 10;
  score += Math.max(0, 20 - Math.abs(d.age - r.age));
  return score;
}

function hungarian(costMatrix) {
  const n = costMatrix.length;
  const m = costMatrix[0].length;
  const u = Array(n + 1).fill(0);
  const v = Array(m + 1).fill(0);
  const p = Array(m + 1).fill(0);
  const way = Array(m + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    p[0] = i;
    const minv = Array(m + 1).fill(Infinity);
    const used = Array(m + 1).fill(false);
    let j0 = 0;

    do {
      used[j0] = true;
      const i0 = p[j0];
      let delta = Infinity;
      let j1 = 0;

      for (let j = 1; j <= m; j++) {
        if (!used[j]) {
          const cur = costMatrix[i0 - 1][j - 1] - u[i0] - v[j];
          if (cur < minv[j]) {
            minv[j] = cur;
            way[j] = j0;
          }
          if (minv[j] < delta) {
            delta = minv[j];
            j1 = j;
          }
        }
      }

      for (let j = 0; j <= m; j++) {
        if (used[j]) {
          u[p[j]] += delta;
          v[j] -= delta;
        } else {
          minv[j] -= delta;
        }
      }

      j0 = j1;
    } while (p[j0] !== 0);

    do {
      const j1 = way[j0];
      p[j0] = p[j1];
      j0 = j1;
    } while (j0 !== 0);
  }

  const result = [];
  for (let j = 1; j <= m; j++) {
    if (p[j] > 0) result.push([p[j] - 1, j - 1]);
  }

  const maxScore = -v[0];
  return { matches: result, totalScore: maxScore };
}

async function checkIfMatchFound() {
  await connectDB();
  const donorsDB = await Donor.find({ status: { $in: ["Pending"] } });
  const recipientsDB = await Recipient.find({ status: { $in: ["Pending"] } });

  const sortedRecipients = recipientsDB.sort(
    (a, b) => new Date(a.waitingSince) - new Date(b.waitingSince)
  );

  const m = sortedRecipients.length;

  const donors = donorsDB.map(
    (d) =>
      new DonorNode(d._id.toString(), d.bloodType, "delhi", d.age, d.organType)
  );

  const recipients = sortedRecipients.map((r, index) => {
    const urgency = Math.round(5 * (1 - index / (m - 1 || 1)));
    return new RecipientNode(
      r._id.toString(),
      r.bloodType,
      "delhi",
      r.age,
      urgency,
      r.requiredOrgan
    );
  });

  const n = donors.length;
  const scoreMatrix = Array.from({ length: n }, () => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      scoreMatrix[i][j] = getCompatibilityScore(donors[i], recipients[j]);
    }
  }

  let maxVal = 0;
  for (let row of scoreMatrix) for (let v of row) maxVal = Math.max(maxVal, v);
  const costMatrix = scoreMatrix.map((row) => row.map((val) => maxVal - val));

  const { matches, totalScore } = hungarian(costMatrix);

  const filteredMatches = matches.filter(([di, ri]) => {
    const score = scoreMatrix[di][ri];

    return score != 0;
  });

  const donorRecipientUpdates = filteredMatches.map(async ([di, ri]) => {
    const donor = donorsDB[di];
    const recipient = sortedRecipients[ri];

    await Donor.findByIdAndUpdate(donor._id, {
      status: "Matched",
      matchedRecipient: recipient._id,
    });

    await Recipient.findByIdAndUpdate(recipient._id, {
      status: "Matched",
      matchedDonor: donor._id,
    });

    const emailHtml = recipientMailHtml(
      recipient._id,
      recipient.name,
      donor,
      new Date().getFullYear()
    );

    await transporter.sendMail({
      to: recipient.email,
      subject: "Donor Match Found - Aarogyam",
      html: emailHtml,
    });
  });

  await Promise.all(donorRecipientUpdates);
  console.log("\n📬 Updated donor and recipient statuses to 'Matched'");
}

module.exports = {
  checkIfMatchFound,
};
