const amountEl = document.getElementById("amount");
const fromCurrencyEl = document.getElementById("fromCurrency");
const toCurrencyEl = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const resultEl = document.getElementById("result");

const API_URL = "https://open.er-api.com/v6/latest/";

// Currency code to emoji flag
const currencyFlags = {
  USD: "🇺🇸", EUR: "🇪🇺", GBP: "🇬🇧", JPY: "🇯🇵", INR: "🇮🇳",
  BDT: "🇧🇩", AUD: "🇦🇺", CAD: "🇨🇦", CHF: "🇨🇭", CNY: "🇨🇳",
  NZD: "🇳🇿", SEK: "🇸🇪", NOK: "🇳🇴", PKR: "🇵🇰", RUB: "🇷🇺",
  SGD: "🇸🇬", HKD: "🇭🇰", ZAR: "🇿🇦"
};

async function loadCurrencies() {
  try {
    const res = await fetch(`${API_URL}USD`);
    const data = await res.json();
    const currencies = Object.keys(data.rates);

    currencies.forEach(currency => {
      const flag = currencyFlags[currency] || "🏳️";
      const option1 = document.createElement("option");
      const option2 = document.createElement("option");

      option1.value = option2.value = currency;
      option1.textContent = `${flag} ${currency}`;
      option2.textContent = `${flag} ${currency}`;

      fromCurrencyEl.appendChild(option1);
      toCurrencyEl.appendChild(option2);
    });

    fromCurrencyEl.value = "USD";
    toCurrencyEl.value = "BDT";
  } catch (error) {
    console.error("Error loading currencies:", error);
  }
}

async function convertCurrency() {
  const amount = parseFloat(amountEl.value);
  const from = fromCurrencyEl.value;
  const to = toCurrencyEl.value;

  if (isNaN(amount) || amount <= 0) {
    resultEl.textContent = "Please enter a valid amount.";
    return;
  }

  try {
    const res = await fetch(`${API_URL}${from}`);
    const data = await res.json();
    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(2);

    resultEl.textContent = `${amount} ${from} = ${converted} ${to}`;
  } catch (error) {
    resultEl.textContent = "Error converting currency.";
    console.error(error);
  }
}

convertBtn.addEventListener("click", convertCurrency);
loadCurrencies();
