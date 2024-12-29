BASIC APP WITH DOCKER


I have a REST API that returns an array of employee JSON objects with id, name and email fields. This API can be called with GET http://localhost:8080/employee/all. I want a single page frontend web application written in any programming language that can display a list of employee objects returned in the REST API call. this web frontend application must be containarized to docker.

To create a single-page frontend web application that displays a list of employee objects from the provided REST API and is containerized with Docker, we can break down the solution into several steps:
1. Frontend Application: We’ll use HTML, CSS, and JavaScript (with Fetch API to get data from the API).
2. Containerization: The frontend will be containerized using Docker to run inside a container.

Step 1: Create the Frontend Application
We'll create a simple HTML, CSS, and JavaScript-based web app that fetches data from http://localhost:8080/employee/all and displays it on the page.
Directory Structure
employee-manager-html-css-js-client/
│
├── Dockerfile
├── index.html
├── script.js
└── styles.css
index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Employee List</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Employee List</h1>
    <ul id="employee-list">
      <!-- Employee items will be inserted here dynamically -->
    </ul>
  </div>
  <script src="script.js"></script>
</body>
</html>
styles.css
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
}

.container {
width: 80%;
margin: 0 auto;
padding: 20px;
}

h1 {
text-align: center;
margin-bottom: 20px;
}

#employee-list {
list-style-type: none;
padding: 0;
}

.employee-item {
background-color: #fff;
border: 1px solid #ddd;
margin-bottom: 10px;
padding: 10px;
border-radius: 4px;
}

.employee-item p {
margin: 5px 0;
}
script.js
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

Step 2: Create the Dockerfile
Now, we’ll create a Dockerfile to containerize this web application.
Dockerfile
# Use an official Nginx image as the base image
FROM nginx:alpine

# Copy the frontend files into the Nginx default HTML directory
COPY . /usr/share/nginx/html

# Expose port 80 to allow traffic to the container
EXPOSE 80

Step 3: Build and Run the Docker Container
1. Navigate to the frontend directory where the Dockerfile is located.
2. Build the Docker image:  docker build -t employee-frontend . 
3. Run the Docker container:  docker run -d -p 8081:80 employee-frontend  This command will run the frontend web application on port 8081 of your local machine, and it will be accessible via http://localhost:8081. 
Step 4: Testing the Application
    Once the container is running, open a browser and navigate to:
    http://localhost:8081
    The application should load, fetch employee data from http://localhost:8080/employee/all, and display it in a list format.

Step 5: Notes
* CORS: If your REST API is running on a different port (like 8080), ensure that your API server allows cross-origin requests (CORS). You might need to configure your backend to include appropriate CORS headers.
* Error Handling: In the JavaScript, we’ve added basic error handling for fetching the data. You might want to enhance this based on your needs.
* Deployment: For production, you can deploy the Docker container to platforms like AWS, Azure, or Google Cloud, or on your local server.

Final Thoughts
This is a simple, minimal setup for building and containerizing a frontend web application that consumes a REST API. It can be easily extended with frameworks like React or Vue.js if more interactivity or advanced features are required. Let me know if you need help with those!

