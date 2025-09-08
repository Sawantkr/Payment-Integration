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

┌─────────────────────────────────────────────────────────────┐
│                      🔒 Payment Gateway                      │
├─────────────────────────────────────────────────────────────┤
│ **Chosen API / Gateway:** Razorpay                           │
│ **Why Razorpay?**                                            │
│ - Strong coverage in India (INR-native, UPI/cards/netbanking)│
│ - Simple Checkout popup (fast integration for frontend)      │
│ - Official SDKs for Node/JS and client-side documentation    │
│ - Supports test mode (test cards) for development            │
│ - Server-side signature verification for secure flow         │
│ **Short summary:** Good fit for India-focused demos/apps —   │
│ easy to implement, test, and secure.                         │
└─────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────┐
│                      🔁 Data Flow & Notes                   │
├─────────────────────────────────────────────────────────────┤
│ **Flow (Input → Process → Output)**     
                     │
│ 1. **Input (Frontend):** User enters `amount` (INR)          │
│    → frontend sends request to backend to create order.      │
│ 2. **Process (Backend):**                                     │
│    • Backend calls Razorpay API `orders.create({amount})`     │
│      and returns `order_id` to frontend.                     │
│    • Frontend opens Razorpay Checkout with `order_id`.       │
│    • User enters card/UPI details in popup (Razorpay handles │
│      sensitive data).                                        │
│ 3. **Razorpay → Frontend:** Returns `razorpay_payment_id`,   │
│    `razorpay_order_id`, `razorpay_signature`.                │
│ 4. **Verification (Backend):** Frontend sends those values to │
│    backend → backend recreates HMAC SHA256 signature using   │
│    `RAZORPAY_KEY_SECRET` and compares.                       │
│ 5. **Output:** If signatures match → **Payment verified ✅**; │
│    else → **Verification failed ❌**                          │
│                                                               │
│ **Key fields passed around:**                                 │
│ - `amount` (paise on backend), `order_id`, `payment_id`,      │
│   `signature`                                                 │
│                                                               │
│ **Challenges Faced & How We Solved Them**                     │
│ - **API keys security** → Never commit keys. Use `.env` and   │
│   platform environment variables (Render/Vercel).            │
│ - **CORS errors** → Add `cors()` middleware in Express.       │
│ - **URL after deploy (frontend→backend)** → Use `VITE_BACKEND_URL`│
│   and set correct environment variable in hosting; clear cache│
│   & redeploy.                                                │
│ - **Tailwind/PostCSS errors** → Fix `postcss.config.js`,      │
│   install missing PostCSS plugins and correct `content` paths.│
│ - **Signature verification mismatch** → Verify order_id/payment│
│   concatenation format and use `crypto.createHmac('sha256',   │
│   secret).update(order_id + '|' + payment_id).digest('hex')` │
│ - **Deployment typos / wrong root** → Check deploy root,     │
│   package.json scripts and environment variable names.       │
└─────────────────────────────────────────────────────────────┘

