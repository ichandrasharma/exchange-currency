const BaseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const slide = document.querySelectorAll(".slide select");
const button = document.querySelector("form button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const rate = document.querySelector(".rate");

for (let select of slide) {
    for (currNm in countryList) {
        let newChoice = document.createElement("option");
        newChoice.innerText = currNm;
        newChoice.value = currNm;
        if (select.name === "from" && currNm === "USD") {
            newChoice.selected = "selected";
        } else if (select.name === "to" && currNm === "INR") {
            newChoice.selected = "selected";
        }
        select.append(newChoice);
    }

    select.addEventListener("change", (evt) => {
        changeFlag(evt.target);
    });
}

const updateRate = async () => {
    let amountBlock = document.querySelector(".amount-block input");
    let amountVal = amountBlock.value;
    if (amountVal === "" || amountVal < 1) {
        amountVal = 1;
        amountBlock.value = "1";
    }
    const URL = `${BaseURL}/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let newRate = data[toCurrency.value.toLowerCase()];

    let finalAmt = amountVal * newRate;
    rate.innerText = `${amountVal} ${fromCurrency.value} = ${finalAmt} ${toCurrency.value}`;
};

const changeFlag = (element) => {
    let currNm = element.value;
    let countryNm = countryList[currNm];
    let newSource = `https://flagsapi.com/${countryNm}/flat/64.png`;
    let image = element.parentElement.querySelector("img");
    image.src = newSource;
};

button.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateRate();
});

window.addEventListener("load", () => {
    updateRate();
});