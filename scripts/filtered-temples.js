// temple data array with 7 provided and 3 added entries
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Accra Ghana",
        location: "Accra, Ghana",
        dedicated: "2004, January, 11",
        area: 17500,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/accra-ghana/400x250/accra-ghana-temple-759298-wallpaper.jpg"
    },
    {
        templeName: "Adelaide Australia",
        location: "Marden, South Australia, Australia",
        dedicated: "2000, June, 15",
        area: 10700,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/adelaide-australia/400x250/adelaide-australia-temple-lds-856093-wallpaper.jpg"
    },
    {
        templeName: "Anchorage Alaska",
        location: "Anchorage, Alaska, United States",
        dedicated: "1999, January, 9",
        area: 11937,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/anchorage-alaska/400x250/anchorage-temple-lds-746769-wallpaper.jpg"
    }
];

const gallery = document.getElementById("gallery");
const filterHeading = document.querySelector("main h2");

// build and display temple cards inside the gallery
function displayTemples(templeList) {
    gallery.innerHTML = "";
    templeList.forEach(function(temple) {
        const figure = document.createElement("figure");

        const name = document.createElement("h3");
        name.textContent = temple.templeName;

        const location = document.createElement("p");
        location.innerHTML = `<span class="label">Location:</span> ${temple.location}`;

        const dedicated = document.createElement("p");
        dedicated.innerHTML = `<span class="label">Dedicated:</span> ${temple.dedicated}`;

        const area = document.createElement("p");
        area.innerHTML = `<span class="label">Size:</span> ${temple.area} sq ft`;

        const img = document.createElement("img");
        img.src = temple.imageUrl;
        img.alt = `${temple.templeName} Temple`;
        img.loading = "lazy";
        img.width = 400;
        img.height = 250;

        figure.appendChild(name);
        figure.appendChild(location);
        figure.appendChild(dedicated);
        figure.appendChild(area);
        figure.appendChild(img);

        gallery.appendChild(figure);
    });
}

// filter temples based on the selected nav category
function filterTemples(category) {
    let filtered = [];

    if (category === "old") {
        filtered = temples.filter(function(temple) {
            const year = parseInt(temple.dedicated.split(",")[0]);
            return year < 1900;
        });
        filterHeading.textContent = "Old Temples";
    } else if (category === "new") {
        filtered = temples.filter(function(temple) {
            const year = parseInt(temple.dedicated.split(",")[0]);
            return year > 2000;
        });
        filterHeading.textContent = "New Temples";
    } else if (category === "large") {
        filtered = temples.filter(function(temple) {
            return temple.area > 90000;
        });
        filterHeading.textContent = "Large Temples";
    } else if (category === "small") {
        filtered = temples.filter(function(temple) {
            return temple.area < 10000;
        });
        filterHeading.textContent = "Small Temples";
    } else {
        filtered = temples;
        filterHeading.textContent = "Temples Around the World";
    }

    displayTemples(filtered);
}

document.querySelectorAll("nav a").forEach(function(link) {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        const filter = this.textContent.trim().toLowerCase();

        document.querySelectorAll("nav a").forEach(function(navLink) {
            navLink.classList.remove("active");
        });
        this.classList.add("active");

        filterTemples(filter);
    });
});

const menuButton = document.getElementById("menu-button");
const mainNav = document.getElementById("main-nav");

menuButton.addEventListener("click", function() {
    mainNav.classList.toggle("open");
    if (mainNav.classList.contains("open")) {
        menuButton.textContent = "✕";
    } else {
        menuButton.textContent = "☰";
    }
});

// footer copyright year and last modified date
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

displayTemples(temples);
