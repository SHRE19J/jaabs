const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const messages = [
  "Happy Birthday, my universe!",
  "Under these stars, we both shine.",
  "You're my forever sky.",
  "Miles away, yet heart so close.",
  "Every twinkle reminds me of you.",
  "You light up my world.",
  "One day, we’ll watch these stars together.",
  "I’m proud of you, always.",
  "You are my constant in this chaos.",
  "I love you, endlessly."
];

// Create stars with twinkling effect
for (let i = 0; i < 60; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    opacity: Math.random(),
    speed: Math.random() * 0.02 + 0.005,
    message: messages[i % messages.length]
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  stars.forEach((star, i) => {
    // Twinkle logic
    star.opacity += star.speed;
    if (star.opacity > 1 || star.opacity < 0.1) {
      star.speed = -star.speed;
    }

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
    ctx.shadowBlur = 8;
    ctx.shadowColor = "white";
    ctx.fill();

    // Connect lines
    if (i < stars.length - 1) {
      ctx.beginPath();
      ctx.moveTo(star.x, star.y);
      ctx.lineTo(stars[i + 1].x, stars[i + 1].y);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
  });

  requestAnimationFrame(drawStars);
}

canvas.addEventListener("click", (e) => {
  stars.forEach((star) => {
    const dx = e.clientX - star.x;
    const dy = e.clientY - star.y;
    if (Math.sqrt(dx * dx + dy * dy) < 10) {
      showMessage(star.message);
    }
  });
});

function showMessage(text) {
  const msgBox = document.getElementById("messageBox");
  msgBox.textContent = text;
  msgBox.style.display = "block";
  setTimeout(() => {
    msgBox.style.display = "none";
  }, 4000);
}

drawStars();
