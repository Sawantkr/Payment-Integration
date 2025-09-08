# Razorpay Payment Integration Demo

This is a simple demo project showing how to integrate **Razorpay** payment gateway using **React (Vite + TailwindCSS)** for the frontend and **Node.js + Express** for the backend.  
The project works end-to-end: creating an order, opening Razorpay Checkout, and verifying the payment on the server.

---

## 🚀 Features
- User enters an amount and clicks **Pay Now**.
- Backend creates a Razorpay order and returns `order_id`.
- Razorpay Checkout popup opens for secure payment.
- After payment, backend verifies the signature with the secret key.
- Displays **Success ✅** or **Failure ❌** message to the user.

---

## 🛠 Tech Stack
- **Frontend:** React (Vite) + TailwindCSS  
- **Backend:** Node.js + Express + Razorpay SDK  
- **Deployment:** Render (Frontend + Backend)  

---

## 🚀 Payment Gateway Chosen

• **Gateway Used:** Razorpay  
• **Why Razorpay?**  
   ➝ Widely used in India (supports INR, UPI, cards, net banking)  
   ➝ Very easy Checkout popup integration for frontend  
   ➝ Official Node.js SDK for backend  
   ➝ Test mode available (safe to try without real money)  
   ➝ Secure flow with **server-side signature verification**  

---

## 🔁 Data Flow (Input ➝ Process ➝ Output)

1. **Input (Frontend)**  
   • User enters `amount` (e.g., 100 INR)  
   • Frontend ➝ sends request to backend to create order  

2. **Process (Backend + Razorpay)**  
   • Backend ➝ calls **Razorpay Orders API** with amount (in paise)  
   • Razorpay ➝ responds with `order_id`  
   • Frontend ➝ opens Razorpay Checkout popup using that `order_id`  
   • User ➝ enters payment details (Card/UPI/NetBanking)  

3. **Output (Verification & Result)**  
   • Razorpay ➝ returns `payment_id`, `order_id`, `signature` to frontend  
   • Frontend ➝ sends these to backend for verification  
   • Backend ➝ generates HMAC SHA256 signature with `RAZORPAY_KEY_SECRET`  
   • If match ➝ ✅ Payment Verified  
   • Else ➝ ❌ Verification Failed  

---

## 🧩 Challenges Faced & Solutions

• **API Keys Security**  
   ➝ Solved by using `.env` files locally and environment variables on Render/Vercel.  

• **CORS Errors**  
   ➝ Fixed using `cors()` middleware in Express backend.  

• **Frontend-Backend URL Issues after Deploy**  
   ➝ Solved by setting correct `VITE_BACKEND_URL` and clearing build cache before redeploy.  

• **Tailwind/PostCSS Errors**  
   ➝ Fixed by correcting `postcss.config.js` and installing required plugins.  

• **Signature Verification Failure**  
   ➝ Solved by ensuring correct concatenation of `order_id | payment_id` before hashing with HMAC.  

• **Deployment Typos / Wrong Root Folder**  
   ➝ Fixed by double-checking `package.json` scripts, root directory, and env variable spelling.  

