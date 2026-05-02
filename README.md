Team Task Manager (Full-Stack)
A robust, full-stack task management application designed for teams to organize projects, assign tasks, and track progress in real-time. Built with a modern tech stack and deployed for high availability.

🚀 Live Demo
Live Application URL: https://project-production-126f.up.railway.app

API Endpoint: https://project-production-126f.up.railway.app/api/dashboard

✨ Key Features
User Authentication: Secure Signup/Login using Supabase Auth.

Dynamic Dashboard: Real-time metrics for Total Tasks, To Do, In Progress, Done, and Overdue tasks.

Task Management: Full CRUD operations for creating and assigning tasks.

Automatic Status Tracking: Backend logic to automatically flag overdue tasks based on due dates.

Role-Based Structure: Architected to support Admin and Member roles.

🛠️ Tech Stack
Frontend: React.js, Axios

Backend: Node.js, Express.js

Database: PostgreSQL (via Supabase)

Deployment: Railway (CI/CD via GitHub)

📁 Project Structure
Plaintext
/server
 
  ├── index.js          # Entry point & API routes
  
  ├── routes/           # Express route handlers (auth, tasks, projects)
  
  └── /client           # React Frontend
  
        ├── src/
        
        │    ├── components/ # Dashboard, Login, CreateTask
        
        │    ├── api.js      # Axios production configuration
        
        │    └── App.js      # Routing and state logic


⚙️ Installation & Setup



Clone the repository:
 
 git clone https://github.com/abhinavch1234/project.git




Setup Backend:

cd server
npm install
npm start

Setup Frontend:

cd client
npm install
npm start

🌐 Deployment Note
The application is deployed on Railway. The frontend is configured to communicate with the production API endpoint, ensuring a seamless experience across local and live environments.

Developed by Abhinav
