// 12 Months mapped to Chapter 6 of Preach My Gospel attributes
const monthlyData = [
  { id: 0, name: "January", attribute: "Faith in Jesus Christ", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600" },
  { id: 1, name: "February", attribute: "Hope", img: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=600" },
  { id: 2, name: "March", attribute: "Charity", img: "https://images.unsplash.com/photo-1469571486040-4b9b1a4a751f?w=600" },
  { id: 3, name: "April", attribute: "Love", img: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600" },
  { id: 4, name: "May", attribute: "Virtue", img: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600" },
  { id: 5, name: "June", attribute: "Knowledge", img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600" },
  { id: 6, name: "July", attribute: "Patience", img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600" },
  { id: 7, name: "August", attribute: "Humility", img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600" },
  { id: 8, name: "September", attribute: "Diligence", img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600" },
  { id: 9, name: "October", attribute: "Obedience", img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600" },
  { id: 10, name: "November", attribute: "Integrity", img: "https://images.unsplash.com/photo-1455734729978-db1ae4f687fc?w=600" },
  { id: 11, name: "December", attribute: "Service", img: "https://images.unsplash.com/photo-1559027615-cd4428a633a0?w=600" }
];

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("months-grid");
  const currentMonthIdx = new Date().getMonth(); // 0-11 based on live time

  // Re-order array so current month details are extracted, and remainder drops below
  const currentMonthData = monthlyData.find(m => m.id === currentMonthIdx);
  
  // Sort remainder sequentially moving forward chronologically from next month
  const remainderMonths = [];
  for (let i = 1; i <= 11; i++) {
    const nextIdx = (currentMonthIdx + i) % 12;
    remainderMonths.push(monthlyData.find(m => m.id === nextIdx));
  }

  // 1. Render Current Month (Large Featured Square)
  const heroCard = document.createElement("button");
  heroCard.className = "tile month-card current-month";
  heroCard.innerHTML = `
    <div class="hero-image" style="background-image: url('${currentMonthData.img}')"></div>
    <div class="current-content">
      <div class="month-name">${currentMonthData.name} (Current)</div>
      <div class="attribute-label">Focus Attribute</div>
      <div class="month-attribute">${currentMonthData.attribute}</div>
    </div>
  `;
  grid.appendChild(heroCard);

  // 2. Render the rest of the queue
  remainderMonths.forEach(m => {
    const card = document.createElement("button");
    card.className = "tile month-card";
    card.innerHTML = `
      <span class="month-name">${m.name}</span>
      <span class="month-attribute">${m.attribute}</span>
    `;
    grid.appendChild(card);
  });
});

// Navigation actions
function openAgenda() {
  document.getElementById("agenda-page").classList.remove("hidden");
  window.scrollTo(0, 0);
}

function closeAgenda() {
  document.getElementById("agenda-page").classList.add("hidden");
}

// Service Worker Registration for PWA capacity
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js")
      .then(reg => console.log("Service Worker registered successfully"))
      .catch(err => console.log("Service Worker registration failed: ", err));
  });
}
