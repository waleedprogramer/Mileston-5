// Get form and display elements
var form = document.getElementById('resumeForm');
var displayInfo = document.getElementById('displayInfo');
var editButtons = document.querySelectorAll('.edit-btn');
var downloadBtn = document.getElementById('downloadBtn');
// Form submit event listener
form.addEventListener('submit', function (event) {
    event.preventDefault();
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    if (!name || !email || !phone || !education || !experience || !skills) {
        alert('All fields are required!');
        return;
    }
    document.getElementById('displayName').textContent = name;
    document.getElementById('displayEmail').textContent = email;
    document.getElementById('displayPhone').textContent = phone;
    document.getElementById('displayEducation').textContent = education;
    document.getElementById('displayExperience').textContent = experience;
    document.getElementById('displaySkills').textContent = skills;
    displayInfo.classList.remove('hidden');
    downloadBtn.classList.remove('hidden');
});
// Add event listeners to edit buttons
editButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        var target = button.getAttribute('data-target');
        if (target) {
            var span_1 = document.getElementById("display".concat(capitalizeFirstLetter(target)));
            var currentText = span_1.textContent || '';
            // Create input field
            var input_1 = document.createElement('input');
            input_1.type = 'text';
            input_1.value = currentText;
            input_1.classList.add('edit-input');
            // Replace span with input
            span_1.innerHTML = '';
            span_1.appendChild(input_1);
            // Replace button with save button
            button.textContent = 'Save';
            button.classList.add('save-btn');
            button.classList.remove('edit-btn');
            // Add save functionality
            button.addEventListener('click', function () {
                var newValue = input_1.value;
                span_1.textContent = newValue;
                // Re-add the edit button
                button.textContent = 'Edit';
                button.classList.add('edit-btn');
                button.classList.remove('save-btn');
            }, { once: true });
        }
        else {
            console.error('Data target attribute missing or invalid.');
        }
    });
});
// Download button event listener
downloadBtn.addEventListener('click', function () {
    var name = document.getElementById('name').value;
    var fileName = "".concat(name.replace(/\s+/g, '_'), "_Resume.html");
    var content = "\n    <!DOCTYPE html>\n    <html lang=\"en\">\n    <head>\n      <meta charset=\"UTF-8\">\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n      <title>".concat(name, "'s Resume</title>\n      <style>\n        body {\n          font-family: 'Poppins', sans-serif;\n          background: #f0f0f0;\n          padding: 20px;\n          max-width: 800px;\n          margin: auto;\n        }\n        \n        .last {\n          max-width: 800px;\n          margin: 20px auto;\n          background-color: #f0f0f0;\n          padding: 20px;\n          border-radius: 10px;\n          border: 1px solid #07b7e3;\n          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n        }\n        \n        .section {\n          background-color: #f0f0f0;\n          margin: 30px;\n          padding: 20px;\n          border-radius: 10px;\n          \n          padding: 25px;\n                  }\n        \n        .hidden {\n          display: none;\n        }\n        .last{\n          width: 100%;\n          color: aliceblue;\n        }\n        \n        .section h2 {\n          font-size: 3rem;\n          color: #07b7e3;\n          border: 1px solid black;\n          text-align: center;\n          margin-bottom: 15px;\n        }\n        .section p{\n          font-size: 1.5rem;\n          color:hsl(0, 0%, 90%);          margin-top: 20px;\n          line-height: 1.5;\n          margin-bottom: 20px;\n          display: flex;\n          justify-content: center;\n          flex-wrap: wrap;\n          align-items: center;\n        }\n        strong{\n          color: hsl(0, 100%, 30%);\n          padding: 10px;\n        }\n        span {\n          color:black;\n      }\n        \n      </style>\n    </head>\n    <body>\n    <div class=\"last\">\n      <div class=\"section\">\n        <h2>Personal Information</h2>\n        <p><strong>Full Name:</strong><span> ").concat(document.getElementById('displayName').textContent, "</p>\n        <p><strong>Email:</strong><span> ").concat(document.getElementById('displayEmail').textContent, "</span></p>\n        <p><strong>Phone Number:</strong><span> ").concat(document.getElementById('displayPhone').textContent, "</span></p>\n      </div>\n      <div class=\"section\">\n        <h2>Education</h2>\n        <p><span>").concat(document.getElementById('displayEducation').textContent, "</span></p>\n      </div>\n      <div class=\"section\">\n        <h2>Experience</h2>\n        <p><span>").concat(document.getElementById('displayExperience').textContent, "</span></p>\n      </div>\n      <div class=\"section\">\n        <h2>Skills</h2>\n        <p><span>").concat(document.getElementById('displaySkills').textContent, "</span></p>\n      </div>\n      </div>\n    </body>\n    </html>\n  ");
    var blob = new Blob([content], { type: 'text/html' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
});
// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
