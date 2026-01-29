// Wait for the page to fully load before running our code
document.addEventListener('DOMContentLoaded', function() {
    
    // Get the contact form from the page
    const contactForm = document.querySelector('.contact-form form');
    
    // Get the splash screen element
    const splashScreen = document.getElementById('splash-screen');
    
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
        
        // Open the email client in the background
        window.location.href = mailtoLink;
        
        // Clear the form fields
        contactForm.reset();
        
        // Hide the splash screen after 4 seconds (gives time to see the fill animation)
        setTimeout(function() {
            splashScreen.classList.remove('active');
        }, 4000);
    });
});
