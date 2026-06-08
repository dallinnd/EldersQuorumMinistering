// 12 Months mapped to Chapter 6 of Preach My Gospel attributes
const monthlyData = [
  { id: 0, name: "January", attribute: "Faith in Jesus Christ" },
  { id: 1, name: "February", attribute: "Hope" },
  { id: 2, name: "March", attribute: "Charity" },
  { id: 3, name: "April", attribute: "Love" },
  { id: 4, name: "May", attribute: "Virtue" },
  { id: 5, name: "June", attribute: "Knowledge" },
  { id: 6, name: "July", attribute: "Patience" },
  { id: 7, name: "August", attribute: "Humility" },
  { id: 8, name: "September", attribute: "Diligence" },
  { id: 9, name: "October", attribute: "Obedience" },
  { id: 10, name: "November", attribute: "Integrity" },
  { id: 11, name: "December", attribute: "Service" }
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
  const heroLink = document.createElement("a");
  heroLink.href = `${currentMonthData.name.toLowerCase()}.html`;
  heroLink.className = "tile month-card current-month";
  heroLink.style.textDecoration = "none";

  // Construct the filename dynamically: "picture_" + "january" + ".png"
  const imgPath = `picture_${currentMonthData.name.toLowerCase()}.png`;

  heroLink.innerHTML = `
    <div class="hero-image" style="background-image: url('${imgPath}')"></div>
    <div class="current-content">
      <div class="month-name">${currentMonthData.name} (Current)</div>
      <div class="attribute-label">Focus Attribute</div>
      <div class="month-attribute">${currentMonthData.attribute}</div>
    </div>
  `;
  grid.appendChild(heroLink);

  // 2. Render the rest of the queue
  // Inside your render loop:
  remainderMonths.forEach(m => {
    const link = document.createElement("a");
    // Assuming file names are lowercase: january.html, february.html, etc.
    link.href = `${m.name.toLowerCase()}.html`; 
    link.className = "tile month-card";
    link.style.textDecoration = "none"; // Clean up link look
    link.innerHTML = `
      <span class="month-name">${m.name}</span>
      <span class="month-attribute">${m.attribute}</span>
    `;
    grid.appendChild(link);
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
