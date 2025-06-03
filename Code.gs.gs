function doPost(e) {
  try {
    const obj = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/14z-2HlTCbhWFK18l0Q68g2DGJzUKWtXEPiUuhL7mETg/edit?usp=sharing").getSheetByName("Responses");
    const folder = DriveApp.getFolderById("10cfEX4o4dAQ1_hoC4ceTTrxxzILfhBua");

    let imageLinkFormula = "";
    if (obj.photoBase64 && obj.photoBase64 !== "") {
      const decoded = Utilities.base64Decode(obj.photoBase64);
      const blob = Utilities.newBlob(decoded, obj.photoType, obj.name + "_" + new Date().getTime());
      const file = folder.createFile(blob);
      const url = file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW).getDownloadUrl();
      imageLinkFormula = `=IMAGE("${url}")`;
    }

    const timestamp = new Date();
    const row = [
      timestamp,
      imageLinkFormula,
      obj.parent_name, obj.head_family, obj.family_occupation, obj.residential_address,
      obj.city, obj.district, obj.state, obj.contact_number, obj.family_income,
      obj.total_children, obj.marriageable_children,
      obj.father_name, obj.father_occupation,
      obj.mother_name, obj.mother_occupation,
      obj.has_siblings, obj.brothers_count, obj.sisters_count,
      obj.brothers_info, obj.sisters_info,
      obj.family_type, obj.family_values, obj.family_members, obj.house_type,
      obj.residential_address_landmark,
      obj.languages_spoken, obj.temperament, obj.smoking, obj.drinking,
      obj.health_issues, obj.health_details, obj.social_media,
      obj.horoscope_required, obj.kundli_available, obj.birth_chart,
      obj.match_for, obj.preferred_location, obj.preferred_occupation, obj.preferred_education,
      obj.expected_salary, obj.preferred_caste, obj.preferred_height_age,
      obj.diet_preference, obj.family_preference, obj.kundli_must,
      obj.additional_preferences, obj.extra_info,
      obj.photo, obj.biodata_pdf,
      obj.reference_source, obj.reference_contact, obj.info_confirmed, obj.consent_given
    ];

    const childCount = parseInt(obj.marriageable_children || 0);
    for (let i = 1; i <= childCount; i++) {
      const prefix = `child${i}_`;
      const fields = [
        "name", "gender", "dob", "tob", "pob", "height", "weight", "complexion",
        "hobbies", "education", "job_type", "service_type", "govt_perm", "company",
        "designation", "location", "income", "experience", "previous_jobs",
        "religion", "caste", "gotra", "manglik", "diet", "marital_status",
        "any_children", "custody", "current_city", "email", "whatsapp", "phone"
      ];
      fields.forEach(field => row.push(obj[prefix + field] || ""));
    }

    // Add headers if the sheet is empty
    if (sheet.getLastRow() === 0) {
      const headers = [
        "Timestamp", "Photo Link",
        "Parent Name", "Head of Family", "Family Occupation", "Residential Address",
        "City", "District", "State", "Contact Number", "Family Income",
        "Total Children", "Marriageable Children",
        "Father Name", "Father Occupation",
        "Mother Name", "Mother Occupation",
        "Siblings?", "Brothers Count", "Sisters Count",
        "Brothers Info", "Sisters Info",
        "Family Type", "Family Values", "Family Members", "House Type",
        "Residential Address Landmark",
        "Languages Spoken", "Temperament", "Smoking", "Drinking",
        "Health Issues", "Health Details", "Social Media",
        "Horoscope Required", "Kundli Available", "Birth Chart PDF",
        "Match For", "Preferred Location", "Preferred Occupation", "Preferred Education",
        "Expected Salary", "Preferred Caste", "Preferred Height & Age",
        "Diet Preference", "Family Preference", "Kundli Must Match",
        "Additional Preferences", "Extra Info",
        "Photo File", "Biodata PDF File",
        "Reference Source", "Reference Contact", "Info Confirmed", "Consent Given"
      ];

      for (let i = 1; i <= 6; i++) {
        const prefix = `Child ${i}`;
        const fields = [
          "Name", "Gender", "DOB", "TOB", "POB", "Height", "Weight", "Complexion",
          "Hobbies", "Education", "Job Type", "Service Type", "Govt Job Type",
          "Company", "Designation", "Location", "Income", "Experience", "Previous Jobs",
          "Religion", "Caste", "Gotra", "Manglik", "Diet", "Marital Status",
          "Any Children", "Custody Details", "Current City", "Email", "WhatsApp", "Phone"
        ];
        fields.forEach(field => headers.push(`${prefix} - ${field}`));
      }

      sheet.appendRow(headers);
    }

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*")
      .setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
      .setHeader("Access-Control-Allow-Headers", "Content-Type");
  } catch (err) {
    return ContentService.createTextOutput("Error: " + err.toString())
      .setMimeType(ContentService.MimeType.TEXT)
      .setHeader("Access-Control-Allow-Origin", "*");
  }
}
