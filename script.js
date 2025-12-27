let isFinished = false;

function appendValue(val) {
  const resultDisplay = document.getElementById("result");
  const historyDisplay = document.getElementById("history");
  const operators = ["+", "-", "*", "/"];

  let currentText = resultDisplay.innerText;

  // Reset Setekah Klik '='
  if (isFinished) {
    let cleanNumber = currentText.replace("=", "").trim();

    if (operators.indexOf(val) !== -1 || val === "%") {
      currentText = cleanNumber;
    } else {
      currentText = ""; // Jika klik angka, layar bersih
    }
    isFinished = false;
  }

  //  Normalisasi nol di awal, atau menampilkan 0 diawal
  if (currentText === "0" && val !== ".") {
    currentText = "";
  }

  if (operators.indexOf(val) !== -1) {
    currentText = currentText.trimEnd();
    let lastChar = currentText.slice(-1);

    if (operators.indexOf(lastChar) !== -1) {
      currentText = currentText.slice(0, -1).trimEnd();
    }

    let visualOp = val;
    if (val === "/") visualOp = "÷";
    if (val === "*") visualOp = "×";

    resultDisplay.innerText = currentText + " " + visualOp + " ";
    return;
  }

  // Titik Desimal
  if (val == ".") {
    let parts = currentText.split(" ");
    let lastPart = parts[parts.length - 1];
    if (lastPart.indexOf(".") !== -1) return;
  }

  resultDisplay.innerText = currentText + val;
}

function equals() {
  const resultDisplay = document.getElementById("result");
  const historyDisplay = document.getElementById("history");
  let currentText = resultDisplay.innerText;

  if (currentText === "" || currentText === "0") return;

  try {
    historyDisplay.innerText = currentText;

    // Mengembalikan Text sesuai keterangan operator
    let expression = currentText
      .replaceAll("÷", "/")
      .replaceAll("×", "*")
      .split(" %")
      .join("/100");

    let result = eval(expression);

    resultDisplay.innerText = "= " + result;
    isFinished = true;
  } catch (error) {
    resultDisplay.innerText = "Error!";
    isFinished = true;
  }
}

function backspace() {
  const resultDisplay = document.getElementById("result");
  let currentText = resultDisplay.innerText;

  if (isFinished || currentText === "Error!") {
    clearDisplay();
  } else if (currentText.endsWith(" ")) {
    if (currentText.endsWith(" %")) {
      resultDisplay.innerText = currentText.slice(0, -2);
    } else {
      resultDisplay.innerText = currentText.slice(0, -3);
    }
  } else if (currentText.length <= 1) {
    resultDisplay.innerText = "0";
  } else {
    resultDisplay.innerText = currentText.slice(0, -1);
  }
}

function clearDisplay() {
  document.getElementById("result").innerText = "0";
  document.getElementById("history").innerText = "";
  isFinished = false;
}
