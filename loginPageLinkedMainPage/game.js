document.addEventListener('DOMContentLoaded', function() {
    const courseData = {
        webDevelopment: {
            title: "Web Development Journey",
            levels: [
                {
                    id: 1,
                    title: "HTML Fundamentals",
                    credits: 10,
                    content: `
                        <div class="study-module">
                            <div class="module-header">
                                <h3>HTML Basics</h3>
                                <span class="credit-badge">${10} Credits</span>
                            </div>
                            <div class="module-content">
                                <h4>Learning Objectives:</h4>
                                <ul class="objectives-list">
                                    <li>Understand HTML document structure</li>
                                    <li>Master essential HTML tags and elements</li>
                                    <li>Create forms and handle user input</li>
                                </ul>
                                
                                <div class="content-section">
                                    <h4>1. Document Structure</h4>
                                    <pre class="code-example">
<!DOCTYPE html>
<html>
    <head>
        <title>Page Title</title>
    </head>
    <body>
        <!-- Content goes here -->
    </body>
</html></pre>
                                </div>

                                <div class="tasks-section">
                                    <h4>Practical Tasks:</h4>
                                    <div class="task-list">
                                        <label><input type="checkbox" class="task-checkbox"> Create an HTML5 document structure</label>
                                        <label><input type="checkbox" class="task-checkbox"> Implement a navigation menu with 4 links</label>
                                        <label><input type="checkbox" class="task-checkbox"> Build a contact form with validation</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
                },
                {
                    id: 2,
                    title: "CSS Styling",
                    credits: 15,
                    content: `
                        <div class="study-module">
                            <div class="module-header">
                                <h3>CSS Fundamentals</h3>
                                <span class="credit-badge">${15} Credits</span>
                            </div>
                            <div class="module-content">
                                <h4>Learning Objectives:</h4>
                                <ul class="objectives-list">
                                    <li>Master CSS selectors and properties</li>
                                    <li>Understand the box model concept</li>
                                    <li>Create responsive layouts with Flexbox</li>
                                </ul>

                                <div class="content-section">
                                    <h4>1. CSS Selectors</h4>
                                    <pre class="code-example">
/* Element Selector */
p {
    color: blue;
}

/* Class Selector */
.highlight {
    background-color: yellow;
}

/* ID Selector */
#header {
    font-size: 24px;
}</pre>
                                </div>

                                <div class="tasks-section">
                                    <h4>Practical Tasks:</h4>
                                    <div class="task-list">
                                        <label><input type="checkbox" class="task-checkbox"> Style text elements using different selectors</label>
                                        <label><input type="checkbox" class="task-checkbox"> Create a responsive grid layout</label>
                                        <label><input type="checkbox" class="task-checkbox"> Implement hover animations</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
                }
            ]
        },
        dataScience: {
            title: "Data Science Mastery",
            levels: [
                {
                    id: 1,
                    title: "Python Fundamentals",
                    credits: 12,
                    content: `
                        <div class="study-module">
                            <div class="module-header">
                                <h3>Python Basics</h3>
                                <span class="credit-badge">${12} Credits</span>
                            </div>
                            <div class="module-content">
                                <h4>Learning Objectives:</h4>
                                <ul class="objectives-list">
                                    <li>Master Python syntax and data types</li>
                                    <li>Understand control structures</li>
                                    <li>Work with functions and modules</li>
                                </ul>

                                <div class="content-section">
                                    <h4>1. Basic Python Syntax</h4>
                                    <pre class="code-example">
# Variables and Data Types
name = "John"
age = 25
height = 1.75
is_student = True

# Basic Operations
def greet(name):
    return f"Hello, {name}!"

print(greet(name))</pre>
                                </div>

                                <div class="tasks-section">
                                    <h4>Practical Tasks:</h4>
                                    <div class="task-list">
                                        <label><input type="checkbox" class="task-checkbox"> Create variables of different data types</label>
                                        <label><input type="checkbox" class="task-checkbox"> Write a function that calculates factorial</label>
                                        <label><input type="checkbox" class="task-checkbox"> Implement a simple calculator program</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
                }
            ]
        }
        // Add more courses as needed
    };

    let currentCourse = null;
    let currentLevel = null;
    let unlockedLevels = [1];
    let totalCredits = 0;

    // Initialize credits display
    function initializeCreditsDisplay() {
        const creditsDisplay = document.createElement('div');
        creditsDisplay.className = 'credits-display';
        creditsDisplay.innerHTML = `
            <span class="credits-icon">🏆</span>
            <span class="credits-amount">0</span>
            <span class="credits-label">Credits</span>
        `;
        document.querySelector('#learning-map header').appendChild(creditsDisplay);
        
        // Load saved credits if any
        const savedCredits = localStorage.getItem('totalCredits');
        if (savedCredits) {
            totalCredits = parseInt(savedCredits);
            updateCreditsDisplay();
        }
    }

    // Screen management
    function showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    // Course selection
    document.querySelectorAll('.course-btn').forEach(button => {
        button.addEventListener('click', () => {
            currentCourse = button.dataset.course;
            document.getElementById('course-title').textContent = courseData[currentCourse].title;
            createLevelMap();
            showScreen('learning-map');
        });
    });

    // Create level map
    function createLevelMap() {
        const levelMap = document.getElementById('level-map');
        levelMap.innerHTML = '';
        
        if (!currentCourse || !courseData[currentCourse]) return;
        
        const levels = courseData[currentCourse].levels;
        const row = document.createElement('div');
        row.className = 'level-row';
        
        levels.forEach((level, index) => {
            const nodeContainer = document.createElement('div');
            nodeContainer.className = 'level-node-container';
            
            const node = document.createElement('div');
            node.className = `level-node ${unlockedLevels.includes(level.id) ? 'unlocked' : 'locked'}`;
            
            // Add level info
            const levelInfo = document.createElement('div');
            levelInfo.className = 'level-info';
            levelInfo.innerHTML = `
                <span class="level-number">Level ${level.id}</span>
                <span class="level-title">${level.title}</span>
                <span class="level-credits">${level.credits} Credits</span>
            `;
            node.appendChild(levelInfo);
            
            if (unlockedLevels.includes(level.id)) {
                node.addEventListener('click', () => openLevel(level));
            }
            
            nodeContainer.appendChild(node);
            
            // Add connection line
            if (index < levels.length - 1) {
                const connection = document.createElement('div');
                connection.className = 'level-connection';
                const isNextUnlocked = unlockedLevels.includes(levels[index + 1].id);
                connection.className = level-connection ;{isNextUnlocked ? 'unlocked' : 'locked'};
                nodeContainer.appendChild(connection);
            }
            
            row.appendChild(nodeContainer);
        });
        
        levelMap.appendChild(row);
    }

    // Open level content
    function openLevel(level) {
        currentLevel = level;
        document.getElementById('level-title').textContent = level.title;
        document.getElementById('study-material').innerHTML = level.content;
        
        // Add animation class
        const content = document.querySelector('.content-container');
        content.classList.add('fade-in');
        
        showScreen('level-content');
        updateProgress();
        
        // Remove animation class after animation completes
        setTimeout(() => {
            content.classList.remove('fade-in');
        }, 500);
    }

    // Progress tracking
    function updateProgress() {
        const checkboxes = document.querySelectorAll('.task-checkbox');
        const completedTasks = Array.from(checkboxes).filter(cb => cb.checked).length;
        const totalTasks = checkboxes.length;
        const progress = (completedTasks / totalTasks) * 100;
        
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-percentage');
        
        // Animate progress bar
        progressBar.style.transition = 'width 0.3s ease-in-out';
        progressBar.value = progress;
        progressText.textContent = `${Math.round(progress)}%`;
        
        if (progress === 100) {
            setTimeout(() => unlockNextLevel(), 500);
        }
    }

    // Unlock next level
    function unlockNextLevel() {
        const nextLevelId = currentLevel.id + 1;
        if (!unlockedLevels.includes(nextLevelId)) {
            unlockedLevels.push(nextLevelId);
            
            // Add credits
            totalCredits += currentLevel.credits;
            updateCreditsDisplay();

            // Show completion popup
            showCompletionPopup(currentLevel.credits);
        }
    }

    function updateCreditsDisplay() {
        document.querySelector('.credits-amount').textContent = totalCredits;
    }

    function showCompletionPopup(credits) {
        const popup = document.createElement('div');
        popup.className = 'completion-popup';
        popup.innerHTML = `
            <div class="popup-content">
                <div class="completion-header">
                    <h3>🎉 Level Complete!</h3>
                    <div class="stars">⭐⭐⭐</div>
                </div>
                <p>Congratulations! You've mastered this level!</p>
                <div class="credit-animation">+${credits}</div>
                <div class="total-credits">Total Credits: ${totalCredits}</div>
                <button class="popup-close">Continue to Next Level</button>
            </div>
        `;
        document.body.appendChild(popup);

        // Trigger animations
        requestAnimationFrame(() => {
            popup.classList.add('show');
            const creditAnim = popup.querySelector('.credit-animation');
            creditAnim.classList.add('bounce');
        });

        popup.querySelector('.popup-close').addEventListener('click', () => {
            popup.classList.add('fade-out');
            setTimeout(() => {
                popup.remove();
                showScreen('learning-map');
                createLevelMap();
            }, 300);
        });
    }

    // Event listeners for checkboxes
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('task-checkbox')) {
            updateProgress();
        }
    });

    // Navigation buttons
    document.getElementById('back-to-courses').addEventListener('click', () => {
        showScreen('course-selector');
    });

    document.getElementById('back-to-map').addEventListener('click', () => {
        createLevelMap(); // Refresh map to show newly unlocked levels
        showScreen('learning-map');
    });

    // Save progress
    function saveProgress() {
        localStorage.setItem('unlockedLevels', JSON.stringify(unlockedLevels));
        localStorage.setItem('totalCredits', totalCredits.toString());
    }

    // Load progress
    function loadProgress() {
        const savedLevels = localStorage.getItem('unlockedLevels');
        if (savedLevels) {
            unlockedLevels = JSON.parse(savedLevels);
        }
    }

    // Initialize the page
    initializeCreditsDisplay();
    loadProgress();
});