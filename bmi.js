let height = document.querySelector("#height");
let weight = document.querySelector("#weight");
let btnResult = document.querySelector("#btnResult");
let list = document.querySelector("#list");
let history = document.querySelector("#history");
let historyArray = [];

let sortArray = [ 40, 35, 30, 25, 18.5, 0];
let bmiDict = {
    0: {status: "過輕", color: "#31baf9"},
    18.5: {status: "理想", color: "#86d73f"},
    25: {status: "過重", color: "#ff982d"},
    30: {status: "輕度肥胖", color: "#ff6c03"},
    35: {status: "中度肥胖", color: "#ff6c03"},
    40: {status: "重度肥胖", color: "#ff1200"}
}

document.addEventListener("DOMContentLoaded", function() {
    if (historyArray === null || historyArray.length === 0) {
        history.style.display = "none";
    }
});

const calculateBMI = () => {
    if (height.value.trim() === '' || isNaN(height.value) ||
        weight.value.trim() === '' || isNaN(weight.value)) {
        alert('身高/體重必須輸入數字');
        return;
    }

    let h = parseInt(height.value) / 100;
    let w = parseInt(weight.value);
    let result = (w / ( h * h)).toFixed(2);
    if (result <= 0) {
        alert('輸入資料有誤');
        return;
    }

    let status, color;    
    for (let index in sortArray) {
        if (result > sortArray[index]) {
            status = bmiDict[sortArray[index]].status;
            color = bmiDict[sortArray[index]].color;
            break;
        }
    };

    history.style.display = "block";
    addHistoryArray(result, status, color);
    swicthBtnResult(true);
    showResult();
    addHistoryArrayView();
}

btnResult.addEventListener("click", calculateBMI);

const addHistoryArray = (result, status, color) => {
    let date = new Date();
    let bmiData = {
        height: height.value,
        weight: weight.value,
        bmi: result,
        status: status,
        time: date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay(),
        color: color,
    }
    historyArray.push(bmiData);
    if (historyArray.length > 5) {
        historyArray.shift();
        list.removeChild(list.lastElementChild);
    };
}

const swicthBtnResult = (show) => {
    let showDiv = document.querySelector("#show");
    if (show) {
        btnResult.style.display = "none";
        if (showDiv !== null) {
            showDiv.style.display = "block";
            return;
        }
        let getParent = btnResult.parentNode; 
        let div = document.createElement("div");
        div.setAttribute("id", "show");
        getParent.appendChild(div);
    
        let p = document.createElement("div");
        p.setAttribute("id", "statusText")
        div.appendChild(p);
    } else {
        if (btnResult !== null) {
            showDiv.style.display = "none";
            btnResult.style.display = "block";            
            return;
        }
    }
}

const showResult = () => {
    let currentData = historyArray.slice(-1)[0];
    let div = document.querySelector("#show");
    let str;
    str = "<p>" + currentData.bmi + "</p><p style='font-size: 14px;'>BMI</p><a href='javascript:void(0)'></a>";
    div.innerHTML = str + div.innerHTML.substring(div.innerHTML.indexOf('<div'));
    div.setAttribute('style', 'color: ' + currentData.color + '; border: 7px solid ' + currentData.color + ';');

    var a = div.querySelector("a");
    a.style.backgroundColor = currentData.color;
    a.addEventListener("click", clearInput);

    let p = document.querySelector("#statusText");
    var pStr = "<p>" + currentData.status + "</p>"
    p.innerHTML = pStr;
    p.style.color = currentData.color;
}

const addHistoryArrayView = () => {
    history.style.display = "block";
    let currentData = historyArray.slice(-1)[0];
    str = `
    <li class='listItem' style='border-left: 7px solid ${currentData.color}'>
        <div>
            <span>${currentData.status}</span>
        </div>
        <div>
            BMI 
            <span>${currentData.bmi}</span></div>
        <div>
            weight
            <span>${currentData.weight}kg</span></div>
        <div>
            height
            <span>${currentData.height}cm</span></div>
        <div>${currentData.time}</div>
    </li>
    `;
    list.innerHTML = str + list.innerHTML;
}

const clearInput = () => {
    height.value = "";
    weight.value = "";
    swicthBtnResult(false);
}

const clearHistoryArray = () => {
    historyArray.length = 0;
    list.innerHTML = "";
    history.style.display = "none";
    clearInput();
}
document.querySelector("#btnClear").addEventListener("click", clearHistoryArray);