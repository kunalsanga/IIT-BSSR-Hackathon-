document.getElementById('jobApplicationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const resume = document.getElementById('resume').files[0];
    const coverLetter = document.getElementById('coverLetter').value;

    if (!name || !email || !resume || !coverLetter) {
        alert('Please fill in all fields.');
        return;
    }

    alert('Application submitted successfully!');
    // Here you would typically send the data to a server
});

const jobs = [
    {
        title: "Software Developer Intern",
        company: "Jain Software",
        location: "Raipur, India",
        skills: "Git, MySQL, PHP, Flutter, Laravel, Firebase",
        experience: "Fresher",
        salary: "0-0 INR Per Annum",
        posted: "a month ago",
        logo: "path/to/logo1.png"
    },
    {
        title: "Intern - Software Developer",
        company: "Distinction Dev",
        location: "Ahmedabad, India",
        skills: "Java, VueJS, React, Git, JavaScript, NodeJS, Python, AWS",
        experience: "Fresher",
        salary: "0-0 INR Per Annum",
        posted: "a month ago",
        logo: "path/to/logo2.png"
    },
    {
        title: "Frontend Developer Intern",
        company: "Tech Solutions",
        location: "Mumbai, India",
        skills: "HTML, CSS, JavaScript, React",
        experience: "Fresher",
        salary: "0-0 INR Per Annum",
        posted: "2 weeks ago"
    },
    {
        title: "Backend Developer Intern",
        company: "Innovatech",
        location: "Pune, India",
        skills: "Node.js, Express, MongoDB, REST APIs",
        experience: "Fresher",
        salary: "0-0 INR Per Annum",
        posted: "3 weeks ago"
    }
];

const jobList = document.getElementById('jobList');

jobs.forEach(job => {
    const jobItem = document.createElement('div');
    jobItem.className = 'job-item';

    const jobDetails = document.createElement('div');
    jobDetails.className = 'job-details';

    const jobTitle = document.createElement('h2');
    jobTitle.className = 'job-title';
    jobTitle.textContent = job.title;

    const companyName = document.createElement('p');
    companyName.className = 'company-name';
    companyName.textContent = job.company;

    const location = document.createElement('p');
    location.className = 'location';
    location.textContent = job.location;

    const skills = document.createElement('p');
    skills.className = 'skills';
    skills.textContent = `Skills: ${job.skills}`;

    const posted = document.createElement('p');
    posted.className = 'posted';
    posted.textContent = `Posted: ${job.posted}`;

    const logo = document.createElement('img');
    logo.className = 'company-logo';
    logo.src = job.logo;

    jobDetails.appendChild(jobTitle);
    jobDetails.appendChild(companyName);
    jobDetails.appendChild(location);
    jobDetails.appendChild(skills);
    jobDetails.appendChild(posted);

    const applyButton = document.createElement('button');
    applyButton.className = 'apply-button';
    applyButton.textContent = 'Apply';

    jobItem.appendChild(logo);
    jobItem.appendChild(jobDetails);
    jobItem.appendChild(applyButton);

    jobList.appendChild(jobItem);
}); 