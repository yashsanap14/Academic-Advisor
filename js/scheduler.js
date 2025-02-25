let courses = [];
let scheduleGrid = null;

// Spring 2025 Schedule Data
const springSchedule = {
    semester: 'Spring 2025',
    courses: [
        {
            code: 'CS301',
            name: 'Database Systems',
            instructor: 'Dr. Anderson',
            schedule: {
                days: ['Monday', 'Wednesday'],
                time: '10:00 AM - 11:15 AM',
                room: 'TECH 305'
            },
            color: '#e3f2fd' // Light blue
        },
        {
            code: 'CS315',
            name: 'Web Development',
            instructor: 'Prof. Martinez',
            schedule: {
                days: ['Tuesday', 'Thursday'],
                time: '2:00 PM - 3:15 PM',
                room: 'TECH 205'
            },
            color: '#fff3e0' // Light orange
        },
        {
            code: 'CS350',
            name: 'Software Engineering',
            instructor: 'Dr. Wilson',
            schedule: {
                days: ['Monday', 'Wednesday'],
                time: '1:00 PM - 2:15 PM',
                room: 'TECH 401'
            },
            color: '#e8f5e9' // Light green
        }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    scheduleGrid = document.getElementById('scheduleGrid');
    initializeSchedule();
});

// Initialize schedule display
function initializeSchedule() {
    const timeSlots = generateTimeSlots();
    
    // Create schedule header
    const header = document.createElement('div');
    header.className = 'schedule-header';
    header.innerHTML = `<h2>${springSchedule.semester} Schedule</h2>`;
    scheduleGrid.appendChild(header);
    
    // Create weekly calendar
    const calendar = document.createElement('div');
    calendar.className = 'calendar-grid';
    
    // Add time column
    const timeColumn = createTimeColumn(timeSlots);
    calendar.appendChild(timeColumn);
    
    // Add day columns
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    days.forEach(day => {
        const dayColumn = createDayColumn(day, timeSlots);
        calendar.appendChild(dayColumn);
    });
    
    scheduleGrid.appendChild(calendar);
    
    // Add courses to schedule
    addCoursesToSchedule();
}

function generateTimeSlots() {
    const slots = [];
    for (let hour = 8; hour <= 17; hour++) {
        const time = hour < 12 ? `${hour}:00 AM` : `${hour === 12 ? 12 : hour - 12}:00 PM`;
        slots.push(time);
    }
    return slots;
}

function createTimeColumn(timeSlots) {
    const column = document.createElement('div');
    column.className = 'time-column';
    column.innerHTML = `
        <div class="column-header">Time</div>
        ${timeSlots.map(time => `
            <div class="time-slot">${time}</div>
        `).join('')}
    `;
    return column;
}

function createDayColumn(day, timeSlots) {
    const column = document.createElement('div');
    column.className = 'day-column';
    column.innerHTML = `
        <div class="column-header">${day}</div>
        ${timeSlots.map(time => `
            <div class="schedule-cell" data-day="${day}" data-time="${time}"></div>
        `).join('')}
    `;
    return column;
}

function addCoursesToSchedule() {
    springSchedule.courses.forEach(course => {
        course.schedule.days.forEach(day => {
            const [startTime] = course.schedule.time.split(' - ');
            const cell = document.querySelector(
                `.schedule-cell[data-day="${day}"][data-time="${startTime}"]`
            );
            
            if (cell) {
                const courseBlock = document.createElement('div');
                courseBlock.className = 'course-block';
                courseBlock.style.backgroundColor = course.color;
                courseBlock.innerHTML = `
                    <div class="course-info">
                        <strong>${course.code}</strong>
                        <div>${course.name}</div>
                        <small>${course.schedule.room}</small>
                        <small>${course.instructor}</small>
                    </div>
                `;
                cell.appendChild(courseBlock);
            }
        });
    });
}

function addCourse() {
    const modal = new bootstrap.Modal(document.getElementById('courseModal'));
    modal.show();
}

function saveCourse() {
    const form = document.getElementById('courseForm');
    const courseName = document.getElementById('courseName').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].filter(day => 
        document.getElementById(`btn${day}`).checked
    );

    const course = {
        id: Date.now(),
        name: courseName,
        days: days,
        startTime: startTime,
        endTime: endTime
    };

    courses.push(course);
    updateSchedule();
    bootstrap.Modal.getInstance(document.getElementById('courseModal')).hide();
}

function updateSchedule() {
    // Clear existing schedule
    document.querySelectorAll('.schedule-cell').forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('has-course');
    });

    // Add courses to schedule
    courses.forEach(course => {
        course.days.forEach(day => {
            const startHour = parseInt(course.startTime.split(':')[0]);
            const endHour = parseInt(course.endTime.split(':')[0]);
            
            for (let hour = startHour; hour < endHour; hour++) {
                const cell = document.querySelector(
                    `.schedule-cell[data-day="${day}"][data-hour="${hour}"]`
                );
                if (cell) {
                    cell.innerHTML = course.name;
                    cell.classList.add('has-course');
                }
            }
        });
    });

    updateCourseList();
}

function updateCourseList() {
    const courseList = document.getElementById('selectedCourses');
    courseList.innerHTML = courses.map(course => `
        <div class="course-item p-2 mb-2 bg-light rounded">
            <div class="d-flex justify-content-between align-items-center">
                <span>${course.name}</span>
                <button class="btn btn-sm btn-danger" onclick="removeCourse(${course.id})">
                    Remove
                </button>
            </div>
            <small class="text-muted">
                ${course.days.join(', ')} | ${course.startTime} - ${course.endTime}
            </small>
        </div>
    `).join('');
}

function removeCourse(courseId) {
    courses = courses.filter(c => c.id !== courseId);
    updateSchedule();
} 