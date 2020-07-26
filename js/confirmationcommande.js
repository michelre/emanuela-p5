const params = new URL(window.location).searchParams;
const orderId = params.get('id')
const userName = params.get('user')

document.querySelector(".order-id").textContent += " " + orderId;
document.querySelector(".user").textContent += " " + userName

