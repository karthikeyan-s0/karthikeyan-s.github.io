// Dark / Light Mode
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Smooth Scrolling for Navbar
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e){
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animate Skills on Scroll
const skills = document.querySelectorAll('.skill');
const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
}, {threshold:0.5});
skills.forEach(skill => skillObserver.observe(skill));

// Fetch GitHub Repos and Filter
const username = "karthikeyan-s";
const repoList = document.getElementById("repo-list");

// Define categories for your repos manually
const repoCategories = {
    "project1": "python",
    "project2": "web",
    "project3": "python"
    // Add your repo names here
};

fetch(`https://api.github.com/users/${username}/repos`)
  .then(res => res.json())
  .then(repos => {
      repos.forEach((repo, index) => {
          const projectDiv = document.createElement("div");
          const category = repoCategories[repo.name] || "web";
          projectDiv.classList.add("project", category);

          projectDiv.innerHTML = `
              <h3>${repo.name}</h3>
              <p>${repo.description || "No description"}</p>
              <a href="${repo.html_url}" target="_blank">View on GitHub</a>
          `;
          repoList.appendChild(projectDiv);

          // Animate project
          setTimeout(() => {
              projectDiv.style.opacity = 1;
              projectDiv.style.transform = "translateY(0)";
          }, index * 150);
      });
  });

// Filter functionality
const filterButtons = document.querySelectorAll(".filter-buttons button");
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.getAttribute("data-filter");
        const projects = document.querySelectorAll(".projects-container .project");

        projects.forEach(project => {
            if(filter === "all" || project.classList.contains(filter)){
                project.style.display = "block";
                setTimeout(() => {
                    project.style.opacity = 1;
                    project.style.transform = "translateY(0)";
                }, 100);
            } else {
                project.style.opacity = 0;
                project.style.transform = "translateY(50px)";
                setTimeout(() => project.style.display = "none", 300);
            }
        });
    });
});
