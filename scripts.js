function showChildren() {
    const container = document.getElementById('childrenDetails');
    container.innerHTML = '';
    const count = document.getElementById('marriageableChildren').value;

    for (let i = 1; i <= count; i++) {
        const section = document.createElement('div');
        section.classList.add('section');
        section.innerHTML = `
          <h2>Child ${i} Details</h2>
          <label>Full Name</label><input type="text" name="child${i}_name" placeholder="Enter full name">
          <label>Gender</label><input type="text" name="child${i}_gender" placeholder="Male / Female / Other">
          <label>Date of Birth</label><input type="date" name="child${i}_dob">
          <label>Time of Birth</label><input type="time" name="child${i}_tob">
          <label>Place of Birth</label><input type="text" name="child${i}_pob" placeholder="City / Town / Village">
          <label>Height</label><input type="text" name="child${i}_height" placeholder="e.g., 5'8\"">
          <label>Weight</label><input type="text" name="child${i}_weight" placeholder="in kg">
          <label>Complexion</label><input type="text" name="child${i}_complexion" placeholder="Fair / Wheatish / Dark">
          <label>Hobbies & Interests</label><textarea name="child${i}_hobbies" placeholder="E.g., Reading, Music, Sports"></textarea>
          <label>Educational Qualification</label><input type="text" name="child${i}_education" placeholder="Highest degree attained">
          <label>Job Type</label>
          <select name="child${i}_job_type" onchange="toggleEmploymentFields(this, ${i})">
              <option value="">Select</option>
              <option value="Service">Service</option>
              <option value="Business">Business</option>
          </select>
          <div id="child${i}_job_details"></div>
          <label>Company Name</label><input type="text" name="child${i}_company" placeholder="Employer or Firm Name">
          <label>Designation</label><input type="text" name="child${i}_designation" placeholder="Job title or role">
          <label>Job/Business Location</label><input type="text" name="child${i}_location" placeholder="City / Country">
          <label>Annual Package / Business Income</label><input type="text" name="child${i}_income" placeholder="e.g., ₹8 LPA">
          <label>Work Experience</label><input type="text" name="child${i}_experience" placeholder="e.g., 5 years">
          <label>Previous Job(s)</label><textarea name="child${i}_previous_jobs" placeholder="List of past jobs with role & duration"></textarea>
          <label>Religion</label><input type="text" name="child${i}_religion" placeholder="e.g., Sikhism">
          <label>Caste</label><input type="text" name="child${i}_caste" placeholder="Optional">
          <label>Gotra</label><input type="text" name="child${i}_gotra" placeholder="Optional">
          <label>Manglik / Non-Manglik</label><input type="text" name="child${i}_manglik" placeholder="Manglik / Non-Manglik / Don't Know">
          <label>Diet</label><input type="text" name="child${i}_diet" placeholder="Veg / Non-Veg / Eggetarian">
          <label>Marital Status</label>
          <select name="child${i}_marital_status" onchange="toggleCustodyFields(this, ${i})">
              <option value="">Select</option>
              <option value="Unmarried">Unmarried</option>
              <option value="Divorced">Divorced</option>
              <option value="Widow">Widow</option>
          </select>
          <div id="child${i}_custody_fields" style="display:none">
              <label>Any children?</label><input type="text" name="child${i}_any_children" placeholder="Yes / No">
              <label>If yes: Custody details</label><textarea name="child${i}_custody" placeholder="Mention who has custody, arrangements, etc."></textarea>
          </div>
          <label>Current City & Work Location</label><input type="text" name="child${i}_current_city" placeholder="City and Office Address">
          <label>Email Address</label><input type="email" name="child${i}_email" placeholder="example@email.com">
          <label>WhatsApp Number</label><input type="text" name="child${i}_whatsapp" placeholder="10-digit mobile number">
          <label>Phone Number</label><input type="text" name="child${i}_phone" placeholder="Optional">
        `;
        container.appendChild(section);
    }
}

function toggleEmploymentFields(select, index) {
    const container = document.getElementById(`child${index}_job_details`);
    container.innerHTML = '';

    if (select.value === 'Service') {
        container.innerHTML = `
            <label>Service Type</label>
            <select name="child${index}_service_type" onchange="toggleGovtType(this, ${index})">
                <option value="">Select</option>
                <option value="Private">Private</option>
                <option value="Semi-Private">Semi-Private</option>
                <option value="Government">Government</option>
            </select>
            <div id="child${index}_govt_type"></div>
        `;
    }
}

function toggleGovtType(select, index) {
    const container = document.getElementById(`child${index}_govt_type`);
    container.innerHTML = '';

    if (select.value === 'Government') {
        container.innerHTML = `
            <label>Is the job permanent?</label>
            <select name="child${index}_govt_perm">
                <option value="">Select</option>
                <option value="Permanent">Permanent</option>
                <option value="Temporary">Temporary</option>
            </select>
        `;
    }
}

function toggleCustodyFields(select, index) {
    const custodyDiv = document.getElementById(`child${index}_custody_fields`);
    if (select.value === 'Divorced' || select.value === 'Widow') {
        custodyDiv.style.display = 'block';
    } else {
        custodyDiv.style.display = 'none';
    }
}
const url = "https://script.google.com/macros/s/AKfycbw-ealqLH9we44hCbE7xiGaAfh6wa3dzl38UtY_I3Gq6BO1cRfutrKxyM4cavqeqM11yA/exec";

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById("biodataForm");
    const fileInput = form.querySelector("input[name='photo']");

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const file = fileInput.files[0];
        const formData = new FormData(form);
        const textData = Object.fromEntries(formData.entries());

        const sendData = (base64 = "", type = "", name = "") => {
            const payload = {
                photoBase64: base64,
                photoType: type,
                name: name,
                ...textData
            };

            fetch(url, {
                method: "POST",
                mode: 'no-cors',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
                .then(res => res.text())
                .then(response => {
                    console.log("Response:", response);
                    Swal.fire({
                        title: 'Success!',
                        text: 'Form submitted successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        form.reset();
                        document.getElementById('childrenDetails').innerHTML = '';
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                    Swal.fire('Error', 'Submission failed. Please try again.', 'error');
                });
        };

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result;
                const base64 = result.split("base64,")[1];
                sendData(base64, file.type, file.name);
            };
            reader.readAsDataURL(file);
        } else {
            sendData(); // No image
        }
    });
});


function toggleSiblingCount(select) {
    const siblingSection = document.getElementById('sibling_count_section');
    siblingSection.style.display = select.value === 'Yes' ? 'block' : 'none';
}


window.addEventListener('load', () => {
    const curtain = document.querySelector('.curtain');
    setTimeout(() => {
        curtain.style.display = 'none';
    }, 5000);
});
