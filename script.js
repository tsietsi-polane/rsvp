// Initialize EmailJS
(function () {
  emailjs.init("XjrigZwR6DROGu62D"); // Replace with your actual Public Key
})();

const canvas = document.getElementById("cardCanvas");
const ctx = canvas.getContext("2d");
const img = new Image();
img.src = "invitation.jpeg"; // Make sure this file exists in the same folder

img.onload = function () {
  drawCardWithName("Your Name");
};

function drawCardWithName(nameText) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  ctx.font = "italic 48px 'Brush script MT'";
  ctx.fillStyle = "#c2a606ff";
  ctx.textAlign = "center";
  ctx.fillText(nameText, canvas.width / 2, 70);
}

const form = document.getElementById("rsvp-form");
const statusEl = document.getElementById("status");
const submitBtn = document.getElementById("submit-btn");
const downloadLink = document.getElementById("downloadLink");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();

  if (!name || !email || !contact) {
    statusEl.textContent = "Please complete all fields.";
    return;
  }

  drawCardWithName(name);

  const dataUrl = canvas.toDataURL("image/jpeg");
  downloadLink.href = dataUrl;
  downloadLink.style.display = "inline-block";

  const SERVICE_ID = "service_4zybuwp"; // Replace
  const TEMPLATE_GUEST = "template_7iy5yma"; // Replace
  const TEMPLATE_HOST = "template_hg2ifmk"; // Replace

  const templateParams = {
    guest_name: name,
    guest_email: email,
    guest_contact: contact
  };

  submitBtn.disabled = true;
  statusEl.textContent = "Submitting RSVP...";

  // Guest confirmation email
  emailjs.send(SERVICE_ID, TEMPLATE_GUEST, templateParams)
    .then(function () {
      // Host notification email
      return emailjs.send(SERVICE_ID, TEMPLATE_HOST, templateParams);
    })
    .then(function () {
      statusEl.textContent = "RSVP submitted! Confirmation email sent. Download your invitation below.";
    })
    .catch(function (err) {
      console.error(err);
      statusEl.textContent = "Error sending emails. Your card is ready to download.";
    })
    .finally(function () {
      submitBtn.disabled = false;
    });

});
