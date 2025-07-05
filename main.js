// Aktiensimulator: Variablen
let stockPrice = 100.00;
let userBalance = 1000.00;
let userShares = 0;
const minStockPrice = 2.00;

// Kursverlauf für das Diagramm (max. 30 Werte)
let priceHistory = [stockPrice];
let timeHistory = [getTimeLabel()];

// DOM-Elemente
const priceEl = document.getElementById('stockPrice');
const balanceEl = document.getElementById('balance');
const sharesEl = document.getElementById('shares');
const messageEl = document.getElementById('message');
const buyBtn = document.getElementById('buyBtn');
const sellBtn = document.getElementById('sellBtn');

// Chart.js initialisieren
const ctx = document.getElementById('chart').getContext('2d');
let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: timeHistory,
        datasets: [{
            label: 'Aktienkurs (€)',
            data: priceHistory,
            borderColor: '#2196f3',
            backgroundColor: 'rgba(33,150,243,0.1)',
            tension: 0.2,
            pointRadius: 0,
            borderWidth: 2,
            fill: true
        }]
    },
    options: {
        animation: false,
        responsive: false,
        plugins: { legend: { display: false } },
        scales: {
            x: { display: false },
            y: {
                beginAtZero: false,
                ticks: { color: "#2196f3" }
            }
        }
    }
});

// Kurs-Update alle 2 Sekunden
setInterval(updateStockPrice, 2000);

function updateStockPrice() {
    // Zufällige Änderung: -5% bis +5%
    const changePercent = (Math.random() * 10 - 5);
    stockPrice += stockPrice * (changePercent / 100);
    stockPrice = Math.max(stockPrice, minStockPrice);
    stockPrice = Math.round(stockPrice * 100) / 100;

    // Verlauf aktualisieren (max 30 Werte)
    priceHistory.push(stockPrice);
    timeHistory.push(getTimeLabel());
    if (priceHistory.length > 30) {
        priceHistory.shift();
        timeHistory.shift();
    }

    updateDisplay();
    updateChart();
}

function updateDisplay() {
    priceEl.textContent = stockPrice.toFixed(2) + " €";
    balanceEl.textContent = userBalance.toLocaleString('de-DE', { minimumFractionDigits: 2 }) + " €";
    sharesEl.textContent = userShares;
}

function updateChart() {
    chart.data.labels = timeHistory;
    chart.data.datasets[0].data = priceHistory;
    chart.update();
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

function getTimeLabel() {
    const now = new Date();
    return now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

// Initial anzeigen
updateDisplay();
updateChart();
