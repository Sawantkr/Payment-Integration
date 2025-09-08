import React, { useState } from "react";
const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const PaymentForm = () => {
  const [amount, setAmount] = useState("100");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setStatus("");
    setLoading(true);
    setStatus("Creating order...");
    try {
      const res = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Math.round(parseFloat(amount) * 100) }), 
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to create order");

      const { order, key } = data || {};

      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: "Demo Corp",
        description: "Test Transaction",
        order_id: order.id,
        handler: async (response) => {
          setStatus("Verifying payment...");
          try {
            const verifyRes = await fetch("http://localhost:5000/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.valid) {
              setStatus("✅ Payment verified successfully! Payment ID: " + response.razorpay_payment_id);
            } else {
              setStatus("❌ Payment verification failed.");
            }
          } catch (err) {
            setStatus("Error verifying payment: " + err.message);
          } finally {
            setLoading(false);
          }
        },
        modal: { escape: true },
        theme: { color: "#4F46E5" }, 
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setStatus("Error: " + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-800">Complete Payment</h2>
            <p className="text-sm text-slate-500">Secure test payment using Razorpay sandbox</p>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-full">
              Test Mode
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm text-slate-600">Amount (INR)</label>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-2 bg-slate-100 rounded-l-md text-slate-700 border border-r-0 border-slate-200">₹</span>
            <input
              type="number"
              min="1"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 px-4 py-2 rounded-r-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="Amount in INR"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500">
              Payable: <span className="font-medium text-slate-800">₹{isNaN(parseFloat(amount)) ? "0.00" : (+amount).toFixed(2)}</span>
            </div>
            <div className="text-sm text-slate-500">No real charge in test mode</div>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg shadow-md bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold hover:opacity-95 disabled:opacity-60"
          >
            {loading ? (
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="60" strokeLinecap="round" fill="none" />
              </svg>
            ) : null}
            <span>{loading ? "Processing..." : "Pay Now"}</span>
          </button>

          <div className="text-sm min-h-[1.5rem]">
            {status && (
              <div className="px-3 py-2 rounded-md text-sm" >
                <span className={`inline-block ${status.startsWith("✅") ? "text-green-700 bg-green-50" : status.startsWith("❌") ? "text-red-700 bg-red-50" : "text-slate-800 bg-slate-50"} px-3 py-2 rounded-md`}>{status}</span>
              </div>
            )}
          </div>

          <div className="pt-3 text-xs text-slate-400">
            Use Razorpay test cards (e.g., <span className="font-medium">4111 1111 1111 1111</span>) with any future expiry and any CVV.
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-white/80">
        <p>Powered by - Trinity Packaging Co. Pvt. Ltd</p>
      </div>
    </div>
  );
};

export default PaymentForm;
