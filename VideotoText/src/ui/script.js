document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let summaryHistory = [];
    const progressBar = document.getElementById('progress-fill');
    const statusText = document.getElementById('status-text');
    const generateBtn = document.getElementById('generate-btn');
    const historyToggle = document.getElementById('history-toggle');
    
    // Event Listeners
    generateBtn.addEventListener('click', handleGenerate);
    historyToggle.addEventListener('click', toggleHistory);
    
    async function handleGenerate() {
        const videoUrl = document.getElementById('video-url').value;
        const startTime = document.getElementById('start-time').value;
        const endTime = document.getElementById('end-time').value;

        if (!videoUrl) {
            showError('Please enter a YouTube video URL');
            return;
        }
        
        try {
            showProgress();
            
            // Call backend API
            const response = await fetch('http://localhost:5000/api/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    videoUrl,
                    startTime,
                    endTime
                })
            });

            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.error);
            }

            // Hide progress and show summary
            hideProgress();
            showSummary(data.summary);
            
            // Add to history
            addToHistory(videoUrl);
            
        } catch (error) {
            hideProgress();
            showError(error.message);
        }
    }
    
    async function processVideo(url) {
        const steps = [
            { status: '📥 Downloading video...', progress: 20 },
            { status: '🎯 Transcribing audio...', progress: 40 },
            { status: '📝 Extracting relevant text...', progress: 60 },
            { status: '✨ Generating summary...', progress: 80 },
            { status: 'Complete', progress: 100 }
        ];
        
        for (const step of steps) {
            await simulateProgress(step.status, step.progress);
        }
    }
    
    function simulateProgress(status, progress) {
        return new Promise(resolve => {
            statusText.textContent = status;
            progressBar.style.width = `${progress}%`;
            setTimeout(resolve, 1000);
        });
    }
    
    function showProgress() {
        document.getElementById('progress-container').classList.remove('hidden');
        generateBtn.disabled = true;
    }
    
    function hideProgress() {
        document.getElementById('progress-container').classList.add('hidden');
        generateBtn.disabled = false;
    }
    
    function showSummary(text) {
        const container = document.getElementById('summary-container');
        const content = document.getElementById('summary-content');
        container.classList.remove('hidden');
        content.textContent = text;
    }
    
    function showError(message) {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = `⚠️ ${message}`;
        document.getElementById('summary-container').after(error);
        
        setTimeout(() => error.remove(), 5000);
    }
    
    function addToHistory(url) {
        const summary = {
            url,
            summary: document.getElementById('summary-content').textContent,
            timestamp: new Date().toLocaleString()
        };
        
        summaryHistory.unshift(summary);
        updateHistoryDisplay();
    }
    
    function updateHistoryDisplay() {
        const historyContent = document.getElementById('history-content');
        historyContent.innerHTML = '';
        
        summaryHistory.forEach((item, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <strong>Video ${summaryHistory.length - index}</strong><br>
                <em>URL: ${item.url}</em><br>
                <em>Generated on: ${item.timestamp}</em>
                <div class="success-message">${item.summary}</div>
            `;
            historyContent.appendChild(historyItem);
        });
    }
    
    function toggleHistory() {
        const historyContent = document.getElementById('history-content');
        historyContent.classList.toggle('hidden');
    }
}); 