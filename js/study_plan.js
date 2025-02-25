let semesters = [];

// Study Plan Data Structure
const studyPlans = {
    'computer-science': {
        name: 'Computer Science',
        description: 'A comprehensive program focusing on software development, algorithms, and computing systems.',
        totalCredits: 30,
        semesterPlans: [
            {
                semester: 'Spring 2025',
                courses: [
                    { code: 'CS301', name: 'Database Systems', credits: 3, type: 'core' },
                    { code: 'CS350', name: 'Software Engineering', credits: 3, type: 'core' },
                    { code: 'CS315', name: 'Web Development', credits: 3, type: 'general' },
                    // { code: 'PHYS121', name: '', credits: 4, type: 'core' }
                ],
                skillsFocus: ['Problem Solving', 'Basic Programming', 'Analytical Thinking'],
                recommendations: {
                    certifications: ['Python Programming Certificate'],
                    activities: ['Join Coding Club', 'Participate in Programming Contests']
                }
            },
            {
                semester: 'Fall 2025',
                courses: [
                    { code: 'CS201', name: 'Data Structures', credits: 3, type: 'core' },
                    { code: 'MATH142', name: 'Calculus II', credits: 3, type: 'core' },
                    { code: 'CS220', name: 'Computer Architecture', credits: 3, type: 'core' },
                    // { code: 'PHYS122', name: 'Physics for Scientists II', credits: 4, type: 'core' }
                ],
                skillsFocus: ['Data Structures', 'Algorithm Design', 'System Architecture'],
                recommendations: {
                    certifications: ['Java SE Programming'],
                    activities: ['Start Personal Coding Projects', 'Hackathons']
                }
            },
            // Add more semesters...
        ],
        careerPath: {
            internships: [
                { year: 2, suggestion: 'Software Development Intern' },
                { year: 3, suggestion: 'Full Stack Developer Intern' }
            ],
            certifications: [
                'AWS Certified Developer',
                'Oracle Java Certification',
                'Microsoft Azure Fundamentals'
            ],
            careerOptions: [
                'Software Engineer',
                'Full Stack Developer',
                'Systems Architect',
                'DevOps Engineer'
            ]
        }
    },
    // Add more majors...
};

function addSemester() {
    const semester = {
        id: Date.now(),
        courses: []
    };
    
    semesters.push(semester);
    renderSemesters();
}

function renderSemesters() {
    const semesterList = document.getElementById('semesterList');
    semesterList.innerHTML = semesters.map(semester => `
        <div class="semester-container mb-4" id="semester-${semester.id}">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h3>Semester ${semesters.indexOf(semester) + 1}</h3>
                <button class="btn btn-outline-danger btn-sm" 
                        onclick="removeSemester(${semester.id})">
                    Remove Semester
                </button>
            </div>
            <div class="course-list" ondrop="dropCourse(event)" 
                 ondragover="allowDrop(event)">
                ${renderCourses(semester.courses)}
            </div>
            <button class="btn btn-outline-primary btn-sm mt-2" 
                    onclick="addCourse(${semester.id})">
                Add Course
            </button>
        </div>
    `).join('');
}

function renderCourses(courses) {
    return courses.map(course => `
        <div class="course-item p-2 mb-2 bg-light rounded" 
             draggable="true" ondragstart="dragCourse(event)" 
             id="course-${course.id}">
            <div class="d-flex justify-content-between align-items-center">
                <span>${course.name}</span>
                <span class="badge bg-secondary">${course.credits} credits</span>
            </div>
        </div>
    `).join('');
}

function addCourse(semesterId) {
    const semester = semesters.find(s => s.id === semesterId);
    if (semester) {
        const course = {
            id: Date.now(),
            name: 'New Course',
            credits: 3
        };
        semester.courses.push(course);
        renderSemesters();
    }
}

function removeSemester(semesterId) {
    semesters = semesters.filter(s => s.id !== semesterId);
    renderSemesters();
}

// Drag and drop functionality
function dragCourse(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function dropCourse(event) {
    event.preventDefault();
    const courseId = event.dataTransfer.getData('text/plain');
    const courseElement = document.getElementById(courseId);
    const targetSemester = event.target.closest('.course-list');
    
    if (targetSemester && courseElement) {
        targetSemester.appendChild(courseElement);
    }
}

// Initialize the first semester
document.addEventListener('DOMContentLoaded', function() {
    addSemester();
});

// Function to render study plan
function renderStudyPlan(majorId) {
    const plan = studyPlans[majorId];
    if (!plan) return;

    const planContainer = document.getElementById('studyPlanContainer');
    planContainer.innerHTML = `
        <div class="study-plan-header">
            <h2>${plan.name} Study Plan</h2>
            <p class="lead">${plan.description}</p>
            <div class="credits-info">
                <span class="badge bg-primary">Total Credits: ${plan.totalCredits}</span>
            </div>
        </div>
        
        <div class="semester-timeline">
            ${plan.semesterPlans.map(semester => `
                <div class="semester-block">
                    <h3>Semester ${semester.semester}</h3>
                    <div class="courses-grid">
                        ${semester.courses.map(course => `
                            <div class="course-card ${course.type}">
                                <h4>${course.code}</h4>
                                <p>${course.name}</p>
                                <span class="credits">${course.credits} credits</span>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="semester-recommendations">
                        <div class="skills-focus">
                            <h5>Skills Focus</h5>
                            <ul>
                                ${semester.skillsFocus.map(skill => `
                                    <li>${skill}</li>
                                `).join('')}
                            </ul>
                        </div>
                        
                        <div class="recommendations">
                            <h5>Recommended Activities</h5>
                            <ul>
                                ${semester.recommendations.activities.map(activity => `
                                    <li>${activity}</li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="career-path-section">
            <h3>Career Development Path</h3>
            <div class="career-grid">
                <div class="internships">
                    <h4>Recommended Internships</h4>
                    <ul>
                        ${plan.careerPath.internships.map(internship => `
                            <li>Year ${internship.year}: ${internship.suggestion}</li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="certifications">
                    <h4>Professional Certifications</h4>
                    <ul>
                        ${plan.careerPath.certifications.map(cert => `
                            <li>${cert}</li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="career-options">
                    <h4>Career Options</h4>
                    <ul>
                        ${plan.careerPath.careerOptions.map(career => `
                            <li>${career}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
} 