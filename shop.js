// Replace with Astou's real WhatsApp number (international format, no + or spaces)
const whatsappNumber = "221771234567";

document.querySelectorAll(".card__icon").forEach(button => {
  button.addEventListener("click", e => {
    let product = e.target.closest(".product-card");
    let name = product.dataset.name;
    let price = product.dataset.price;

    let message = `Hello, I want to order the ${name} for $${price} from Glow by Astou.`;
    let url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  });
});
