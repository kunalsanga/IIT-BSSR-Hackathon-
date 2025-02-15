document.addEventListener('DOMContentLoaded', () => {
    const courseDropdown = document.getElementById('course-dropdown');
    const courseContent = document.getElementById('course-content');
    const contentDisplay = document.getElementById('content-display');
    const levelPath = document.getElementById('level-path');
    const progressBar = document.getElementById('progress-bar');
    const progressPercentage = document.getElementById('progress-percentage');

    const courses = {
        webDevelopment: {
            title: "Web Development",
            levels: [
                {
                    level: 1,
                    description: "Introduction to HTML & CSS",
                    materials: [
                        "HTML & CSS Basics",
                        "Building Your First Webpage"
                    ],
                    keyPoints: [
                        { topic: "HTML", definition: "HTML (HyperText Markup Language) is the standard language for creating web pages. It uses tags to structure content." },
                        { topic: "CSS", definition: "CSS (Cascading Style Sheets) is used to style and layout web pages. It allows you to apply styles to HTML elements." },
                        { topic: "Selectors", definition: "CSS selectors are used to select the HTML elements you want to style." },
                        { topic: "Box Model", definition: "The CSS box model describes the rectangular boxes generated for elements in the document tree and consists of margins, borders, padding, and the actual content." }
                    ],
                    youtubeLinks: [
                        { title: "HTML Basics", url: "https://www.youtube.com/watch?v=UB1O30fR-EE" },
                        { title: "CSS Basics", url: "https://www.youtube.com/watch?v=yfoY53QXEnI" }
                    ]
                },
                {
                    level: 2,
                    description: "JavaScript Essentials",
                    materials: [
                        "JavaScript Syntax",
                        "DOM Manipulation"
                    ],
                    keyPoints: [
                        { topic: "JavaScript", definition: "JavaScript is a programming language that allows you to implement complex features on web pages, such as interactive content." },
                        { topic: "Variables", definition: "Variables are containers for storing data values. In JavaScript, you can declare variables using var, let, or const." },
                        { topic: "Functions", definition: "Functions are blocks of code designed to perform a particular task. They are executed when something invokes them." },
                        { topic: "DOM", definition: "The Document Object Model (DOM) is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content." }
                    ],
                    youtubeLinks: [
                        { title: "JavaScript Crash Course", url: "https://www.youtube.com/watch?v=hdI2bqOjy3c" }
                    ]
                },
                {
                    level: 3,
                    description: "Advanced CSS and JavaScript",
                    materials: [
                        "CSS Grid and Flexbox",
                        "JavaScript ES6 Features"
                    ],
                    keyPoints: [
                        { topic: "CSS Grid", definition: "CSS Grid Layout is a two-dimensional layout system for the web. It allows you to create complex layouts with ease." },
                        { topic: "Flexbox", definition: "Flexbox is a one-dimensional layout method for laying out items in rows or columns. It is designed to distribute space and align items." },
                        { topic: "ES6", definition: "ES6, also known as ECMAScript 2015, introduced new features to JavaScript, including arrow functions, classes, and template literals." },
                        { topic: "Promises", definition: "Promises are used to handle asynchronous operations in JavaScript. They represent a value that may be available now, or in the future, or never." }
                    ],
                    youtubeLinks: [
                        { title: "CSS Grid Tutorial", url: "https://www.youtube.com/watch?v=EFafSYg-PkI" },
                        { title: "JavaScript ES6 Tutorial", url: "https://www.youtube.com/watch?v=NCwa_xi0Uuc" }
                    ]
                },
                {
                    level: 4,
                    description: "Web Development Frameworks",
                    materials: [
                        "Introduction to React",
                        "Building Applications with Angular"
                    ],
                    keyPoints: [
                        { topic: "React", definition: "React is a JavaScript library for building user interfaces. It allows you to create reusable UI components." },
                        { topic: "Components", definition: "Components are the building blocks of a React application. They encapsulate the UI and behavior of a part of the application." },
                        { topic: "Angular", definition: "Angular is a platform for building mobile and desktop web applications. It provides a comprehensive framework for building dynamic web apps." },
                        { topic: "Directives", definition: "Directives are special markers in Angular that tell the library to do something to a DOM element or an existing component instance." }
                    ],
                    youtubeLinks: [
                        { title: "React Tutorial", url: "https://www.youtube.com/watch?v=Ke90Tje7VS0" },
                        { title: "Angular Tutorial", url: "https://www.youtube.com/watch?v=3qBXWUpoPHo" }
                    ]
                }
            ]
        },
        dataScience: {
            title: "Data Science",
            levels: [
                {
                    level: 1,
                    description: "Python for Data Science",
                    materials: [
                        "Python Basics",
                        "Data Structures in Python"
                    ],
                    keyPoints: [
                        { topic: "Python", definition: "Python is a high-level, interpreted programming language known for its readability and versatility. It is widely used in data science." },
                        { topic: "Data Types", definition: "Python supports various data types, including integers, floats, strings, and booleans." },
                        { topic: "Lists", definition: "Lists are used to store multiple items in a single variable. They are one of the most versatile data types in Python." },
                        { topic: "Dictionaries", definition: "Dictionaries are used to store data values in key:value pairs. They are unordered, changeable, and do not allow duplicates." }
                    ],
                    youtubeLinks: [
                        { title: "Python for Beginners", url: "https://www.youtube.com/watch?v=_uQrJ0TkZlc" }
                    ]
                },
                {
                    level: 2,
                    description: "Data Analysis with Pandas",
                    materials: [
                        "Pandas DataFrames",
                        "Data Cleaning"
                    ],
                    keyPoints: [
                        { topic: "Pandas", definition: "Pandas is a Python library used for data manipulation and analysis. It provides data structures and functions needed to work with structured data." },
                        { topic: "DataFrames", definition: "DataFrames are two-dimensional, size-mutable, potentially heterogeneous tabular data structures with labeled axes (rows and columns)." },
                        { topic: "Data Cleaning", definition: "Data cleaning involves preparing raw data for analysis by removing or modifying data that is incorrect, incomplete, irrelevant, or duplicated." },
                        { topic: "Missing Data", definition: "Handling missing data is an essential part of data cleaning. Pandas provides functions to detect and fill missing data." }
                    ],
                    youtubeLinks: [
                        { title: "Pandas Tutorial", url: "https://www.youtube.com/watch?v=vmEHCJofslg" }
                    ]
                },
                {
                    level: 3,
                    description: "Machine Learning Basics",
                    materials: [
                        "Introduction to Machine Learning",
                        "Supervised vs Unsupervised Learning"
                    ],
                    keyPoints: [
                        { topic: "Machine Learning", definition: "Machine learning is a method of data analysis that automates analytical model building. It is a branch of artificial intelligence." },
                        { topic: "Supervised Learning", definition: "Supervised learning is a type of machine learning where the model is trained on labeled data." },
                        { topic: "Unsupervised Learning", definition: "Unsupervised learning is a type of machine learning where the model is trained on unlabeled data and must find patterns and relationships." },
                        { topic: "Algorithms", definition: "Common machine learning algorithms include linear regression, decision trees, and k-means clustering." }
                    ],
                    youtubeLinks: [
                        { title: "Machine Learning Basics", url: "https://www.youtube.com/watch?v=GwIo3gDZCVQ" }
                    ]
                },
                {
                    level: 4,
                    description: "Deep Learning and Neural Networks",
                    materials: [
                        "Introduction to Neural Networks",
                        "Deep Learning with TensorFlow"
                    ],
                    keyPoints: [
                        { topic: "Neural Networks", definition: "Neural networks are a series of algorithms that mimic the operations of a human brain to recognize relationships between vast amounts of data." },
                        { topic: "Deep Learning", definition: "Deep learning is a subset of machine learning that uses neural networks with many layers." },
                        { topic: "TensorFlow", definition: "TensorFlow is an end-to-end open-source platform for machine learning. It is used for implementing machine learning and deep learning models." },
                        { topic: "Keras", definition: "Keras is an open-source software library that provides a Python interface for artificial neural networks. Keras acts as an interface for the TensorFlow library." }
                    ],
                    youtubeLinks: [
                        { title: "Neural Networks Tutorial", url: "https://www.youtube.com/watch?v=aircAruvnKk" },
                        { title: "TensorFlow Tutorial", url: "https://www.youtube.com/watch?v=tPYj3fFJGjk" }
                    ]
                }
            ]
        },
        cybersecurity: {
            title: "Cybersecurity",
            levels: [
                {
                    level: 1,
                    description: "Network Security Fundamentals",
                    materials: [
                        "Understanding Networks",
                        "Basic Security Protocols"
                    ],
                    keyPoints: [
                        { topic: "Network Security", definition: "Network security involves policies and practices to prevent and monitor unauthorized access, misuse, or modification of a computer network and network-accessible resources." },
                        { topic: "Firewalls", definition: "Firewalls are network security systems that monitor and control incoming and outgoing network traffic based on predetermined security rules." },
                        { topic: "VPN", definition: "A Virtual Private Network (VPN) extends a private network across a public network and enables users to send and receive data as if their devices were directly connected to the private network." },
                        { topic: "Encryption", definition: "Encryption is the process of converting information or data into a code, especially to prevent unauthorized access." }
                    ],
                    youtubeLinks: [
                        { title: "Network Security Basics", url: "https://www.youtube.com/watch?v=3QhU9jd03a0" }
                    ]
                },
                {
                    level: 2,
                    description: "Cryptography Basics",
                    materials: [
                        "Encryption Techniques",
                        "Public Key Infrastructure"
                    ],
                    keyPoints: [
                        { topic: "Cryptography", definition: "Cryptography is the practice of securing information by transforming it into an unreadable format, only readable by those possessing a secret key." },
                        { topic: "Symmetric Encryption", definition: "Symmetric encryption is a type of encryption where the same key is used to encrypt and decrypt the message." },
                        { topic: "Asymmetric Encryption", definition: "Asymmetric encryption uses a pair of keys, a public key and a private key, to encrypt and decrypt messages." },
                        { topic: "Digital Signatures", definition: "Digital signatures are a mathematical scheme for verifying the authenticity of digital messages or documents." }
                    ],
                    youtubeLinks: [
                        { title: "Cryptography Crash Course", url: "https://www.youtube.com/watch?v=jhXCTbFnK8o" }
                    ]
                },
                {
                    level: 3,
                    description: "Ethical Hacking Introduction",
                    materials: [
                        "Ethical Hacking Basics",
                        "Penetration Testing"
                    ],
                    keyPoints: [
                        { topic: "Ethical Hacking", definition: "Ethical hacking involves legally breaking into computers and devices to test an organization's defenses." },
                        { topic: "Penetration Testing", definition: "Penetration testing is a simulated cyber attack against your computer system to check for exploitable vulnerabilities." },
                        { topic: "Vulnerability Assessment", definition: "Vulnerability assessment is the process of identifying, quantifying, and prioritizing vulnerabilities in a system." },
                        { topic: "Social Engineering", definition: "Social engineering is the art of manipulating people so they give up confidential information." }
                    ],
                    youtubeLinks: [
                        { title: "Ethical Hacking Basics", url: "https://www.youtube.com/watch?v=3Kq1MIfTWCE" }
                    ]
                },
                {
                    level: 4,
                    description: "Advanced Cybersecurity Techniques",
                    materials: [
                        "Intrusion Detection Systems",
                        "Incident Response"
                    ],
                    keyPoints: [
                        { topic: "Intrusion Detection", definition: "Intrusion detection systems monitor network traffic for suspicious activity and issue alerts when such activity is discovered." },
                        { topic: "Incident Response", definition: "Incident response is an organized approach to addressing and managing the aftermath of a security breach or cyberattack." },
                        { topic: "Forensics", definition: "Digital forensics involves the recovery and investigation of material found in digital devices, often in relation to computer crime." },
                        { topic: "Threat Intelligence", definition: "Threat intelligence is the knowledge that helps organizations understand the risks of the most common and severe external threats." }
                    ],
                    youtubeLinks: [
                        { title: "Intrusion Detection Tutorial", url: "https://www.youtube.com/watch?v=1g5Q3P4JZgI" },
                        { title: "Incident Response Tutorial", url: "https://www.youtube.com/watch?v=2zV3b7f1b8I" }
                    ]
                }
            ]
        },
        aiMl: {
            title: "AI & Machine Learning",
            levels: [
                {
                    level: 1,
                    description: "Introduction to AI",
                    materials: [
                        "AI Basics",
                        "History of AI"
                    ],
                    keyPoints: [
                        { topic: "AI", definition: "Artificial Intelligence (AI) is the simulation of human intelligence in machines." },
                        { topic: "Machine Learning", definition: "Machine Learning is a subset of AI that involves the use of algorithms to allow computers to learn from data." }
                    ],
                    youtubeLinks: [
                        { title: "AI Basics", url: "https://www.youtube.com/watch?v=2ePf9rue1Ao" }
                    ]
                },
                {
                    level: 2,
                    description: "Deep Learning",
                    materials: [
                        "Neural Networks",
                        "Deep Learning Frameworks"
                    ],
                    keyPoints: [
                        { topic: "Neural Networks", definition: "Neural networks are a series of algorithms that mimic the operations of a human brain to recognize relationships between vast amounts of data." },
                        { topic: "TensorFlow", definition: "TensorFlow is an end-to-end open-source platform for machine learning." }
                    ],
                    youtubeLinks: [
                        { title: "Deep Learning Basics", url: "https://www.youtube.com/watch?v=aircAruvnKk" }
                    ]
                },
                {
                    level: 3,
                    description: "Natural Language Processing",
                    materials: [
                        "NLP Basics",
                        "Text Processing"
                    ],
                    keyPoints: [
                        { topic: "NLP", definition: "Natural Language Processing (NLP) is a field of AI that gives machines the ability to read, understand, and derive meaning from human languages." },
                        { topic: "Text Processing", definition: "Text processing involves analyzing and manipulating text data to extract meaningful information." }
                    ],
                    youtubeLinks: [
                        { title: "NLP Tutorial", url: "https://youtu.be/ENLEjGozrio?si=-UPxLZuRUcK6ac91" }
                    ]
                },
                {
                    level: 4,
                    description: "Reinforcement Learning",
                    materials: [
                        "Introduction to Reinforcement Learning",
                        "Q-Learning"
                    ],
                    keyPoints: [
                        { topic: "Reinforcement Learning", definition: "Reinforcement Learning is a type of machine learning where an agent learns to make decisions by taking actions in an environment to maximize cumulative reward." },
                        { topic: "Q-Learning", definition: "Q-Learning is a model-free reinforcement learning algorithm to learn the value of an action in a particular state." }
                    ],
                    youtubeLinks: [
                        { title: "Reinforcement Learning Basics", url: "https://www.youtube.com/watch?v=2pWv7GOvuf0" }
                    ]
                }
            ]
        },
        blockchain: {
            title: "Blockchain",
            levels: [
                {
                    level: 1,
                    description: "Blockchain Basics",
                    materials: [
                        "Introduction to Blockchain",
                        "How Blockchain Works"
                    ],
                    keyPoints: [
                        { topic: "Blockchain", definition: "Blockchain is a distributed database that allows for secure, transparent and tamper-proof record-keeping." },
                        { topic: "Cryptocurrency", definition: "Cryptocurrency is a digital or virtual currency that uses cryptography for security." }
                    ],
                    youtubeLinks: [
                        { title: "Blockchain Basics", url: "https://www.youtube.com/watch?v=SSo_EIwHSd4" }
                    ]
                },
                {
                    level: 2,
                    description: "Smart Contracts",
                    materials: [
                        "Ethereum and Smart Contracts",
                        "Developing Smart Contracts"
                    ],
                    keyPoints: [
                        { topic: "Smart Contracts", definition: "Smart contracts are self-executing contracts with the terms of the agreement directly written into code." },
                        { topic: "Ethereum", definition: "Ethereum is a decentralized platform that enables the creation of smart contracts and decentralized applications (DApps)." }
                    ],
                    youtubeLinks: [
                        { title: "Smart Contracts Tutorial", url: "https://www.youtube.com/watch?v=ZE2HxTmxfrI" }
                    ]
                },
                {
                    level: 3,
                    description: "Decentralized Applications",
                    materials: [
                        "Introduction to DApps",
                        "Building DApps"
                    ],
                    keyPoints: [
                        { topic: "DApps", definition: "Decentralized Applications (DApps) are applications that run on a blockchain network, rather than relying on a single computer." },
                        { topic: "Blockchain Platforms", definition: "Blockchain platforms like Ethereum and EOS provide the infrastructure to build and deploy DApps." }
                    ],
                    youtubeLinks: [
                        { title: "DApps Tutorial", url: "https://www.youtube.com/watch?v=8A7p1NFn64s" }
                    ]
                },
                {
                    level: 4,
                    description: "Blockchain Security",
                    materials: [
                        "Blockchain Security Basics",
                        "Consensus Mechanisms"
                    ],
                    keyPoints: [
                        { topic: "Blockchain Security", definition: "Blockchain security involves the use of cryptographic techniques to secure data and transactions on the blockchain." },
                        { topic: "Consensus Mechanisms", definition: "Consensus mechanisms are protocols that consider a transaction legitimate and add it to the block." }
                    ],
                    youtubeLinks: [
                        { title: "Blockchain Security Tutorial", url: "https://www.youtube.com/watch?v=SSo_EIwHSd4" }
                    ]
                }
            ]
        }
    };

    // Load saved progress
    const savedProgress = JSON.parse(localStorage.getItem('courseProgress')) || {};

    courseDropdown.addEventListener('change', (event) => {
        const selectedCourse = event.target.value;
        if (selectedCourse && courses[selectedCourse]) {
            courseContent.style.display = 'block';
            courseContent.style.opacity = 0;
            setTimeout(() => {
                courseContent.style.opacity = 1;
                courseContent.style.transition = 'opacity 0.5s ease-in-out';
            }, 100);
            const levels = courses[selectedCourse].levels;
            levelPath.innerHTML = levels.map(level => `
                <div class="level" data-level="${level.level}">${level.level}</div>
            `).join('') + '<div class="path-line"></div>';
            contentDisplay.innerHTML = '';
            const completedLevels = savedProgress[selectedCourse] || 0;
            updateProgress(completedLevels, levels.length);
            document.querySelectorAll('.level').forEach((levelElement, index) => {
                levelElement.addEventListener('click', () => {
                    const level = levels.find(l => l.level == levelElement.dataset.level);
                    contentDisplay.innerHTML = `
                        <h3>Level ${level.level}: ${level.description}</h3>
                        <ul>
                            ${level.materials.map(material => `<li>${material}</li>`).join('')}
                        </ul>
                        <h4>Key Points:</h4>
                        <ul>
                            ${level.keyPoints.map(point => `<li><strong>${point.topic}:</strong> ${point.definition}</li>`).join('')}
                        </ul>
                        <h4>YouTube Resources:</h4>
                        <ul>
                            ${level.youtubeLinks.map(link => {
                                let videoId = link.url.split('v=')[1] || link.url.split('/').pop();
                                const ampersandPosition = videoId.indexOf('&');
                                if (ampersandPosition !== -1) {
                                    videoId = videoId.substring(0, ampersandPosition);
                                }
                                return `
                                    <li>
                                        <a href="${link.url}" target="_blank">
                                            <img src="https://img.youtube.com/vi/${videoId}/0.jpg" alt="${link.title}" style="width:120px; height:auto;">
                                            ${link.title}
                                        </a>
                                    </li>
                                `;
                            }).join('')}
                        </ul>
                        <button id="next-level">Next Level</button>
                    `;
                    // Update progress only if advancing to a new level
                    if (index + 1 > completedLevels) {
                        savedProgress[selectedCourse] = index + 1;
                        localStorage.setItem('courseProgress', JSON.stringify(savedProgress));
                        updateProgress(index + 1, levels.length);
                    }

                    // Add navigation to next level
                    const nextLevelButton = document.getElementById('next-level');
                    if (index + 1 < levels.length) {
                        nextLevelButton.addEventListener('click', () => {
                            document.querySelector(`.level[data-level="${index + 2}"]`).click();
                        });
                    } else {
                        nextLevelButton.textContent = "Course Completed!";
                        nextLevelButton.disabled = true;
                    }
                });
            });
        } else {
            courseContent.style.opacity = 0;
            setTimeout(() => {
                courseContent.style.display = 'none';
            }, 500);
            contentDisplay.innerHTML = '';
            updateProgress(0, 1);
        }
    });

    function updateProgress(completedLevels, totalLevels) {
        const percentage = (completedLevels / totalLevels) * 100;
        progressBar.value = percentage;
        progressPercentage.textContent = `${Math.round(percentage)}%`;
    }
}); 