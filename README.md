# 🧠 GUESS THE WORD – A Brain-Boosting Web Game (MERN)

Welcome to **"Guess The Word"** – a dynamic and addictive word-guessing game powered by the **MERN stack** and connected to a centralized API for persistent progress and enhanced gameplay features.

🌐 Live Demo: [gtw.iamabhi.tech](https://gtw.iamabhi.tech)

---

## 🎮 Game Mechanics

- 🔄 **Shuffled Words:** Get a jumbled word and guess the correct one!
- 💡 **Hints:** You get **3 hints per day**, refreshed daily.
- 💾 **Progress Persistence:** Your game state, hints used, and scores are stored via a central API.
- 🧠 **Challenge Yourself:** Limited attempts, strategic hint usage, and word difficulty progression.

---

## 🛠️ Built With

- **Frontend:** React + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB (with Mongoose)
- **Auth & State:** JWT, Redux/Zustand (if used), LocalStorage
- **Central API:** Shared backend handling user management, hint tracking, and game state

---

## 🚀 Getting Started

### Prerequisites

- Node.js & npm
- MongoDB instance (local/cloud)
- Environment variables configured (`.env`)

### Installation

```bash
# Clone the repo
git clone https://github.com/iamabhi0619/GUESS_THE_WORD.git
cd GUESS_THE_WORD

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

Run the App
# Start backend
cd server
npm run dev

# In a new terminal, start frontend
cd ../client
npm start
Visit: http://localhost:3000

🔐 Environment Variables
Backend (server/.env)

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongo_connection
JWT_SECRET=your_jwt_secret
Frontend (client/.env)

env
REACT_APP_API_URL=API url
🌟 Features
✅ Centralized Login & Progress Tracking

🔄 Daily Refreshing Hint Quota

📊 Scoreboard (Coming Soon)

👥 Multiplayer / Leaderboard Support (Future Scope)

🎨 Smooth UX with responsive design

📦 Folder Structure
GUESS_THE_WORD/
├── client/          # React frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       └── utils/
├── server/          # Express backend
│   ├── models/
│   ├── routes/
│   └── controllers/
└── README.md
📈 Future Improvements
🧑‍🤝‍🧑 Group Challenges / Tournaments

📱 PWA for mobile play

🔔 Notification System

🔄 Auto word refresh & timed sessions

🤝 Contributing
Fork this repo

Create a new branch: git checkout -b feature/awesome-feature

Commit your changes: git commit -m 'Added some awesome feature'

Push to the branch: git push origin feature/awesome-feature

Open a pull request

📄 License
Distributed under the MIT License.

👨‍💻 Author
Abhishek Kumar – @iamabhi0619

🧩 Level up your word skills one guess at a time.

yaml
---

Would you like me to generate this as a downloadable file too?

