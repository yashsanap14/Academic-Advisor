// Counter Animation with Intersection Observer
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.counter');
    
    const animateCounter = (counter, target) => {
        let current = 0;
        const increment = target / 200; // Smoother animation
        const duration = 2000; // 2 seconds
        const step = duration / 200; // Update every 10ms
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, step);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };

    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                observer.unobserve(counter); // Only animate once
            }
        });
    }, { threshold: 0.3 });

    // Observe all counters
    counters.forEach(counter => {
        observer.observe(counter);
    });
}); 