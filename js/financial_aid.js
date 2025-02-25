let currentStep = 1;
const totalSteps = 4;

document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
    setupCheckboxListeners();
});

function updateProgress() {
    const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
    
    // Update step indicators
    document.querySelectorAll('.step').forEach(step => {
        const stepNum = parseInt(step.dataset.step);
        step.classList.toggle('active', stepNum <= currentStep);
        step.classList.toggle('completed', stepNum < currentStep);
    });
}

function nextStep() {
    if (currentStep < totalSteps) {
        // Hide current step
        document.querySelector(`#step${currentStep}`).style.display = 'none';
        
        currentStep++;
        
        // Show next step
        const nextStepElement = document.querySelector(`#step${currentStep}`);
        if (nextStepElement) {
            nextStepElement.style.display = 'block';
        }
        
        updateProgress();
    }
}

function previousStep() {
    if (currentStep > 1) {
        // Hide current step
        document.querySelector(`#step${currentStep}`).style.display = 'none';
        
        currentStep--;
        
        // Show previous step
        document.querySelector(`#step${currentStep}`).style.display = 'block';
        updateProgress();
    }
}

function setupCheckboxListeners() {
    document.querySelectorAll('.checklist input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const stepChecklist = this.closest('.checklist');
            const allChecked = Array.from(stepChecklist.querySelectorAll('input[type="checkbox"]'))
                .every(cb => cb.checked);
            
            const nextButton = this.closest('.step-section')
                .querySelector('.btn-primary');
            
            if (nextButton) {
                nextButton.disabled = !allChecked;
            }
        });
    });
}

function validateStep(stepNumber) {
    // Add validation logic for each step
    switch(stepNumber) {
        case 1:
            return validateFAFSA();
        case 2:
            return validateScholarships();
        case 3:
            return validateLoans();
        case 4:
            return validateReview();
        default:
            return true;
    }
}

function validateFAFSA() {
    const checkboxes = document.querySelectorAll('#step1 input[type="checkbox"]');
    return Array.from(checkboxes).every(cb => cb.checked);
}

// Add more validation functions for other steps as needed 