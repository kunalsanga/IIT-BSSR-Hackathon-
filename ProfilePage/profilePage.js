// Sample data for posts and research papers
const posts = [
    { image: "images/ai_In_Healthcare.jpg", title: "Exploring AI in Healthcare" },
    { image: "images/aiEthics.jpg", title: "Collaborating on AI Algorithms" },
    { image: "images/internship.jpg", title: "Mentoring Students in Research Program" },
    { image: "images/neurips.jpg", title: "Presentation at NeurIPS 2024" }
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

// Function to create and show popup
function showPopup(title, description, imageUrl = null) {
    // Remove any existing popups
    const existingPopup = document.querySelector('.popup-overlay');
    if (existingPopup) {
        existingPopup.remove();
    }

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    
    // Create popup content
    const content = document.createElement('div');
    content.className = 'popup-content';
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'popup-close';
    closeBtn.innerHTML = '×';
    
    // Create content elements
    let html = '';
    if (imageUrl) {
        html += `<img src="${imageUrl}" alt="${title}" class="popup-image">`;
    }
    html += `<h2 class="popup-title">${title}</h2>`;
    html += `<p class="popup-description">${description}</p>`;
    
    content.innerHTML = html;
    content.appendChild(closeBtn);
    overlay.appendChild(content);
    document.body.appendChild(overlay);
    
    // Force reflow to ensure transition works
    overlay.offsetHeight;
    
    // Add active class
    requestAnimationFrame(() => {
        overlay.classList.add('active');
    });
    document.body.classList.add('popup-open');
    
    // Close popup function
    const closePopup = () => {
        overlay.classList.remove('active');
        document.body.classList.remove('popup-open');
        
        // Remove the popup after transition
        setTimeout(() => {
            overlay.remove();
        }, 300);
    };
    
    // Add event listeners
    closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closePopup();
    });
    
    // Add keyboard support for closing
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closePopup();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// Add click listeners to all scroll items
document.addEventListener('DOMContentLoaded', () => {
    // For posts
    const posts = document.querySelectorAll('.horizontal-scroll div');
    posts.forEach(post => {
        post.addEventListener('click', () => {
            const title = post.querySelector('h3')?.textContent || 'Post Title';
            const description = post.querySelector('p')?.textContent || 'Post Description';
            showPopup(title, description);
        });
    });
    
    // For certificates/images
    const certificates = document.querySelectorAll('.scroll-item');
    certificates.forEach(cert => {
        cert.addEventListener('click', () => {
            const title = cert.querySelector('.title')?.textContent || 'Certificate Title';
            const description = cert.querySelector('.subtitle')?.textContent || 'Certificate Description';
            const imageUrl = cert.querySelector('img')?.src;
            showPopup(title, description, imageUrl);
        });
    });
});

function openSmartContractSite() {
    // Add your smart contract site URL here
    window.open('YOUR_SMART_CONTRACT_SITE_URL', '_blank');
}