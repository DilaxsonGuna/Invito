document.addEventListener('DOMContentLoaded', () => {
    // --- Set your target date and time ---
    // The target is September 26, 2025, 6:00 PM (18:00) Toronto time (EDT, which is UTC-4)
    // We convert this to UTC for a universal countdown calculation.
    // 2025-09-26 18:00:00 EDT (UTC-4) -> 2025-09-26 22:00:00 UTC
    const targetDate = new Date('2025-09-26T22:00:00Z'); // 'Z' indicates UTC

    // Get elements to update
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const italyTimeEl = document.getElementById('italy-time');
    const canadaTimeEl = document.getElementById('canada-time');

    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    function updateCountdown() {
        const now = new Date(); // Current time in user's local timezone
        const nowUtc = now.getTime(); // Current time in milliseconds since epoch (UTC)

        const difference = targetDate.getTime() - nowUtc;

        // Check if the countdown has ended
        if (difference <= 0) {
            clearInterval(countdownInterval);
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            document.querySelector('.title').textContent = "It's Our Special Day!";
            document.querySelector('.event-description').textContent = "The moment is here!";
            document.querySelector('.footer-note').textContent = "Enjoy every moment together!";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        daysEl.textContent = formatTime(days);
        hoursEl.textContent = formatTime(hours);
        minutesEl.textContent = formatTime(minutes);
        secondsEl.textContent = formatTime(seconds);
    }

    function updateLocalTimes() {
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false // Use 24-hour format
        };

        // For Italy (Europe/Rome)
        const italyTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Europe/Rome', ...options });
        italyTimeEl.textContent = italyTime;

        // For Canada (America/Toronto)
        const canadaTime = new Date().toLocaleTimeString('en-US', { timeZone: 'America/Toronto', ...options });
        canadaTimeEl.textContent = canadaTime;
    }

    // Initial call to set the countdown and times immediately
    updateCountdown();
    updateLocalTimes();

    // Update every second
    const countdownInterval = setInterval(updateCountdown, 1000);
    const timeUpdateInterval = setInterval(updateLocalTimes, 1000); // Also update local times every second
});
