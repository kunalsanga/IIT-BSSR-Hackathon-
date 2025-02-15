// Sample data for posts and research papers
const posts = [
    { image: "images/ai_In_Healthcare.jpg", title: "Exploring AI in Healthcare" },
    { image: "images/aiEthics.jpg", title: "Collaborating with Industry Experts on AI Algorithms" },
    { image: "images/internship.jpg", title: "Mentoring Students in Research Internship Program" },
    { image: "images/neurips.jpg", title: "Presentation at NeurIPS 2024: AI in Data Security" }
];


const researchPapers = [
    { image: "images/Generative-AI-in-Healthcare-Use-Cases.webp", title: "AI in Healthcare" },
    { image: "images/quantumcomputing.jpg", title: "Quantum Computing Advances" },
    { image: "images/blockchain.jpg", title: "Blockchain for Data Security" },
    { image: "images/neuralnetworks.jpg", title: "Future of Neural Networks" } // New research paper added
];

// Function to create scroll items
function createScrollItem(item) {
    const scrollItem = document.createElement('div');
    scrollItem.className = 'scroll-item';
    
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.title;
    
    const p = document.createElement('p');
    p.textContent = item.title;
    
    scrollItem.appendChild(img);
    scrollItem.appendChild(p);
    
    return scrollItem;
}


// Populate posts
const postsContainer = document.getElementById('posts-container');
posts.forEach(post => {
    postsContainer.appendChild(createScrollItem(post));
});

// Populate research papers
const researchPapersContainer = document.getElementById('researchPapers-container');
researchPapers.forEach(paper => {
    researchPapersContainer.appendChild(createScrollItem(paper));
});