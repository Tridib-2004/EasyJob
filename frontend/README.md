# EasyJob 🚀

EasyJob is a modern full-stack job portal web application that connects job seekers with recruiters. The platform allows users to search and apply for jobs, while employers can post and manage job listings efficiently.

---

## ✨ Features

### 👨‍💼 Job Seeker Features

* User authentication & authorization
* Create and manage profile
* Upload resume
* Browse and search jobs
* Apply for jobs online
* Track job applications
* Responsive UI for all devices

### 🏢 Recruiter Features

* Recruiter authentication
* Post new job opportunities
* Manage job listings
* View applicants
* Delete or update jobs

### 🔐 Authentication & Security

* JWT-based authentication
* Protected routes
* Cookie-based session handling
* Password hashing

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Redux Toolkit
* React Router DOM
* Axios
* CSS
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Cookie Parser
* CORS
* Cloudinary (for resume/profile upload)

---

## 📂 Project Structure

```bash
EasyJob/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/easyjob.git
cd easyjob
```

---

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
COOKIE_EXPIRE=7
FRONTEND_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Run backend server:

```bash
npm run dev
```

---

### 3️⃣ Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

Backend runs on:

```bash
http://localhost:4000
```

---

## 📸 Screenshots

Add your project screenshots here.

```md
![Home Page](./screenshots/home.png)
![Jobs Page](./screenshots/jobs.png)
![Dashboard](./screenshots/dashboard.png)
```

---

## 🔄 API Endpoints

### User Routes

| Method | Endpoint         | Description      |
| ------ | ---------------- | ---------------- |
| POST   | `/user/register` | Register user    |
| POST   | `/user/login`    | Login user       |
| GET    | `/user/logout`   | Logout user      |
| GET    | `/user/getuser`  | Get current user |

### Job Routes

| Method | Endpoint          | Description  |
| ------ | ----------------- | ------------ |
| GET    | `/job/getall`     | Get all jobs |
| POST   | `/job/post`       | Post new job |
| DELETE | `/job/delete/:id` | Delete job   |

### Application Routes

| Method | Endpoint                | Description          |
| ------ | ----------------------- | -------------------- |
| POST   | `/application/post/:id` | Apply for job        |
| GET    | `/application/getall`   | Get all applications |

---

## 🌟 Future Improvements

* Job recommendation system
* Email notifications
* Interview scheduling
* Admin dashboard
* Real-time chat system
* AI-powered resume screening

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Tridib Bag**

* GitHub: [https://github.com/your-username](https://github.com/your-username)
* LinkedIn: [https://linkedin.com/in/your-profile](https://linkedin.com/in/your-profile)

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub.
