# 📦 Donation Delivery App

**A group-based package delivery system built for efficient distribution of packages to families or individuals in need.**

## 🚀 Features

- **Group Delivery Management:** Assign delivery points to multiple groups.
- **Optimized Route Planning:** Use GraphHopper API for best route calculation.
- **Real-time Progress Tracking:** Track delivery status for each group.
- **Interactive Maps:** View optimized routes and delivery locations on the map.

---

## 🛠️ Tech Stack

- **Frontend:** React Native
- **Backend:** FastAPI
- **Database:** MongoDB
- **Routing Algorithm:** GraphHopper API
- **Network Optimization:** NetworkX
- **Containerization:** Docker Compose

---

## 🏗️ Project Structure

```
project/
├── backend/              # FastAPI backend
│   ├── main.py           # API routes for groups and locations
│   ├── requirements.txt  # Backend dependencies
│   └── Dockerfile         # Backend container configuration
├── frontend/             # React Native application
│   ├── components/       # UI components
│   └── App.js            # Main application entry
├── graphhopper_data/     # GraphHopper routing data
└── docker-compose.yml    # Container orchestration
```

---

## 🌐 API Endpoints

### **1. Group Management**

- `POST /groups` - Create a new group.
- `POST /groups/{group_id}/assign` - Assign delivery locations to a group.
- `GET /groups/{group_id}` - Fetch group details.

### **2. Delivery Status**

- `PUT /groups/{group_id}/update-status` - Update delivery status.
- `GET /groups/{group_id}/route` - Get optimized route for a group.

---

## ⚙️ Setup Instructions

### **1. Clone the Repository**

```bash
git clone https://github.com/your-username/donation-delivery-app.git
cd donation-delivery-app
```

### **2. Setup Environment Variables**

Create a `.env` file in the `backend/` directory:

```
GRAPHHOPPER_API_KEY=your-graphhopper-api-key
```

### **3. Run with Docker Compose**

```bash
docker-compose up --build
```

### **4. Access the Application**

- **FastAPI Backend:** [http://localhost:8000](http://localhost:8000)
- **API Documentation:** [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 📱 Frontend Usage

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the app:
   ```bash
   npx expo start
   ```
3. Scan the QR code with Expo Go on your mobile device.

---

## 🧩 Key Components

- **GroupDashboard:** Manage assigned delivery tasks.
- **MapWithRoute:** Display optimized routes for delivery points.
- **LocationTracker:** Track delivery status updates.

---

## 🎯 Future Enhancements

- **Authentication:** Secure user roles and group access.
- **Push Notifications:** Notify users of delivery updates.
- **Offline Mode:** Cache routes and locations.
- **Analytics Dashboard:** Visualize delivery efficiency.

---

## 🏅 Contributions

Feel free to contribute by submitting pull requests or reporting issues.

---

## 📄 License

This project is licensed under the MIT License.
