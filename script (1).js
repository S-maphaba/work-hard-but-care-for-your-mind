document.addEventListener('DOMContentLoaded', function() {
    const timerElement = document.getElementById('timer');
    const affirmationElement = document.getElementById('affirmation');
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    const intervalInput = document.getElementById('interval');
    
    let seconds = 0;
    let timerInterval;
    let affirmationInterval;
    let isRunning = false;
    
    const affirmations = [
        "You are capable and strong! 💪",
        "Take a deep breath. You've got this! 🌸",
        "You're making great progress! 🌟",
        "Be kind to yourself today. 💖",
        "Every moment is a fresh beginning. 🌿",
        "You are enough, just as you are. 🌼",
        "This time is a gift to yourself. 🎁",
        "You're creating positive energy! ✨",
        "Mindfulness brings peace. 🕊️",
        "You deserve this time for you. 💐"
    ];
    
    function formatTime(seconds) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    function updateTimer() {
        seconds++;
        timerElement.textContent = formatTime(seconds);
    }
    
    function showRandomAffirmation() {
        const randomIndex = Math.floor(Math.random() * affirmations.length);
        affirmationElement.textContent = affirmations[randomIndex];
        
        // Add animation
        affirmationElement.style.transform = 'scale(1.1)';
        affirmationElement.style.opacity = '1';
        
        setTimeout(() => {
            affirmationElement.style.transform = 'scale(1)';
        }, 500);
    }
    
    function startTimer() {
        if (isRunning) return;
        
        isRunning = true;
        startBtn.textContent = 'Pause';
        
        // Update timer every second
        timerInterval = setInterval(updateTimer, 1000);
        
        // Show affirmations at intervals
        const intervalMinutes = parseInt(intervalInput.value) || 5;
        const intervalMs = intervalMinutes * 60 * 1000;
        
        showRandomAffirmation();
        affirmationInterval = setInterval(showRandomAffirmation, intervalMs);
    }
    
    function pauseTimer() {
        isRunning = false;
        startBtn.textContent = 'Resume';
        clearInterval(timerInterval);
        clearInterval(affirmationInterval);
    }
    
    function resetTimer() {
        pauseTimer();
        seconds = 0;
        timerElement.textContent = formatTime(seconds);
        startBtn.textContent = 'Start Session';
        affirmationElement.textContent = "Ready for a mindful session?";
    }
    
    startBtn.addEventListener('click', function() {
        if (isRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
    });
    
    resetBtn.addEventListener('click', resetTimer);
    
    // Initial