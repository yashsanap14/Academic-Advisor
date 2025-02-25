const questions = [
    {
        text: "What type of work environment do you prefer?",
        options: [
            { text: "Technical and analytical", value: "tech" },
            { text: "Business and organizational", value: "business" },
            { text: "People-focused and helping others", value: "people" }
        ]
    },
    {
        text: "Which skill set interests you the most?",
        options: [
            { text: "Problem-solving and logical thinking", value: "tech" },
            { text: "Leadership and strategic planning", value: "business" },
            { text: "Understanding human behavior", value: "people" }
        ]
    },
    {
        text: "What type of projects do you enjoy?",
        options: [
            { text: "Building and coding solutions", value: "tech" },
            { text: "Managing teams and resources", value: "business" },
            { text: "Helping and counseling others", value: "people" }
        ]
    }
];

const majorRecommendations = {
    'tech': {
        name: "Computer Science",
        description: "Design software, solve complex problems, and develop innovative technologies.",
        careers: "Software Developer, Systems Architect, AI Engineer",
        marketTrend: "trend-up",
        trendText: "High Demand",
        icon: "bi-laptop"
    },
    'business': {
        name: "Business Administration",
        description: "Learn to manage organizations, lead teams, and make strategic decisions.",
        careers: "Business Manager, Entrepreneur, Project Manager",
        marketTrend: "trend-up",
        trendText: "Growing Field",
        icon: "bi-graph-up"
    },
    'people': {
        name: "Psychology",
        description: "Study human behavior, mental processes, and help improve people's lives.",
        careers: "Counselor, Therapist, Research Psychologist",
        marketTrend: "trend-up",
        trendText: "Stable Demand",
        icon: "bi-people"
    }
};

let currentQuestion = 0;
let answers = [];
let selectedForComparison = [];

document.addEventListener('DOMContentLoaded', function() {
    displayQuestion(currentQuestion);
    updateProgress();
});

function displayQuestion(index) {
    const question = questions[index];
    document.getElementById('questionText').textContent = question.text;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = question.options.map((option, i) => `
        <button class="btn btn-outline-primary option-btn ${answers[index] === option.value ? 'selected' : ''}"
                onclick="selectOption('${option.value}')"
                data-bs-toggle="tooltip"
                title="Click to select this option">
            ${option.text}
        </button>
    `).join('');

    // Initialize tooltips
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach(tooltip => new bootstrap.Tooltip(tooltip));
}

function selectOption(value) {
    answers[currentQuestion] = value;
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
        if (btn.textContent.trim() === questions[currentQuestion].options.find(opt => opt.value === value).text) {
            btn.classList.add('selected');
        }
    });
}

function nextQuestion() {
    if (!answers[currentQuestion]) {
        alert('Please select an option before proceeding.');
        return;
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion(currentQuestion);
    } else {
        showResults();
    }
    updateProgress();
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion(currentQuestion);
    }
    updateProgress();
}

function updateProgress() {
    const progress = ((currentQuestion) / (questions.length - 1)) * 100;
    document.getElementById('quizProgress').style.width = `${progress}%`;
    
    document.getElementById('prevBtn').style.display = currentQuestion > 0 ? 'block' : 'none';
    document.getElementById('nextBtn').textContent = currentQuestion === questions.length - 1 ? 'Show Results' : 'Next';
}

function showResults() {
    // Hide quiz, show results
    document.getElementById('questionContainer').style.display = 'none';
    document.getElementById('prevBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('resultsContainer').style.display = 'block';

    // Show answer summary
    displayAnswerSummary();

    // Calculate and display recommendations
    const recommendations = calculateRecommendations();
    displayRecommendations(recommendations);
}

function displayAnswerSummary() {
    const summaryList = document.getElementById('answerSummary');
    summaryList.innerHTML = questions.map((q, i) => `
        <li class="list-group-item">
            <strong>${q.text}</strong><br>
            Your answer: ${q.options.find(opt => opt.value === answers[i]).text}
        </li>
    `).join('');
}

function calculateRecommendations() {
    // Always return all three majors, but order them based on user's answers
    const counts = { tech: 0, business: 0, people: 0 };
    answers.forEach(answer => counts[answer]++);
    
    // Sort majors by count but always include all three
    const recommendations = [
        { type: 'tech', count: counts.tech },
        { type: 'business', count: counts.business },
        { type: 'people', count: counts.people }
    ].sort((a, b) => b.count - a.count);
    
    return recommendations.map(rec => ({
        name: majorRecommendations[rec.type].name,
        description: majorRecommendations[rec.type].description,
        careers: majorRecommendations[rec.type].careers,
        marketTrend: majorRecommendations[rec.type].marketTrend,
        trendText: majorRecommendations[rec.type].trendText,
        icon: majorRecommendations[rec.type].icon
    }));
}

function displayRecommendations(recommendations) {
    const container = document.getElementById('recommendedMajors');
    container.innerHTML = recommendations.map(major => `
        <div class="col-md-4">
            <div class="card h-100 major-card">
                <div class="card-body">
                    <div class="major-icon mb-3">
                        <i class="bi ${major.icon} fs-1"></i>
                    </div>
                    <h5 class="card-title">${major.name}</h5>
                    <p class="card-text">${major.description}</p>
                    <p class="text-muted small">Career Paths: ${major.careers}</p>
                    <div class="trend-indicator ${major.marketTrend}">
                        <i class="bi bi-arrow-up"></i> ${major.trendText}
                    </div>
                    <button class="btn btn-primary w-100 mt-3" 
                            onclick="selectMajor('${major.name}')"
                            data-bs-toggle="tooltip"
                            title="Click to select this major">
                        Select This Major
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function toggleComparison(majorName) {
    const index = selectedForComparison.indexOf(majorName);
    if (index === -1) {
        if (selectedForComparison.length >= 3) {
            alert('You can compare up to 3 majors at a time');
            return;
        }
        selectedForComparison.push(majorName);
    } else {
        selectedForComparison.splice(index, 1);
    }
    updateComparison();
}

function updateComparison() {
    const comparisonSection = document.querySelector('.comparison-section');
    if (selectedForComparison.length > 1) {
        comparisonSection.style.display = 'block';
        updateComparisonTable();
    } else {
        comparisonSection.style.display = 'none';
    }
}

function updateComparisonTable() {
    // Add comparison table logic here
    // This would include updating the table with major-specific data
}

function getMarketTrend(majorName) {
    // Simulate market trend data
    const trends = {
        'Computer Science': 'trend-up',
        'Data Science': 'trend-up',
        'Cybersecurity': 'trend-up',
        // Add more trends
    };
    return trends[majorName] || '';
}

function getMarketTrendText(majorName) {
    // Simulate trend text
    const trends = {
        'Computer Science': '<i class="bi bi-arrow-up"></i> High Demand',
        'Data Science': '<i class="bi bi-arrow-up"></i> Growing Field',
        'Cybersecurity': '<i class="bi bi-arrow-up"></i> Critical Need',
        // Add more trend texts
    };
    return trends[majorName] || '';
}

function selectMajor(majorName) {
    document.getElementById('selectedMajorName').textContent = majorName;
    const modal = new bootstrap.Modal(document.getElementById('majorModal'));
    modal.show();
}

function confirmMajor() {
    const majorName = document.getElementById('selectedMajorName').textContent;
    // Here you would typically save the selection to your backend
    alert(`Congratulations! You've selected ${majorName} as your major.`);
    window.location.href = 'study_plan.html'; // Redirect to study plan page
} 