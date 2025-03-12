const images = ["images/img1.JPG", "images/img2.JPG", "images/img3.jpg", "images/img4.jpg"];
const altTexts = [
    "Northwestern reciever celebrating after a touchdown",
    "Northwestern football team running onto the field",
    "Northwestern reciever making a catch",
    "Northwestern running back diving to score a touchdown"
];
const carouselSlide = document.querySelector(".carousel-slide");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

for (let i = images.length - 1; i >= 0; i--) {
    const imageEl = document.createElement("img");
    imageEl.src = images[i];
    imageEl.alt = altTexts[i];
    carouselSlide.appendChild(imageEl);
}

let position = 0;

const DIR = {
    LEFT: -1,
    RIGHT: 1,
}

const POSITION = {
    LEFT: "-100%",
    CENTER: "0%",
    RIGHT: "100%",
}

function moveImages(dir, currentPosition, nextPosition) {
    const currentImage = document.querySelector(`[src="${images[currentPosition]}"]`);
    const nextImage = document.querySelector(`[src="${images[nextPosition]}"]`);

    for (var i = 0; i < images.length; i++) {
        const img = document.querySelector(`[src="${images[i]}"]`)
        img.style.top = "-1000%"
    }

    currentImage.style.top = "0%"
    nextImage.style.top = "0%"
    currentImage.style.transition = "0s"
    nextImage.style.transition = "0s"

    if (dir == DIR.LEFT) {
        currentImage.style.left = POSITION.CENTER;
        nextImage.style.left = POSITION.LEFT;
    } else if (dir == DIR.RIGHT) {
        currentImage.style.left = POSITION.CENTER;
        nextImage.style.left = POSITION.RIGHT;
    }

    
    setTimeout(() => {
        currentImage.style.transition = "0.5s";
        nextImage.style.transition = "0.5s";
        if (dir == DIR.LEFT) {
            currentImage.style.left = POSITION.RIGHT;
            nextImage.style.left = POSITION.CENTER;
        } else if (dir == DIR.RIGHT) {
            currentImage.style.left = POSITION.LEFT;
            nextImage.style.left = POSITION.CENTER;
        }
    }, 100)
}

function updatePosition(dir) {
    const currentPosition = position;
    position = position + dir;

    if (position < 0) {
        position = images.length - 1;
    } else if (position >= images.length) {
        position = 0 ;
    }
    moveImages(dir, currentPosition, position);
}

prevBtn.addEventListener("click", function () {
    updatePosition(DIR.LEFT);
})

nextBtn.addEventListener("click", function () {
    updatePosition(DIR.RIGHT);
})


const form = document.getElementById('form');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  form.reset();
  alert('Thank you for expressing interest in purchasing Northwestern Football tickets for the 2024 season! We will notify you when tickets go on sale.');
});

const price = document.querySelector("#price");
const output = document.querySelector(".price-output");

output.textContent = price.value;

price.addEventListener("input", () => {
  output.textContent = price.value;
});

document.onkeydown = (e) => {
    if (e.key === "ArrowRight") {
        updatePosition(DIR.RIGHT);
    }
    if (e.key === "ArrowLeft") {
        updatePosition(DIR.LEFT);
    }
    if (e.key === 'Enter') {
        e.preventDefault();
        
        if (form.checkValidity()) {
            form.dispatchEvent(new Event('submit'));
        } else {
            Array.from(form.elements).forEach((element) => {
                if (!element.checkValidity()) {
                  element.reportValidity();
                }
            });
        }
    }
};