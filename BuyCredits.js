import { useState } from "react";

export default function BuyCredits() {
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    const res = await fetch("/api/payment", { method: "POST" });
    const data = await res.json();
    if (data.id) {
      window.location.href = `https://checkout.stripe.com/pay/${data.id}`;
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <button onClick={handleBuy} disabled={loading}>
        {loading ? "Redirection…" : "Acheter 6 questions (1 €)"}
      </button>
    </div>
  );
}
