import React from "react";
import PaymentForm from "./components/PaymentForm";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-violet-700 to-sky-700">
    <div className="container mx-auto px-6 py-12">
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <div className="hidden md:block">
    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
    <h1 className="text-4xl font-extrabold text-white mb-4">Razorpay Payment Demo</h1>
    <p className="text-slate-200/90">
    Quick sandbox payment flow built with React + Tailwind. Enter an amount and hit <strong>Pay Now</strong> to open Razorpay Checkout.
    </p>
    <ul className="mt-6 text-sm text-slate-200 space-y-2">
    <li>• Server creates order (paise)</li>
    <li>• Client opens checkout with returned order id</li>
    <li>• Server verifies HMAC signature after payment</li>
    </ul>
    </div>
    </div>

    <div className="flex justify-center">
    <PaymentForm />
    </div>
    </div>
    </div>
    </div>
  );
}

export default App;
