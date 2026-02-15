const projects = [
    {
        title: "Third Wheel / Candleholder",
        description: "A story time animation about the awkward reality of being the extra person in every friend group.",
        image: "../images/zee.jpg",
        category: "story-time",
        year: 2022,
        width: 800,
        height: 600
    },
    {
        title: "Anxiety",
        description: "An animated short about living with anxiety, told through personal experiences and character expression.",
        image: "../images/freeze.jpg",
        category: "story-time",
        year: 2023,
        width: 800,
        height: 600
    },
    {
        title: "Studio Session",
        description: "A story time animation about a wild day at the studio with unexpected company.",
        image: "../images/bar.jpg",
        category: "story-time",
        year: 2023,
        width: 800,
        height: 600
    },
    {
        title: "Dynamic Duo",
        description: "Original character designs exploring contrasting personalities through visual style.",
        image: "../images/creative.jpg",
        category: "character-design",
        year: 2022,
        width: 800,
        height: 800
    },
    {
        title: "Walk Cycle Study",
        description: "An animation exercise focused on fluid character movement and weight distribution.",
        image: "../images/kf_0000.png",
        category: "story-time",
        year: 2024,
        width: 800,
        height: 600
    },
    {
        title: "The Squad",
        description: "A group portrait of original characters from my earlier character design work.",
        image: "../images/tumz-persona.jpg",
        category: "character-design",
        year: 2021,
        width: 176,
        height: 176
    },
    {
        title: "Cast Lineup",
        description: "A full cast illustration showcasing characters from various animation projects.",
        image: "../images/tumz.png",
        category: "character-design",
        year: 2024,
        width: 1282,
        height: 753
    },
    {
        title: "Brand Identity Concepts",
        description: "Logo and identity explorations created during graphic design coursework.",
        image: "",
        category: "graphic-design",
        year: 2024,
        width: 400,
        height: 300
    },
    {
        title: "Motion Graphics Reel",
        description: "A compilation of motion graphics and title sequences from university projects.",
        image: "",
        category: "graphic-design",
        year: 2025,
        width: 400,
        height: 300
    }
];

function highlightNav() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(function (link) {
        const linkPage = link.getAttribute("href");
        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });
}

function setFooterInfo() {
    const yearEl = document.querySelector("#currentyear");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    const modEl = document.querySelector("#lastModified");
    if (modEl) {
        modEl.textContent = `Last Modified: ${document.lastModified}`;
    }
}

function renderGallery(items) {
    const container = document.querySelector(".gallery-grid");
    if (!container) {
        return;
    }

    container.innerHTML = "";

    items.forEach(function (project) {
        const card = document.createElement("div");
        card.classList.add("gallery-card");

        let imageHTML = "";
        if (project.image) {
            imageHTML = `<img src="${project.image}" alt="${project.title}" loading="lazy" width="${project.width}" height="${project.height}">`;
        } else {
            imageHTML = `<div class="placeholder-img">Coming Soon</div>`;
        }

        card.innerHTML = `
            ${imageHTML}
            <div class="gallery-card-info">
                <h3>${project.title}</h3>
                <p class="year">${project.year}</p>
                <p>${project.description}</p>
            </div>
        `;

        container.appendChild(card);
    });
}

function filterGallery(category) {
    let filtered;

    if (category === "all") {
        filtered = projects;
    } else {
        filtered = projects.filter(function (project) {
            return project.category === category;
        });
    }

    renderGallery(filtered);
    localStorage.setItem("galleryFilter", category);
}

function setupFilters() {
    const buttons = document.querySelectorAll(".filter-btn");
    if (buttons.length === 0) {
        return;
    }

    const savedFilter = localStorage.getItem("galleryFilter") || "all";

    buttons.forEach(function (btn) {
        const category = btn.getAttribute("data-category");

        if (category === savedFilter) {
            btn.classList.add("active");
        }

        btn.addEventListener("click", function () {
            buttons.forEach(function (b) {
                b.classList.remove("active");
            });
            btn.classList.add("active");
            filterGallery(category);
        });
    });

    filterGallery(savedFilter);
}

function setupContactForm() {
    const form = document.querySelector("#contact-form");
    if (!form) {
        return;
    }

    let messageCount = localStorage.getItem("messageCount");
    if (messageCount === null) {
        messageCount = 0;
    } else {
        messageCount = parseInt(messageCount);
    }

    const countEl = document.querySelector("#message-count");
    if (countEl && messageCount > 0) {
        countEl.textContent = `You have sent ${messageCount} message(s) so far.`;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = form.querySelector("#name").value.trim();
        const email = form.querySelector("#email").value.trim();
        const subject = form.querySelector("#subject").value;
        const message = form.querySelector("#message").value.trim();

        if (!name || !email || !subject || !message) {
            return;
        }

        messageCount = messageCount + 1;
        localStorage.setItem("messageCount", messageCount);

        const msgBox = document.querySelector("#form-message");
        if (msgBox) {
            msgBox.style.display = "block";
            msgBox.innerHTML = `
                <h3>Thank you, ${name}!</h3>
                <p>Your message about "${subject}" has been received.</p>
                <p class="msg-count">You have sent ${messageCount} message(s) so far.</p>
            `;
        }

        form.style.display = "none";

        if (countEl) {
            countEl.textContent = "";
        }
    });
}

function setupMobileNav() {
    const toggle = document.querySelector(".menu-btn");
    const nav = document.querySelector("nav");

    if (toggle && nav) {
        toggle.addEventListener("click", function () {
            nav.classList.toggle("open");
        });
    }
}

highlightNav();
setFooterInfo();
setupFilters();
setupContactForm();
setupMobileNav();
