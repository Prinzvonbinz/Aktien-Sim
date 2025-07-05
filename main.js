// Aktiensimulator: Variablen
let stockPrice = 100.00;
let userBalance = 1000.00;
let userShares = 0;
const minStockPrice = 2.00;

// DOM-Elemente
const priceEl = document.getElementById('stockPrice');
const balanceEl = document.getElementById('balance');
const sharesEl = document.getElementById('shares');
const messageEl = document.getElementById('message');
const buyBtn = document.getElementById('buyBtn');
const sellBtn = document.getElementById('sellBtn');

// Kurs-Update alle 2 Sekunden
setInterval(updateStockPrice, 2000);

function updateStockPrice() {
    // Zufällige Änderung: -5% bis +5%
    const changePercent = (Math.random() * 10 - 5);
    stockPrice += stockPrice * (changePercent / 100);
    stockPrice = Math.max(stockPrice, minStockPrice);
    stockPrice = Math.round(stockPrice * 100) / 100;
    updateDisplay();
}

function updateDisplay() {
    priceEl.textContent = stockPrice.toFixed(2) + " €";
    balanceEl.textContent = userBalance.toLocaleString('de-DE', { minimumFractionDigits: 2 }) + " €";
    sharesEl.textContent = userShares;
}

buyBtn.addEventListener('click', () => {
    if (userBalance >= stockPrice) {
        userBalance -= stockPrice;
        userShares += 1;
        showMessage("Gekauft! (+1 Aktie)", "green");
    } else {
        showMessage("Nicht genug Guthaben!", "red");
    }
    updateDisplay();
});

sellBtn.addEventListener('click', () => {
    if (userShares > 0) {
        userShares -= 1;
        userBalance += stockPrice;
        showMessage("Verkauft! (-1 Aktie)", "green");
    } else {
        showMessage("Keine Aktien zum Verkaufen!", "red");
    }
    updateDisplay();
});

function showMessage(msg, color) {
    messageEl.textContent = msg;
    messageEl.style.color = color === "green" ? "#388e3c" : "#c62828";
    setTimeout(() => {
        messageEl.textContent = "";
    }, 1700);
}

// Initial anzeigen
updateDisplay();
