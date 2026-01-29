// Wait for the page to fully load before running our code
document.addEventListener('DOMContentLoaded', function() {
    
    // Get the contact form from the page
    const contactForm = document.querySelector('.contact-form form');
    
    // Get the splash screen element
    const splashScreen = document.getElementById('splash-screen');
    
    // Function to generate wavy top edge for water
    function generateWavyClipPath() {
        const width = window.innerWidth;
        const waveHeight = 20; // Height of each wave
        const wavelength = 80; // Width of each wave cycle
        let points = ['0% 100%'];
        
        // Create wavy top edge
        for (let x = 0; x <= width; x += wavelength / 4) {
            const percentage = (x / width) * 100;
            // Alternate between up and down for wave effect
            const wave = Math.sin((x / wavelength) * Math.PI * 2) * waveHeight;
            points.push(`${percentage}% ${100 - (wave / window.innerHeight) * 100}%`);
        }
        
        points.push('100% 100%');
        return `polygon(${points.join(', ')})`;
    }
    
    // Update wave animation - create flowing effect
    function animateWaves() {
        if (splashScreen.classList.contains('active')) {
            const clipPath = generateWavyClipPath();
            splashScreen.style.setProperty('--water-clip-path', clipPath);
            requestAnimationFrame(animateWaves);
        }
    }

        // Back to Top button functionality
        // This code makes the page scroll to the top when the button is clicked
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    
    // When the form is submitted, run this function
    contactForm.addEventListener('submit', function(event) {
        // Stop the form from doing its normal action
        event.preventDefault();
        
        // Get the values from the form
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Create the email content
        const subject = 'New Contact Form Message from ' + name;
        const body = 'Name: ' + name + '\n' +
                     'Email: ' + email + '\n' +
                     'Message: ' + message;
        
        // Create mailto link (opens email client)
        const mailtoLink = 'mailto:wrigh4zx@dukes.jmu.edu' +
                          '?subject=' + encodeURIComponent(subject) +
                          '&body=' + encodeURIComponent(body);
        
        // Show the orange splash screen (starts filling animation)
        splashScreen.classList.add('active');
        
        // Get the message element
        const messageElement = splashScreen.querySelector('.success-message');
        
        // Simulate filling the water with waves
        let fillPercentage = 0;
        const fillInterval = setInterval(function() {
            fillPercentage += 2;
            if (fillPercentage <= 100) {
                splashScreen.style.setProperty('--water-height', fillPercentage + '%');
            } else {
                clearInterval(fillInterval);
                // Show the message after water is fully filled
                if (messageElement) {
                    messageElement.style.opacity = '1';
                    messageElement.style.display = 'block';
                }
                // Open the email client after message is shown
                setTimeout(function() {
                    window.location.href = mailtoLink;
                }, 500);
            }
        }, 30);
        
        // Start wave animation
        animateWaves();
        
        // Clear the form fields
        contactForm.reset();
        
        // Hide the splash screen after 5 seconds (gives time to see the fill animation and message)
        setTimeout(function() {
            splashScreen.classList.remove('active');
            // Hide the message when splash screen closes
            if (messageElement) {
                messageElement.style.display = 'none';
            }
        }, 5000);
    });

    // Listen for form submission
    contactForm.addEventListener('submit', function(event) {
        // Prevent default form submission temporarily to show animation
        event.preventDefault();

        // Prevent multiple animations at once
        if (isAnimating) return;
        isAnimating = true;

        // Show splash screen
        splashScreen.classList.add('active');

        // Create raindrops
        createRaindrops();

        // Animate water filling up
        animateWaterFill();

        // After animation completes, submit the form
        setTimeout(function() {
            // Add 'complete' class to show success message
            splashScreen.classList.add('complete');
            // Stop creating new raindrops
            rainContainer.innerHTML = '';
            
            // Actually submit the form after animation
            setTimeout(function() {
                contactForm.submit();
            }, 2000);
        }, ANIMATION_DURATION);
    });
});
