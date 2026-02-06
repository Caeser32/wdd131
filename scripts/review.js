let reviewCount = localStorage.getItem("reviewCount");

if (reviewCount === null) {
    reviewCount = 0;
} else {
    reviewCount = parseInt(reviewCount);
}

reviewCount = reviewCount + 1;

localStorage.setItem("reviewCount", reviewCount);

const countDisplay = document.getElementById("review-count");
countDisplay.textContent = reviewCount;

document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;
