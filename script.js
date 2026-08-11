const sealButton = document.getElementById("sealButton");
const envelopeScreen = document.getElementById("envelopeScreen");
const mainPage = document.getElementById("mainPage");
const magicFlash = document.getElementById("magicFlash");

let opened = false;
let invitadoActual = null;

sealButton.addEventListener("click", () => {
  if (opened) return;
  opened = true;

  sealButton.classList.add("opening");

  createMagicParticles();

  setTimeout(() => {
    magicFlash.classList.add("active");
  }, 900);

 setTimeout(() => {
  envelopeScreen.classList.add("hide");
  mainPage.classList.add("show");
}, 1250);

  setTimeout(() => {
    envelopeScreen.style.display = "none";
    document.body.style.overflow = "auto";
  }, 2600);
});

function createMagicParticles() {
  createStars();
  createMagicDust();
}

function createStars() {
  const total = 16;

  for (let i = 0; i < total; i++) {
    const star = document.createElement("span");
    star.classList.add("magic-star");

    // Las estrellas nacen exactamente desde el centro del sello
    // y se dispersan alrededor de él.
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 190 + 75;

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance - 35;

    const size = Math.random() * 16 + 10;
    const endSize = Math.random() * 1.25 + 1.15;
    const rotate = Math.random() * 360;

    star.style.setProperty("--x", `${x}px`);
    star.style.setProperty("--y", `${y}px`);
    star.style.setProperty("--star-size", `${size}px`);
    star.style.setProperty("--endSize", endSize);
    star.style.setProperty("--rotate", `${rotate}deg`);

    star.style.animationDelay = `${Math.random() * .35}s`;

    envelopeScreen.appendChild(star);

    setTimeout(() => star.remove(), 2350);
  }
}

function createMagicDust() {
  const total = 18;

  for (let i = 0; i < total; i++) {
    const dust = document.createElement("span");
    dust.classList.add("magic-dust");

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 130 + 50;

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    dust.style.setProperty("--x", `${x}px`);
    dust.style.setProperty("--y", `${y}px`);
    dust.style.animationDelay = `${Math.random() * .3}s`;

    envelopeScreen.appendChild(dust);

    setTimeout(() => dust.remove(), 1500);
  }
}

/*  MUSICA  */
const musicButton = document.getElementById("musicButton");
const bgMusic = document.getElementById("bgMusic");

let isPlaying = false;

musicButton.addEventListener("click", () => {
  if (!isPlaying) {
    bgMusic.play();
    musicButton.classList.add("playing");
    musicButton.querySelector(".music-icon").textContent = "❚❚";
    musicButton.querySelector(".music-text").textContent = "PAUSA";
    isPlaying = true;
  } else {
    bgMusic.pause();
    musicButton.classList.remove("playing");
    musicButton.querySelector(".music-icon").textContent = "▶";
    musicButton.querySelector(".music-text").textContent = "PLAY";
    isPlaying = false;
  }
});

const eventDate = new Date("2026-12-18T15:00:00").getTime(); /*CAMBIAR FECHA AAAA-MM-DDTHH:MM:SS */ 

function updateCountdown() {
  const now = new Date().getTime();
  const distance = eventDate - now;

  if (distance <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    return;
  }

  document.getElementById("days").textContent = Math.floor(distance / (1000 * 60 * 60 * 24));
  document.getElementById("hours").textContent = Math.floor((distance / (1000 * 60 * 60)) % 24).toString().padStart(2, "0");
  document.getElementById("minutes").textContent = Math.floor((distance / (1000 * 60)) % 60).toString().padStart(2, "0");
  document.getElementById("seconds").textContent = Math.floor((distance / 1000) % 60).toString().padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
/* GALERIA DE FOTOS */
const galleryPhotos = [
  "images/GALERIA1.png",
  "images/GALERIA2.png",
  "images/GALERIA3.png"
];

const galleryImage = document.getElementById("galleryImage");
const prevPhoto = document.getElementById("prevPhoto");
const nextPhoto = document.getElementById("nextPhoto");
const galleryDots = document.getElementById("galleryDots");

let currentPhoto = 0;

function createGalleryDots() {
  galleryPhotos.forEach((_, index) => {
    const dot = document.createElement("span");
    if (index === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      currentPhoto = index;
      changePhoto();
    });

    galleryDots.appendChild(dot);
  });
}

function changePhoto() {
  galleryImage.classList.add("changing");

  setTimeout(() => {
    galleryImage.src = galleryPhotos[currentPhoto];
    galleryImage.classList.remove("changing");

    document.querySelectorAll(".gallery-dots span").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentPhoto);
    });
  }, 250);
}

nextPhoto.addEventListener("click", () => {
  currentPhoto = (currentPhoto + 1) % galleryPhotos.length;
  changePhoto();
});

prevPhoto.addEventListener("click", () => {
  currentPhoto = (currentPhoto - 1 + galleryPhotos.length) % galleryPhotos.length;
  changePhoto();
});

createGalleryDots();

/* CONFIRMAR ASISTENCIA POR WHATSAPP */
const openRsvpModal = document.getElementById("openRsvpModal");
const closeRsvpModal = document.getElementById("closeRsvpModal");
const rsvpModal = document.getElementById("rsvpModal");
const rsvpForm = document.getElementById("rsvpForm");
const attendance = document.getElementById("attendance");
const mensajeAsistencia = document.getElementById("mensajeAsistencia");

// PERSONALIZA ESTOS DATOS PARA CADA INVITACIÓN
const NOMBRE_INVITADO = "Familia López";
const CANTIDAD_PASES = 4;

// Número de WhatsApp que recibirá las confirmaciones
const whatsappNumber = "5218718963128";

openRsvpModal.addEventListener("click", () => {
  attendance.value = "";
  mensajeAsistencia.textContent = "";
  rsvpModal.classList.add("active");
});

function cerrarModal() {
  rsvpModal.classList.remove("active");
}

closeRsvpModal.addEventListener("click", cerrarModal);

rsvpModal.addEventListener("click", (e) => {
  if (e.target === rsvpModal) cerrarModal();
});

rsvpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const respuesta = attendance.value;

  if (!respuesta) {
    mensajeAsistencia.textContent = "Selecciona una opción para continuar.";
    return;
  }

  mensajeAsistencia.textContent = "";

  const message = `✨ CONFIRMACIÓN DE ASISTENCIA\n\n👤 Invitado: ${NOMBRE_INVITADO}\n🎟️ Pases asignados: ${CANTIDAD_PASES}\n\n✅ Respuesta: ${respuesta}`;

  const whatsappURL =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  cerrarModal();
  window.open(whatsappURL, "_blank");
});

