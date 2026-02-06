// Infinite Campus Data Handler
// Extracts data from IC portal since Canvas API doesn't exist

const ICDataHandler = {
    
    // Extract grades from IC grade table
    extractGrades: function() {
        const gradesData = [];
        const gradeTable = document.querySelector('table#grades_summary, table.grades-table, .grades tbody');
        
        if (!gradeTable) {
            console.log('[IC Handler] No grade table found');
            return [];
        }
        
        const rows = gradeTable.querySelectorAll('tr');
        rows.forEach((row, index) => {
            if (index === 0) return; // Skip header
            
            const cells = row.querySelectorAll('td');
            if (cells.length >= 4) {
                const courseName = cells[0]?.textContent.trim();
                const teacher = cells[1]?.textContent.trim();
                const period = cells[2]?.textContent.trim();
                const gradeText = cells[3]?.textContent.trim();
                
                // Parse percentage
                const gradeMatch = gradeText.match(/(\d+\.?\d*)%?/);
                const gradePercent = gradeMatch ? parseFloat(gradeMatch[1]) : null;
                
                if (courseName && gradePercent !== null) {
                    gradesData.push({
                        id: `ic_course_${index}`,
                        name: courseName,
                        teacher: teacher,
                        period: period,
                        grade: gradePercent,
                        gradeDisplay: gradeText
                    });
                }
            }
        });
        
        console.log(`[IC Handler] Found ${gradesData.length} courses with grades`);
        return gradesData;
    },
    
    // Extract schedule information
    extractSchedule: function() {
        const scheduleData = [];
        const scheduleTable = document.querySelector('table.schedule, .schedule tbody');
        
        if (!scheduleTable) {
            console.log('[IC Handler] No schedule table found');
            return [];
        }
        
        const rows = scheduleTable.querySelectorAll('tr');
        rows.forEach((row, index) => {
            if (index === 0) return; // Skip header
            
            const cells = row.querySelectorAll('td');
            if (cells.length >= 3) {
                scheduleData.push({
                    period: cells[0]?.textContent.trim(),
                    time: cells[1]?.textContent.trim(),
                    course: cells[2]?.textContent.trim(),
                    room: cells[3]?.textContent.trim() || ''
                });
            }
        });
        
        console.log(`[IC Handler] Found ${scheduleData.length} schedule items`);
        return scheduleData;
    },
    
    // Extract assignment data
    extractAssignments: function() {
        const assignmentsData = [];
        const assignmentTable = document.querySelector('.assignments table, .assignment-table');
        
        if (!assignmentTable) {
            console.log('[IC Handler] No assignment table found');
            return [];
        }
        
        const rows = assignmentTable.querySelectorAll('tr');
        rows.forEach((row, index) => {
            if (index === 0) return; // Skip header
            
            const cells = row.querySelectorAll('td');
            if (cells.length >= 3) {
                assignmentsData.push({
                    name: cells[0]?.textContent.trim(),
                    dueDate: cells[1]?.textContent.trim(),
                    score: cells[2]?.textContent.trim(),
                    points: cells[3]?.textContent.trim() || ''
                });
            }
        });
        
        console.log(`[IC Handler] Found ${assignmentsData.length} assignments`);
        return assignmentsData;
    },
    
    // Get student info from page
    extractStudentInfo: function() {
        const header = document.querySelector('.header h1, .portal-header h1, .student-name');
        const school = document.querySelector('.header p, .school-name');
        
        return {
            name: header?.textContent.trim() || 'Student',
            school: school?.textContent.trim() || 'School'
        };
    },
    
    // Calculate GPA from extracted grades
    calculateGPA: function(grades, weightConfig = {}) {
        if (!grades || grades.length === 0) return null;
        
        let totalPoints = 0;
        let totalCredits = 0;
        let weightedPoints = 0;
        
        grades.forEach(course => {
            const grade = course.grade;
            if (grade === null || isNaN(grade)) return;
            
            const credits = weightConfig[course.id]?.credits || 1;
            const weight = weightConfig[course.id]?.weight || 'regular';
            
            // Convert percentage to 4.0 scale
            let gpaPoints = 0;
            if (grade >= 90) gpaPoints = 4.0;
            else if (grade >= 80) gpaPoints = 3.0;
            else if (grade >= 70) gpaPoints = 2.0;
            else if (grade >= 60) gpaPoints = 1.0;
            else gpaPoints = 0;
            
            // Apply weights
            let weightMultiplier = 0;
            if (weight === 'ap') weightMultiplier = 1.0;
            else if (weight === 'honors') weightMultiplier = 0.5;
            
            totalPoints += gpaPoints * credits;
            weightedPoints += (gpaPoints + weightMultiplier) * credits;
            totalCredits += credits;
        });
        
        return {
            unweighted: totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00',
            weighted: totalCredits > 0 ? (weightedPoints / totalCredits).toFixed(2) : '0.00'
        };
    },
    
    // Check if we're on IC portal
    isInfiniteCampusPage: function() {
        return window.location.hostname.includes('infinitecampus.org') ||
               window.location.hostname.includes('forsyth.k12.ga.us');
    },
    
    // Detect page type
    getPageType: function() {
        if (window.location.pathname.includes('grade')) return 'grades';
        if (window.location.pathname.includes('schedule')) return 'schedule';
        if (window.location.pathname.includes('attendance')) return 'attendance';
        if (window.location.pathname.includes('assignment')) return 'assignments';
        return 'dashboard';
    }
};

// Export for use in content.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ICDataHandler;
}
