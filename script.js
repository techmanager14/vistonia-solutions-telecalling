document.addEventListener('DOMContentLoaded', function() {
    // Form handling
    const form = document.getElementById('applicationForm');
    const steps = form.querySelectorAll('.form-step');
    const nextButtons = form.querySelectorAll('.next-step');
    
    // Show first step by default
    steps[0].classList.add('active');
    
    // Handle next button clicks
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            const nextStep = currentStep.nextElementSibling;
            
            // Validate current step
            const inputs = currentStep.querySelectorAll('input[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff6b6b';
                    showError(input, 'This field is required / हे फील्ड आवश्यक आहे');
                } else {
                    input.style.borderColor = '#ddd';
                    removeError(input);
                }
            });
            
            if (isValid) {
                currentStep.classList.remove('active');
                nextStep.classList.add('active');
                // Scroll to the next step
                nextStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to your server
        console.log('Form submitted:', data);
        
        // Show success message with WhatsApp option
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <h3>Thank you for your application! / अर्जासाठी धन्यवाद!</h3>
            <p>We will contact you soon. For immediate response, chat with us on WhatsApp.</p>
            <p>आम्ही लवकरच तुमच्याशी संपर्क साधू. लगेच प्रतिसादासाठी WhatsApp वर चॅट करा.</p>
            <button class="whatsapp-button-large">WhatsApp वर Chat करा</button>
        `;
        
        form.innerHTML = '';
        form.appendChild(successMessage);
        
        // Add success message styles
        const style = document.createElement('style');
        style.textContent = `
            .success-message {
                text-align: center;
                padding: 20px;
            }
            .success-message h3 {
                color: #ff6b6b;
                margin-bottom: 15px;
            }
            .success-message p {
                margin-bottom: 20px;
            }
        `;
        document.head.appendChild(style);
    });
    
    // WhatsApp buttons
    const whatsappButtons = document.querySelectorAll('.whatsapp-button-large, .whatsapp-button-small, .cta-button.secondary');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            const phoneNumber = 'XXXXXXXXXX'; // Replace with your WhatsApp number
            const message = 'Hi, I am interested in the Telecaller position at Vistonia Solutions. / मी Vistonia Solutions मध्ये Telecaller पोझिशनसाठी इंटरेस्टेड आहे.';
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    });
    
    // Apply Now buttons
    const applyButtons = document.querySelectorAll('.cta-button.primary, .apply-now-small .cta-button');
    applyButtons.forEach(button => {
        button.addEventListener('click', function() {
            document.querySelector('.lead-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
    
    // Form validation helpers
    function showError(input, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
    }
    
    function removeError(input) {
        const errorDiv = input.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    // Add error message styles
    const errorStyle = document.createElement('style');
    errorStyle.textContent = `
        .error-message {
            color: #ff6b6b;
            font-size: 0.8rem;
            margin-top: -15px;
            margin-bottom: 15px;
        }
    `;
    document.head.appendChild(errorStyle);
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Add fade-in class to CSS
    const style = document.createElement('style');
    style.textContent = `
        section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        section.fade-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Add WhatsApp floating button
    const whatsappButton = document.createElement('a');
    whatsappButton.href = 'https://wa.me/XXXXXXXXXX'; // Replace with your WhatsApp number
    whatsappButton.className = 'whatsapp-button';
    whatsappButton.innerHTML = '<i class="fab fa-whatsapp"></i>';
    whatsappButton.target = '_blank';
    document.body.appendChild(whatsappButton);
    
    // Add WhatsApp button styles
    const whatsappStyle = document.createElement('style');
    whatsappStyle.textContent = `
        .whatsapp-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #25d366;
            color: white;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30px;
            box-shadow: 0 5px 15px rgba(37, 211, 102, 0.4);
            transition: transform 0.3s ease;
            z-index: 1000;
        }
        
        .whatsapp-button:hover {
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(whatsappStyle);
    
    // Handle mobile menu
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.appendChild(menuButton);
    
    // Add mobile menu styles
    const mobileMenuStyle = document.createElement('style');
    mobileMenuStyle.textContent = `
        .mobile-menu-button {
            display: none;
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff6b6b;
            color: white;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        @media (max-width: 768px) {
            .mobile-menu-button {
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    `;
    document.head.appendChild(mobileMenuStyle);
}); 