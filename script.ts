// Get form and display elements
const form = document.getElementById('resumeForm') as HTMLFormElement;
const displayInfo = document.getElementById('displayInfo') as HTMLElement;
const editButtons = document.querySelectorAll('.edit-btn') as NodeListOf<HTMLButtonElement>;
const downloadBtn = document.getElementById('downloadBtn') as HTMLButtonElement;

// Form submit event listener
form.addEventListener('submit', (event: Event) => {
  event.preventDefault(); 

  const name = (document.getElementById('name') as HTMLInputElement).value;
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const phone = (document.getElementById('phone') as HTMLInputElement).value;
  const education = (document.getElementById('education') as HTMLTextAreaElement).value;
  const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
  const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

  if (!name || !email || !phone || !education || !experience || !skills) {
    alert('All fields are required!');
    return;
  }

  (document.getElementById('displayName') as HTMLElement).textContent = name;
  (document.getElementById('displayEmail') as HTMLElement).textContent = email;
  (document.getElementById('displayPhone') as HTMLElement).textContent = phone;
  (document.getElementById('displayEducation') as HTMLElement).textContent = education;
  (document.getElementById('displayExperience') as HTMLElement).textContent = experience;
  (document.getElementById('displaySkills') as HTMLElement).textContent = skills;

  displayInfo.classList.remove('hidden');
  downloadBtn.classList.remove('hidden');
});

// Add event listeners to edit buttons
editButtons.forEach(button => {
  button.addEventListener('click', () => {
    const target = button.getAttribute('data-target');
    
    if (target) {
      const span = document.getElementById(`display${capitalizeFirstLetter(target)}`) as HTMLElement;
      const currentText = span.textContent || '';

      // Create input field
      const input = document.createElement('input');
      input.type = 'text';
      input.value = currentText;
      input.classList.add('edit-input');

      // Replace span with input
      span.innerHTML = '';
      span.appendChild(input);

      // Replace button with save button
      button.textContent = 'Save';
      button.classList.add('save-btn');
      button.classList.remove('edit-btn');

      // Add save functionality
      button.addEventListener('click', () => {
        const newValue = input.value;
        span.textContent = newValue;

        // Re-add the edit button
        button.textContent = 'Edit';
        button.classList.add('edit-btn');
        button.classList.remove('save-btn');
      }, { once: true });
    } else {
      console.error('Data target attribute missing or invalid.');
    }
  });
});

// Download button event listener
downloadBtn.addEventListener('click', () => {
  const name = (document.getElementById('name') as HTMLInputElement).value;
  const fileName = `${name.replace(/\s+/g, '_')}_Resume.html`;
  
  const content = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${name}'s Resume</title>
      <style>
        body {
          font-family: 'Poppins', sans-serif;
          background: #f0f0f0;
          padding: 20px;
          max-width: 800px;
          margin: auto;
        }
        
        .last {
          max-width: 800px;
          margin: 20px auto;
          background-color: #f0f0f0;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        .section {
          margin-top: 40%;
          background-color: #f0f0f0;
          margin: 30px;
          padding: 20px;
          border-radius: 10px;
          border: 1px solid #07b7e3;
          padding: 25px;
          
          
          background: #000;
        }
        
        .hidden {
          display: none;
        }
        .last{
          width: 100%;
          color: aliceblue;
        }
        
        .section h2 {
          font-size: 3rem;
          color: #07b7e3;
          text-align: center;
          margin-bottom: 15px;
        }
        .section p{
          font-size: 1.5rem;
          color: #333;
          margin-top: 20px;
          line-height: 1.5;
          margin-bottom: 20px;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          align-items: center;
        }
        strong{
          color: hsl(0, 100%, 30%);
          padding: 10px;
        }
        span{
          color: white;
        }
      </style>
    </head>
    <body>
    <div class="last">
      <div class="section">
        <h2>Personal Information</h2>
        <p><strong>Full Name:</strong> ${document.getElementById('displayName')!.textContent}</p>
        <p><strong>Email:</strong> ${document.getElementById('displayEmail')!.textContent}</p>
        <p><strong>Phone Number:</strong> ${document.getElementById('displayPhone')!.textContent}</p>
      </div>
      <div class="section">
        <h2>Education</h2>
        <p>${document.getElementById('displayEducation')!.textContent}</p>
      </div>
      <div class="section">
        <h2>Experience</h2>
        <p>${document.getElementById('displayExperience')!.textContent}</p>
      </div>
      <div class="section">
        <h2>Skills</h2>
        <p>${document.getElementById('displaySkills')!.textContent}</p>
      </div>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob([content], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
});

// Helper function to capitalize first letter
function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
