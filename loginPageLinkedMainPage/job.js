const jobs = [
    {
        title: "Software Developer Intern",
        company: "Jain Software",
        location: "Raipur, India",
        skills: "Git, MySQL, PHP, Flutter, Laravel, Firebase",
        experience: "Fresher",
        salary: "20-30k INR Per Annum",
        posted: "a month ago",
        
    },
    {
        title: "Intern - Software Developer",
        company: "Distinction Dev",
        location: "Ahmedabad, India",
        skills: "Java, VueJS, React, Git, JavaScript, NodeJS, Python, AWS",
        experience: "Fresher",
        salary: "40-50k INR Per Annum",
        posted: "a month ago",
        
    },
    {
        title: "Frontend Developer Intern",
        company: "Tech Solutions",
        location: "Mumbai, India",
        skills: "HTML, CSS, JavaScript, React",
        experience: "Fresher",
        salary: "30-40k INR Per Annum",
        posted: "2 weeks ago",
        
    },
    {
        title: "Backend Developer Intern",
        company: "Innovatech",
        location: "Pune, India",
        skills: "Node.js, Express, MongoDB, REST APIs",
        experience: "Fresher",
        salary: "50-60k INR Per Annum",
        posted: "3 weeks ago",
        
    }
];

// Get DOM elements
const searchButton = document.querySelector('.search-bar button');
const skillsInput = document.querySelector('.search-bar input[placeholder*="Skills"]');
const locationInput = document.querySelector('.search-bar input[placeholder="Location"]');
const experienceSelect = document.querySelector('.search-bar select');
const jobList = document.getElementById('jobList');

// Initialize results count to 0
document.querySelector('.results-count').textContent = '0 results';

// Function to create job card HTML
function createJobCard(job) {
    return `
        <div class="job-card">
            <h2>${job.title}</h2>
            <h3>${job.company}</h3>
            <p><strong>Location:</strong> ${job.location}</p>
            <p><strong>Experience:</strong> ${job.experience}</p>
            <p><strong>Skills:</strong> ${job.skills}</p>
            <button class="apply-btn">Apply Now</button>
        </div>
    `;
}

// Function to filter jobs based on search criteria
function filterJobs() {
    const searchSkills = skillsInput.value.toLowerCase();
    const searchLocation = locationInput.value.toLowerCase();
    const searchExperience = experienceSelect.value;

    const filteredJobs = jobs.filter(job => {
        const skillsMatch = job.skills.toLowerCase().includes(searchSkills) || 
                          job.title.toLowerCase().includes(searchSkills) ||
                          job.company.toLowerCase().includes(searchSkills);
        const locationMatch = job.location.toLowerCase().includes(searchLocation);
        const experienceMatch = searchExperience === "Experience" || job.experience === searchExperience;

        return skillsMatch && locationMatch && experienceMatch;
    });

    // Update results count
    const resultsCount = document.querySelector('.results-count');
    resultsCount.textContent = `${filteredJobs.length} results`;

    // Display filtered jobs
    jobList.innerHTML = filteredJobs.map(createJobCard).join('');
}

// Add event listener to search button
searchButton.addEventListener('click', filterJobs);

// Initial job display
filterJobs();