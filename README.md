# 📦 Product Inventory Management System

A full-stack inventory management application featuring product search, filtering, inline editing, CSV import/export, and inventory change history tracking. Built as part of the Skillwise Full Stack Assignment.

## 🚀 Live Demo
- **Frontend (Netlify):** https://inventoryap.netlify.app/
- **Backend (Render):** https://inventory-appp-ucw7.onrender.com

---

## 🛠 Tech Stack
- **Frontend:** React.js, Axios, Lucide-React (Icons), CSS Modules
- **Backend:** Node.js, Express.js, Multer (File Upload), CSV-Parser
- **Database:** SQLite3 (File-based database)

---

## ✨ Features
1. **Product Management:**
   - View products with image, stock status (In Stock/Out of Stock), and details.
   - **Inline Editing:** Edit product details directly in the table without opening a new page.
   - **Search & Filter:** Real-time filtering by product name and category.
2. **Inventory Tracking:**
   - **History Log:** Click on any product to view a sidebar showing the history of stock changes (Old Stock vs New Stock, Timestamp).
3. **Data Handling:**
   - **CSV Import:** Bulk upload products via CSV.
   - **CSV Export:** Download current inventory as a CSV file.

---

## ⚙️ Local Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Sanchayanpersonal-07/inventory_app
cd inventory-app

2. Backend Setup
Navigate to the backend folder, install dependencies, and start the server.

cd backend
npm install
node server.js

3. Frontend Setup
Open a new terminal, navigate to the frontend folder, install dependencies, and start React.

cd frontend
npm install
npm start

📂 CSV Import Format
To test the Import feature, ensure your CSV file has the following headers:
name,unit,category,brand,stock,image
Example Data:
name,unit,category,brand,stock,image
iPhone 13,pcs,Electronics,Apple,15,
Nike Air Max,pair,Shoes,Nike,0,
Sony TV,pcs,Electronics,Sony,5,

⚠️ Deployment Note
Regarding SQLite on Render (Free Tier):
Since this project uses SQLite (a file-based database) and is deployed on Render's free tier, the database file (inventory.db) is ephemeral.
This means data resets whenever the server restarts or redeploys (approximately every 15 minutes of inactivity). This is expected behavior for file-based databases on containerized cloud services.
📝 API Endpoints
Method	Endpoint	Description
GET	/api/products	Get all products (supports ?search= and ?category=)
POST	/api/products/import	Upload CSV file to add products
GET	/api/products/export	Download products as CSV
PUT	/api/products/:id	Update product details
DELETE	/api/products/:id	Delete a product
GET	/api/products/:id/history	Get inventory log history