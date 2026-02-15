// Load saved data
let cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
let totalAmount = parseInt(localStorage.getItem("totalAmount")) || 0;

// Update cart count on homepage
if (document.getElementById("cart-count")) {
    document.getElementById("cart-count").innerText = cartCount;
}

// Add to cart function
function addToCart(price, qtyId) {
    let quantity = parseInt(document.getElementById(qtyId).value);
    console.log('quantity is ',quantity);
    console.log('price is ',price);
    console.log('cartCount ',cartCount);

    console.log('totalAmount',totalAmount);

    cartCount += quantity;
    totalAmount += price * quantity;

    localStorage.setItem("cartCount", cartCount);
    localStorage.setItem("totalAmount", totalAmount);

    document.getElementById("cart-count").innerText = cartCount;

    alert(quantity + " item(s) added to cart");
}

// Show cart page data
if (document.getElementById("total-items")) {
    document.getElementById("total-items").innerText = cartCount;
}

if (document.getElementById("total-amount")) {
    document.getElementById("total-amount").innerText = totalAmount;
}

// Fake payment
function payNow() {

    if (!totalAmount || totalAmount <= 0) {
        alert("Your cart is empty!");
        return;
    }

    var options = {
        "key": "rzp_test_SGNICg1AKdzEkM",  // apni Razorpay test key yaha daalo
        "amount": totalAmount * 100, // Razorpay paise me amount leta hai
        "currency": "INR",
        "name": "Women Handbag Store",
        "description": "Handbag Purchase",
        "handler": function (response) {
            alert("Payment Successful 🎉\nPayment ID: " + response.razorpay_payment_id);
            localStorage.clear();
            window.location.href = "index.html";
        },
        "theme": {
            "color": "#ff4d6d"
        }
    };

    var rzp1 = new Razorpay(options);
    rzp1.open();
}


// Admin add product
function addProduct() {
    let name = document.getElementById("pname").value;
    let price = document.getElementById("pprice").value;

    if (name === "" || price === "") {
        alert("Enter product details");
        return;
    }

    let li = document.createElement("li");
    li.innerText = name + " - ₹" + price;

    document.getElementById("product-list").appendChild(li);
}

function resetCart() {
    cartCount = 0;
    totalAmount = 0;

    localStorage.setItem("cartCount", 0);
    localStorage.setItem("totalAmount", 0);

    if (document.getElementById("cart-count")) {
        document.getElementById("cart-count").innerText = 0;
    }

    if (document.getElementById("total-items")) {
        document.getElementById("total-items").innerText = 0;
    }

    if (document.getElementById("total-amount")) {
        document.getElementById("total-amount").innerText = 0;
    }

    alert("Cart has been reset 🛒");
}

