document.addEventListener("DOMContentLoaded", () => {
  const paymentForm = document.getElementById("paymentForm");
  const billingForm = document.getElementById("billingForm");
  const cardNumberInput = document.getElementById("cardNumber");
  const toast = document.getElementById("toast");
  const methodButtons = document.querySelectorAll(".pay-method");
  const cardSection = document.getElementById("cardSection");
  const paypalSection = document.getElementById("paypalSection");

  // Read plan from query string: payment.html?plan=premium3000
  const params = new URLSearchParams(window.location.search);
  const plan = params.get("plan") || "premium3000";
  const planNameEl = document.getElementById("planName");
  const planPriceEl = document.getElementById("planPrice");

  const planMap = {
    beginner: { name: "Beginner Plan", price: "Rs. 2000 / Month" },
    premium3000: { name: "Premium Plan", price: "Rs. 3000 / Month" },
    premium5000: { name: "Premium Plan", price: "Rs. 5000 / Month" }
  };

  const currentPlan = planMap[plan] || planMap.premium3000;
  planNameEl.textContent = currentPlan.name;
  planPriceEl.textContent = currentPlan.price;

  // Format card number as 1234 5678 ...
  cardNumberInput.addEventListener("input", () => {
    let value = cardNumberInput.value.replace(/\D/g, "").slice(0, 16);
    const parts = [];
    for (let i = 0; i < value.length; i += 4) {
      parts.push(value.slice(i, i + 4));
    }
    cardNumberInput.value = parts.join(" ");
  });

  // Toggle payment method UI
  methodButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      methodButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const method = btn.dataset.method;
      if (method === "card") {
        cardSection.classList.remove("hidden");
        paypalSection.classList.add("hidden");
      } else {
        cardSection.classList.add("hidden");
        paypalSection.classList.remove("hidden");
      }
    });
  });

  // Simple validation + fake submit
  paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Basic billing validation (required attribute already helps)
    if (!billingForm.checkValidity()) {
      alert("Please fill in all required billing details.");
      return;
    }

    const activeMethod = document.querySelector(".pay-method.active").dataset.method;

    if (activeMethod === "card") {
      const card = cardNumberInput.value.replace(/\s/g, "");
      const mm = document.getElementById("expMonth").value.trim();
      const yy = document.getElementById("expYear").value.trim();
      const cvv = document.getElementById("cvv").value.trim();

      if (card.length !== 16 || !/^\d+$/.test(card)) {
        alert("Please enter a valid 16‑digit card number.");
        return;
      }

      if (!(+mm >= 1 && +mm <= 12)) {
        alert("Please enter a valid expiry month (01–12).");
        return;
      }

      if (yy.length !== 2 || !/^\d+$/.test(yy)) {
        alert("Please enter a valid expiry year (YY).");
        return;
      }

      if (cvv.length < 3 || cvv.length > 4 || !/^\d+$/.test(cvv)) {
        alert("Please enter a valid CVV.");
        return;
      }
    } else {
      // For PayPal demo, no extra validation
    }

    // Demo success
    showToast(`Payment successful for ${currentPlan.name}!`);
    // In a real app you would send data to your backend here.
  });

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
  }
});
