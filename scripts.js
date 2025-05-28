function showChildren() {
    const container = document.getElementById('childrenDetails');
    container.innerHTML = '';
    const count = document.getElementById('marriageableChildren').value;

    for (let i = 1; i <= count; i++) {
        const section = document.createElement('div');
        section.classList.add('section');
        section.innerHTML = `
          <h2>Child ${i} Details</h2>
          <label>Full Name</label><input type="text" name="child${i}_name">
          <label>Gender</label><input type="text" name="child${i}_gender">
          <label>Date of Birth</label><input type="date" name="child${i}_dob">
          <label>Time of Birth</label><input type="time" name="child${i}_tob">
          <label>Place of Birth</label><input type="text" name="child${i}_pob">
          <label>Height</label><input type="text" name="child${i}_height">
          <label>Weight</label><input type="text" name="child${i}_weight">
          <label>Complexion</label><input type="text" name="child${i}_complexion">
          <label>Hobbies & Interests</label><textarea name="child${i}_hobbies"></textarea>
          <label>Educational Qualification</label><input type="text" name="child${i}_education">
          <label>Occupation/Job Title</label><input type="text" name="child${i}_occupation">
          <label>Company Name</label><input type="text" name="child${i}_company">
          <label>Designation</label><input type="text" name="child${i}_designation">
          <label>Job/Business Location</label><input type="text" name="child${i}_location">
          <label>Annual Package / Business Income</label><input type="text" name="child${i}_income">
          <label>Work Experience</label><input type="text" name="child${i}_experience">
          <label>Previous Job(s)</label><textarea name="child${i}_previous_jobs"></textarea>
          <label>Religion</label><input type="text" name="child${i}_religion">
          <label>Caste</label><input type="text" name="child${i}_caste">
          <label>Gotra</label><input type="text" name="child${i}_gotra">
          <label>Manglik / Non-Manglik</label><input type="text" name="child${i}_manglik">
          <label>Diet</label><input type="text" name="child${i}_diet">
          <label>Marital Status</label><input type="text" name="child${i}_marital_status">
          <label>If Divorced/Widow: Any children?</label><input type="text" name="child${i}_any_children">
          <label>If yes: Custody details</label><textarea name="child${i}_custody"></textarea>
          <label>Current City & Work Location</label><input type="text" name="child${i}_current_city">
          <label>Email Address</label><input type="email" name="child${i}_email">
          <label>WhatsApp Number</label><input type="text" name="child${i}_whatsapp">
          <label>Phone Number</label><input type="text" name="child${i}_phone">
        `;
        container.appendChild(section);
    }
}

const url = "https://script.google.com/macros/s/AKfycbxsqLAjn7uxRsVI9O_eaUi71n3H-Brac2qE54tSPOWRL56XyX3jZYevXrMWd0zoOI0teQ/exec";

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
                mode:'no-cors',
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
