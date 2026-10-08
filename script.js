// ---------- Sample data (approximate, for demonstration only) ----------
const colleges = [
  { id: 1, name: "NIT Patna", city: "Patna", type: "Government", rating: 4.4, fees: 140000, established: 1886,
    courses: ["B.Tech", "M.Tech", "MBA"], about: "A national institute of technology known for strong engineering programs and campus placements." },
  { id: 2, name: "IIT Patna", city: "Patna", type: "Government", rating: 4.6, fees: 220000, established: 2008,
    courses: ["B.Tech", "M.Tech", "M.Sc"], about: "One of the newer IITs, located in Bihta, with a growing focus on research and technology." },
  { id: 3, name: "AIIMS Patna", city: "Patna", type: "Government", rating: 4.5, fees: 6000, established: 2012,
    courses: ["MBBS", "B.Sc Nursing"], about: "A premier medical institute offering MBBS and nursing programs with a large teaching hospital." },
  { id: 4, name: "Patna University", city: "Patna", type: "Government", rating: 4.0, fees: 10000, established: 1917,
    courses: ["B.A.", "B.Sc", "B.Com", "LLB"], about: "One of the oldest universities in the region, offering a wide range of arts, science and commerce programs." },
  { id: 5, name: "Patna Women's College", city: "Patna", type: "Government-aided", rating: 4.2, fees: 15000, established: 1940,
    courses: ["B.A.", "B.Sc", "B.Com", "BCA"], about: "An autonomous women's college known for academics, student activities and a green campus." },
  { id: 6, name: "Patna Medical College (PMCH)", city: "Patna", type: "Government", rating: 4.1, fees: 10000, established: 1925,
    courses: ["MBBS"], about: "A historic government medical college with a major teaching hospital in the heart of Patna." },
  { id: 7, name: "Chanakya National Law University", city: "Patna", type: "Government", rating: 4.2, fees: 160000, established: 2006,
    courses: ["BA LLB", "LLM"], about: "A state law university focused on legal education, moot courts and legal research." },
  { id: 8, name: "Muzaffarpur Institute of Technology", city: "Muzaffarpur", type: "Government", rating: 3.9, fees: 40000, established: 1954,
    courses: ["B.Tech", "M.Tech"], about: "A government engineering college serving North Bihar with several core engineering branches." },
  { id: 9, name: "Bhagalpur College of Engineering", city: "Bhagalpur", type: "Government", rating: 3.8, fees: 38000, established: 1960,
    courses: ["B.Tech"], about: "A state engineering college offering affordable technical education in the Bhagalpur region." },
  { id: 10, name: "Tilka Manjhi Bhagalpur University", city: "Bhagalpur", type: "Government", rating: 3.7, fees: 8000, established: 1960,
    courses: ["B.A.", "B.Sc", "B.Com", "MBA"], about: "A large public university with many affiliated colleges across the Bhagalpur area." },
  { id: 11, name: "Central University of South Bihar", city: "Gaya", type: "Government", rating: 4.0, fees: 20000, established: 2009,
    courses: ["M.A.", "M.Sc", "B.Ed"], about: "A central university offering postgraduate and research programs in science, humanities and education." },
  { id: 12, name: "Magadh University", city: "Bodh Gaya", type: "Government", rating: 3.8, fees: 8000, established: 1962,
    courses: ["B.A.", "B.Sc", "B.Com", "M.A."], about: "A public university near Bodh Gaya with a long record in arts and science education." },
  { id: 13, name: "Lalit Narayan Mithila University", city: "Darbhanga", type: "Government", rating: 3.6, fees: 7000, established: 1972,
    courses: ["B.A.", "B.Sc", "B.Com", "LLB"], about: "A university serving the Mithila region, known for studies in language, culture and humanities." }
];

// ---------- Grab page elements ----------
const grid = document.getElementById("collegeGrid");
const searchInput = document.getElementById("searchInput");
const cityFilter = document.getElementById("cityFilter");
const courseFilter = document.getElementById("courseFilter");
const resetBtn = document.getElementById("resetBtn");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const modalClose = document.getElementById("modalClose");

// ---------- Helpers ----------
function formatFees(amount) {
  return "\u20B9" + amount.toLocaleString("en-IN");
}

// Fill the city and course dropdowns from the data, so we never type them by hand
function fillDropdowns() {
  const cities = [...new Set(colleges.map(c => c.city))].sort();
  const courses = [...new Set(colleges.flatMap(c => c.courses))].sort();
  cities.forEach(city => cityFilter.add(new Option(city, city)));
  courses.forEach(course => courseFilter.add(new Option(course, course)));
}

// ---------- Show colleges on the page ----------
function renderColleges(list) {
  grid.innerHTML = list.map(c => `
    <article class="card">
      <div class="card-top">
        <h3>${c.name}</h3>
        <span class="rating">\u2605 ${c.rating}</span>
      </div>
      <p class="city">${c.city}, Bihar</p>
      <span class="badge">${c.type}</span>
      <div class="tags">${c.courses.map(course => `<span class="tag">${course}</span>`).join("")}</div>
      <p class="fees">Approx. fees: <strong>${formatFees(c.fees)}</strong> / year</p>
      <button class="btn-primary" data-id="${c.id}">View Details</button>
    </article>
  `).join("");

  emptyState.hidden = list.length > 0;
  resultCount.textContent = `Showing ${list.length} of ${colleges.length} colleges`;
}

// ---------- Search + filters work together ----------
function applyFilters() {
  const text = searchInput.value.trim().toLowerCase();
  const city = cityFilter.value;
  const course = courseFilter.value;

  const results = colleges.filter(c =>
    c.name.toLowerCase().includes(text) &&
    (city === "all" || c.city === city) &&
    (course === "all" || c.courses.includes(course))
  );
  renderColleges(results);
}

// ---------- Details modal ----------
function openModal(id) {
  const c = colleges.find(college => college.id === id);
  modalContent.innerHTML = `
    <h2 id="modalTitle">${c.name}</h2>
    <p class="city">${c.city}, Bihar</p>
    <p>${c.about}</p>
    <div class="detail-list">
      <div><span>College type</span><strong>${c.type}</strong></div>
      <div><span>Rating</span><strong>\u2605 ${c.rating} / 5</strong></div>
      <div><span>Approx. fees</span><strong>${formatFees(c.fees)} / year</strong></div>
      <div><span>Established</span><strong>${c.established}</strong></div>
    </div>
    <span class="city">Courses offered</span>
    <div class="tags" style="margin-top:8px">${c.courses.map(course => `<span class="tag">${course}</span>`).join("")}</div>
  `;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modalClose.focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
}

// ---------- Events ----------
searchInput.addEventListener("input", applyFilters);
cityFilter.addEventListener("change", applyFilters);
courseFilter.addEventListener("change", applyFilters);

resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  cityFilter.value = "all";
  courseFilter.value = "all";
  applyFilters();
});

// One listener on the grid handles every "View Details" button
grid.addEventListener("click", event => {
  const button = event.target.closest("button[data-id]");
  if (button) openModal(Number(button.dataset.id));
});

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") closeModal(); });

// ---------- Start ----------
fillDropdowns();
renderColleges(colleges);
