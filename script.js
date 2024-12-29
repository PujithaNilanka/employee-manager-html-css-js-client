// Function to fetch employee data from the API
async function fetchEmployees() {
  try {
    const response = await fetch('http://localhost:8080/employee/all');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const employees = await response.json();
    displayEmployees(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    alert('Failed to load employees');
  }
}

// Function to display the employee list in the HTML
function displayEmployees(employees) {
  const employeeList = document.getElementById('employee-list');
  employeeList.innerHTML = ''; // Clear any previous data

  employees.forEach(employee => {
    const li = document.createElement('li');
    li.classList.add('employee-item');
    li.innerHTML = `
      <p><strong>ID:</strong> ${employee.id}</p>
      <p><strong>Name:</strong> ${employee.name}</p>
      <p><strong>Email:</strong> ${employee.email}</p>
    `;
    employeeList.appendChild(li);
  });
}

// Call the fetchEmployees function when the page loads
window.onload = fetchEmployees;

