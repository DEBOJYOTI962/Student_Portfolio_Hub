// captcha.js

function generateCaptcha(canvasId, color = "#0f0") {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    // Save generated code
    canvas.dataset.code = captcha;

    // Draw text on canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "28px Arial";
    ctx.fillStyle = color;
    ctx.fillText(captcha, 20, 35);
}

// Attach captcha logic
document.addEventListener("DOMContentLoaded", function () {
    // Signup captcha
    if (document.getElementById("captchaCanvas")) {
        generateCaptcha("captchaCanvas", "#0f0");
        document.getElementById("refreshCaptcha").addEventListener("click", () => {
            generateCaptcha("captchaCanvas", "#0f0");
        });
        document.getElementById("signup-form").addEventListener("submit", function (e) {
            const userInput = document.getElementById("captchaInput").value.trim().toUpperCase();
            const generated = document.getElementById("captchaCanvas").dataset.code;
            if (userInput !== generated) {
                e.preventDefault();
                alert("Captcha does not match! Please try again.");
                generateCaptcha("captchaCanvas", "#0f0");
            }
        });
    }

    // Login captcha
    if (document.getElementById("captchaCanvasLogin")) {
        generateCaptcha("captchaCanvasLogin", "#0ff");
        document.getElementById("refreshCaptchaLogin").addEventListener("click", () => {
            generateCaptcha("captchaCanvasLogin", "#0ff");
        });
        document.getElementById("login-form").addEventListener("submit", function (e) {
            const userInput = document.getElementById("captchaInputLogin").value.trim().toUpperCase();
            const generated = document.getElementById("captchaCanvasLogin").dataset.code;
            if (userInput !== generated) {
                e.preventDefault();
                alert("Captcha does not match! Please try again.");
                generateCaptcha("captchaCanvasLogin", "#0ff");
            }
        });
    }
});
