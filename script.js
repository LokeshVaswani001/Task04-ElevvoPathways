const postsData = [
  { id: 1, title: "React Basics", category: "tech", date: "2025-09-01", description: "Learn the basics of React step by step.", image: "https://via.placeholder.com/300x180?text=React" },
  { id: 2, title: "Exploring the Alps", category: "travel", date: "2025-08-25", description: "A journey through the beautiful Alps mountains.", image: "https://via.placeholder.com/300x180?text=Alps" },
  { id: 3, title: "Best Street Foods", category: "food", date: "2025-08-18", description: "Discover the best street foods around the world.", image: "https://via.placeholder.com/300x180?text=Street+Food" },
  { id: 4, title: "Advanced JavaScript", category: "tech", date: "2025-07-15", description: "Deep dive into JavaScript tips and tricks.", image: "https://via.placeholder.com/300x180?text=JS" },
  { id: 5, title: "Paris Travel Guide", category: "travel", date: "2025-07-01", description: "Top attractions and food to try in Paris.", image: "https://via.placeholder.com/300x180?text=Paris" },
  { id: 6, title: "Healthy Recipes", category: "food", date: "2025-06-20", description: "Quick and easy recipes to stay healthy.", image: "https://via.placeholder.com/300x180?text=Recipes" },
  { id: 7, title: "JavaScript Tips", category: "tech", date: "2025-05-15", description: "Handy tips for writing cleaner JavaScript.", image: "https://via.placeholder.com/300x180?text=Tips" },
  { id: 8, title: "Backpacking Asia", category: "travel", date: "2025-04-10", description: "Tips and tricks for budget traveling across Asia.", image: "https://via.placeholder.com/300x180?text=Asia" },
];

const postsContainer = document.getElementById("postsContainer");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const paginationContainer = document.getElementById("pagination");

let category = "all";
let search = "";
let currentPage = 1;
const postsPerPage = 4;

// Render posts
function renderPosts() {
  let filteredPosts = postsData.filter(post => {
    return (
      (category === "all" || post.category === category) &&
      post.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);

  postsContainer.innerHTML = currentPosts.map(post => `
    <div class="post-card">
      <img src="${post.image}" alt="${post.title}">
      <div class="card-body">
        <h3>${post.title}</h3>
        <p class="date">${post.date}</p>
        <p>${post.description}</p>
      </div>
    </div>
  `).join("");

  renderPagination(filteredPosts.length);
}

// Render pagination
function renderPagination(totalPosts) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");
    btn.addEventListener("click", () => {
      currentPage = i;
      renderPosts();
    });
    paginationContainer.appendChild(btn);
  }
}

// Category filter
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    category = btn.dataset.category;
    currentPage = 1;
    renderPosts();
  });
});

// Search
searchInput.addEventListener("input", (e) => {
  search = e.target.value;
  currentPage = 1;
  renderPosts();
});

// Initial render
renderPosts();
