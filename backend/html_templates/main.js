const recipientMailHtml = (
  recipientName,
  donor,
  year
) => {
  const {
    name,
    gender,
    age,
    email,
    phone,
    bloodType,
    organType,
    geoLocation,
    medicalHistory,
  } = donor;

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Suitable Donor Matched</title>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { width: 80%; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
      .header { background-color: #f4f4f4; padding: 10px; text-align: center; border-bottom: 1px solid #ddd; }
      .content { padding: 20px; }
      .footer { padding: 10px; text-align: center; font-size: 0.9em; color: #777; }
      table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
      th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
      th { background-color: #f9f9f9; }
      .highlight { font-weight: bold; }
      .nested-table { width: 95%; margin-left: 5%; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>Organ Donor Match Found</h2>
      </div>
      <div class="content">
        <p>Dear ${recipientName},</p>
        <p>We are pleased to inform you that a suitable donor has been matched. Please find the details of the donor below for your review and to confirm the transplantation process.</p>

        <h3>Donor Information</h3>
        <table>
          <tr><th>Field</th><th>Details</th></tr>
          <tr><td class="highlight">Name</td><td>${name}</td></tr>
          <tr><td class="highlight">Gender</td><td>${gender}</td></tr>
          <tr><td class="highlight">Age</td><td>${age}</td></tr>
          <tr><td class="highlight">Email</td><td>${email}</td></tr>
          <tr><td class="highlight">Phone</td><td>${phone}</td></tr>
          <tr><td class="highlight">Blood Type</td><td>${bloodType}</td></tr>
          <tr><td class="highlight">Organ Type</td><td>${organType}</td></tr>
          <tr><td class="highlight">GeoLocation</td><td>Latitude: ${geoLocation.lat}, Longitude: ${geoLocation.lng}</td></tr>
        </table>

        <h3>Medical History</h3>
        <table>
          <tr><th>Category</th><th>Details</th></tr>
          <tr><td class="highlight">Conditions</td><td>${medicalHistory.conditions}</td></tr>
          <tr><td class="highlight">Allergies</td><td>${medicalHistory.allergies}</td></tr>
          <tr><td class="highlight">Recent Medications</td><td>${medicalHistory.recentMedications}</td></tr>
          <tr><td class="highlight">Smoking History</td><td>${medicalHistory.smokingHistory}</td></tr>
          <tr><td class="highlight">Alcohol Use</td><td>${medicalHistory.alcoholUse}</td></tr>
          <tr><td class="highlight">Chronic Diseases</td><td>${medicalHistory.chronicDiseases}</td></tr>
          <tr>
            <td class="highlight">Infections</td>
            <td>
              <table class="nested-table">
                <tr><td>HIV:</td><td>${medicalHistory.infections.hiv}</td></tr>
                <tr><td>Hepatitis:</td><td>${medicalHistory.infections.hepatitis}</td></tr>
                <tr><td>Tuberculosis:</td><td>${medicalHistory.infections.tuberculosis}</td></tr>
              </table>
            </td>
          </tr>
        </table>

        <p>Please review the attached donor schema information carefully. We kindly request you to proceed with the necessary steps to confirm the transplantation at your earliest convenience.</p>
        <p>If you have any questions or require further information, please do not hesitate to contact us.</p>
        <p>Sincerely,</p>
        <p>The Organ Matching Team</p>
      </div>
      <div class="footer">
        <p>&copy; ${year} Organ Donation Services. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;
};

module.exports = { recipientMailHtml };
