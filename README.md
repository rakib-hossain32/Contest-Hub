🚀 ContestHub - The Ultimate Creative Contest Platform



ContestHub is a modern, premium, and feature-rich platform that connects creative talents with contest organizers. Whether you are a designer, developer, or writer, ContestHub provides a seamless experience to participate, compete, and win exciting prizes.

🔗 Live Demo

🚀 Visit the Live Site: https://contest-hub-c7402.web.app/


✨ Key Features

Here are the standout features that make ContestHub a premium platform:

🎨 Premium Glassmorphism UI: A visually stunning interface featuring modern glassmorphism effects, animated floating blobs, and smooth gradients using Tailwind CSS.

📅 Dynamic Events Page: A robust event tracking system featuring a Calendar View and List View toggle, smart filtering by category, and visual indicators for upcoming vs. past events—built without heavy external libraries.

🏆 Success Stories & Motivation Hub: A dedicated section to inspire users featuring real winner testimonials, prize statistics, a masonry-style winner gallery, and embedded video interviews.

🔍 Advanced Search & Filtering: Real-time search functionality with category-based filtering (Design, Development, Writing, etc.) to find contests instantly.

📂 All Contests Feed: A comprehensive feed with tab-based category filtering and smooth transition animations, allowing users to browse all approved contests easily.

⏱️ Live Countdown Timers: Dynamic countdowns for every contest details page that automatically switch the status to "Contest Ended" when the deadline is reached.

📊 User & Admin Dashboard: A fully responsive dashboard with a sidebar navigation system, resource usage stats (Storage, Bandwidth), and profile management dropdowns.

🔐 Secure Authentication Guard: Protected routes ensure that only logged-in users can view sensitive contest details, register, or submit tasks.

📝 Seamless Submission Workflow: Integrated modal-based task submission system allowing registered users to submit project links or files effortlessly.

❓ Smart Help Center (FAQ): A searchable FAQ section with categorized questions and smooth accordion animations to resolve user queries instantly.

✨ Custom Animated Loaders: Unique, brand-aligned animated loaders (Orbital, Tech Pulse, Hexagon) for a polished and professional loading experience.

💵 Registration & Payment Simulation: A streamlined flow for users to register for contests and pay entry fees (simulated) to increase the participant count in real-time.

📱 Fully Responsive Design: 100% mobile-friendly layout ensuring a seamless experience across desktops, tablets, and smartphones.

🛠️ Tech Stack

This project was built using the following modern technologies:

Frontend: React.js (Vite)

Styling: Tailwind CSS

Animations: Framer Motion

Icons: Lucide React

Routing: React Router

💻 How to Run Locally

Follow these steps to run the project on your local machine:

Clone the repository:

git clone [https://github.com/rakib-hossain32/Contest-Hub](https://github.com/rakib-hossain32/Contest-Hub)


Navigate to the project directory:

cd contesthub


Install dependencies:

npm install
# or
yarn install


Start the development server:

npm run dev


Open your browser and visit http://localhost:5173 to see the app in action!


Made with ❤️ by [Rakib Hossain]

---

## 🏆 Review System API Design (MongoDB)

This section outlines the backend API structure for the Testimonial/Review system using the **Native MongoDB Driver**.

### 1. Data Schema (Document Structure)
```json
{
  "name": "User Display Name",
  "email": "user@example.com",
  "role": "User Role (e.g., Designer)",
  "content": "Review text details...",
  "avatar": "https://photo-url.com",
  "rating": 5,
  "status": "pending", 
  "createdAt": "2024-01-09T12:00:00Z"
}
```

### 2. Endpoints

#### **A. Submit a Review**
*   **Method:** `POST`
*   **Endpoint:** `/reviews`
*   **Security:** Private (Requires Token)
*   **Implementation (Native MongoDB):**
```javascript
app.post('/reviews', verifyToken, async (req, res) => {
    const review = req.body;
    review.status = 'pending'; // Default status for admin review
    review.createdAt = new Date();
    
    const result = await reviewsCollection.insertOne(review);
    res.send(result);
});
```

#### **B. Get Approved Reviews**
*   **Method:** `GET`
*   **Endpoint:** `/reviews`
*   **Implementation:**
```javascript
app.get('/reviews', async (req, res) => {
    const query = { status: 'approved' };
    const result = await reviewsCollection.find(query).toArray();
    res.send(result);
});
```

#### **C. Manage Reviews (Admin)**
*   **Method:** `PATCH`
*   **Endpoint:** `/reviews/:id`
*   **Implementation:**
```javascript
app.patch('/reviews/:id', verifyToken, verifyAdmin, async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const updateDoc = {
        $set: { status: 'approved' }
    };
    const result = await reviewsCollection.updateOne(filter, updateDoc);
    res.send(result);
});
```