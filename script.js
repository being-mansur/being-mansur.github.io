
// ========================================
// MOBILE NAVIGATION
// ========================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close mobile menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});


// ========================================
// LIGHT AND DARK THEME
// ========================================

const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
  document.body.classList.add("light-theme");
}

function updateThemeIcon() {
  themeToggle.textContent =
    document.body.classList.contains("light-theme") ? "☾" : "☀";
}

updateThemeIcon();

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  const currentTheme =
    document.body.classList.contains("light-theme")
      ? "light"
      : "dark";

  localStorage.setItem("portfolio-theme", currentTheme);

  updateThemeIcon();
});


// ========================================
// PORTFOLIO GALLERY DATA
// ========================================

// Add your uploaded files in the correct folders.
// Then add their details here.

const galleryData = {

  graphic: {
    title: "Graphic Design",

    items: [
      // Example:
      // {
      //   title: "My Logo Design",
      //   description: "Creative logo design project.",
      //   type: "image",
      //   file: "assets/graphic-design/my-logo.jpg"
      // }
    ]
  },

  ict: {
    title: "ICT",

    items: [
      // Example:
      // {
      //   title: "ICT Competition",
      //   description: "My ICT activity.",
      //   type: "image",
      //   file: "assets/ict/competition.jpg"
      // }
    ]
  },

  photography: {
    title: "Photography",

    items: [
      // Example:
      // {
      //   title: "My Travel Photography",
      //   description: "A beautiful travel moment.",
      //   type: "image",
      //   file: "assets/photography/travel.jpg"
      // },
      // {
      //   title: "Travel Video",
      //   description: "A video from my journey.",
      //   type: "video",
      //   file: "assets/photography/travel-video.mp4"
      // }
    ]
  },

  science: {
    title: "Science & Research",

    items: [
      // Example:
      // {
      //   title: "My Research Paper",
      //   description: "Science research document.",
      //   type: "pdf",
      //   file: "assets/science-research/research-paper.pdf"
      // }
    ]
  },

  programming: {
    title: "Programming & Projects",

    items: [
      // Example:
      // {
      //   title: "My Website Project",
      //   description: "A personal website project.",
      //   type: "video",
      //   file: "assets/programming-projects/demo.mp4"
      // }
    ]
  }

};


// ========================================
// GALLERY ELEMENTS
// ========================================

const galleryView = document.getElementById("galleryView");
const galleryItems = document.getElementById("galleryItems");
const galleryCategoryTitle = document.getElementById("galleryCategoryTitle");
const galleryBack = document.getElementById("galleryBack");


// ========================================
// CREATE GALLERY ITEM
// ========================================

function createGalleryItem(item) {

  const card = document.createElement("article");
  card.className = "gallery-item";

  const media = document.createElement("div");
  media.className = "gallery-media";

  const info = document.createElement("div");
  info.className = "gallery-info";

  const title = document.createElement("h3");
  title.textContent = item.title;

  const description = document.createElement("p");
  description.textContent = item.description || "";

  const actions = document.createElement("div");
  actions.className = "gallery-actions";


  // IMAGE
  if (item.type === "image") {

    const image = document.createElement("img");

    image.src = item.file;
    image.alt = item.title;
    image.loading = "lazy";

    image.onerror = () => {
      image.alt = "Image could not be loaded";
    };

    media.appendChild(image);

    const viewButton = document.createElement("a");

    viewButton.href = item.file;
    viewButton.target = "_blank";
    viewButton.rel = "noopener";
    viewButton.textContent = "View Image ↗";

    actions.appendChild(viewButton);
  }


  // VIDEO
  else if (item.type === "video") {

    const video = document.createElement("video");

    video.src = item.file;
    video.controls = true;
    video.preload = "metadata";
    video.playsInline = true;

    // Mobile-friendly video playback
    video.setAttribute("playsinline", "");
    video.setAttribute("controlsList", "nodownload");

    media.appendChild(video);
  }


  // PDF
  else if (item.type === "pdf") {

    const pdfPreview = document.createElement("div");

    pdfPreview.className = "pdf-preview";
    pdfPreview.textContent = "📄 PDF DOCUMENT";

    media.appendChild(pdfPreview);

    const viewButton = document.createElement("a");

    viewButton.href = item.file;
    viewButton.target = "_blank";
    viewButton.rel = "noopener";
    viewButton.textContent = "View PDF ↗";

    const downloadButton = document.createElement("a");

    downloadButton.href = item.file;
    downloadButton.download = "";
    downloadButton.textContent = "Download ↓";

    actions.appendChild(viewButton);
    actions.appendChild(downloadButton);
  }


  // INVALID FILE TYPE
  else {

    const error = document.createElement("p");

    error.textContent = "Unsupported file type.";

    media.appendChild(error);
  }


  info.appendChild(title);
  info.appendChild(description);
  info.appendChild(actions);

  card.appendChild(media);
  card.appendChild(info);

  return card;
}


// ========================================
// SHOW SELECTED CATEGORY
// ========================================

function showGallery(category) {

  const data = galleryData[category];

  if (!data) return;

  galleryCategoryTitle.textContent = data.title;

  galleryItems.replaceChildren();

  if (data.items.length === 0) {

    const emptyMessage = document.createElement("div");

    emptyMessage.className = "gallery-empty";

    emptyMessage.innerHTML = `
      <div class="empty-icon">📂</div>
      <h3>Coming Soon</h3>
      <p>
        No files have been added yet.
        New photos, videos, projects and documents
        will appear here.
      </p>
    `;

    galleryItems.appendChild(emptyMessage);

  } else {

    data.items.forEach(item => {

      galleryItems.appendChild(
        createGalleryItem(item)
      );

    });

  }

  galleryView.hidden = false;

  galleryView.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


// ========================================
// CATEGORY BUTTONS
// ========================================

document.querySelectorAll(".gallery-category").forEach(button => {

  button.addEventListener("click", () => {

    const category = button.dataset.category;

    showGallery(category);

  });

});


// ========================================
// BACK TO ALL CATEGORIES
// ========================================

galleryBack.addEventListener("click", () => {

  galleryView.hidden = true;

  document.querySelector(".portfolio-gallery").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

});


// ========================================
// BACK TO TOP BUTTON
// ========================================

const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {

  if (window.scrollY > 350) {

    backTop.classList.add("show");

  } else {

    backTop.classList.remove("show");

  }

});

backTop.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});


// ========================================
// AUTOMATIC FOOTER YEAR
// ========================================

document.getElementById("currentYear").textContent =
  new Date().getFullYear();


// ========================================
// SUBTLE 3D PROFILE CARD MOVEMENT
// ========================================

const profileCard = document.querySelector(".profile-card");
const heroArt = document.querySelector(".hero-art");

if (
  profileCard &&
  heroArt &&
  window.matchMedia("(pointer: fine)").matches
) {

  heroArt.addEventListener("mousemove", event => {

    const rect = heroArt.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    profileCard.style.transform =
      `rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;

  });

  heroArt.addEventListener("mouseleave", () => {

    profileCard.style.transform = "";

  });

}
