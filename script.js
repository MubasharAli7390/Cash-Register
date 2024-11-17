const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");
const cidElement = document.getElementById("cash-in-drawer");
const bodyElement = document.querySelector("body");
let cashInput = document.getElementById("cash");
let priceInput = document.getElementById("price");


let cid =  [
    ["PENNY", 1.01], 
    ["NICKEL", 2.05], 
    ["DIME", 3.1], 
    ["QUARTER", 4.25], 
    ["ONE", 90], 
    ["FIVE", 55], 
    ["TEN", 20],
     ["TWENTY", 60], 
     ["ONE HUNDRED", 100]
     ];


bodyElement.addEventListene('onload', cidString)
cidElement.innerText += `${cidString(cid)}`;

purchaseBtn.addEventListener('click', () => {
  let cash = Number(cashInput.value);
  let price = Number(priceInput.value);
  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (cash == price) {
    changeDue.innerText = "No change due - customer paid with exact cash";
  } else {
    changeDue.innerText = `${calculateChange(price, cash, cid)}`;
  }
})








const calculateChange = (price, cash, cid) => {
    let change = cash * 100 - price * 100;
    change = Math.round(change);
    let cidSum = 0;
    let status = "";
    let changeArray = [];

    // Calculate total cid
    for (let i = 0; i < cid.length; i++) {
        cidSum += cid[i][1] * 100;
    }

    // Check for Insufficient cid
    if (change > cidSum) {
        return `Status: INSUFFICIENT_FUNDS`;
    }

    //if cid is equal to change
    if (change === cidSum) {
        let formattedChange = cid
            .filter((item) => item[1] > 0)
            .map((item) => `${item[0]}: $${item[1].toFixed(2)}`);
        return `Status: CLOSED, ${formattedChange.join(", ")}`;
    }

    // Calculate change
    cid.reverse();
    const currencyUnits = {
        "ONE HUNDRED": 10000,
        "TWENTY": 2000,
        "TEN": 1000,
        "FIVE": 500,
        "ONE": 100,
        "QUARTER": 25,
        "DIME": 10,
        "NICKEL": 5,
        "PENNY": 1,
    };

    for (let p of cid) {
        let currencyName = p[0];
        let currencyAmount = p[1] * 100;
        let amountGiven = 0;

        while (change >= currencyUnits[currencyName] && currencyAmount > 0) {
            change -= currencyUnits[currencyName];
            currencyAmount -= currencyUnits[currencyName];
            amountGiven += currencyUnits[currencyName] / 100;
        }

        if (amountGiven > 0) {
            changeArray.push(`${currencyName}: $${amountGiven.toFixed(2)}`);
        }
    }

    // if change is not fully given
    if (change > 0) {
        return `Status: INSUFFICIENT_FUNDS`;
    }

    // return result string
    status = "Status: OPEN";
    let changeString = changeArray.join(", ");
    return `${status} ${changeString}`;
}



const cidString = (drawer) => {
    let string = "";
    for (let i = 0; i < drawer.length; i++) {
       string += `${drawer[i][0]}: ${drawer[i][1]}`;
    }
    return string;
};