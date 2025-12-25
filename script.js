let isFinished = false;

function appendValue(val) {
  const resultDisplay = document.getElementById("result");
  const operators = ["+", "-", "*", "/"];
  let currentText = resultDisplay.innerText;

  if (isFinished) {
    let cleanNumber = currentText.replace("=", "");
    if (operators.indexOf(val) !== -1 || val === "%") {
      currentText = cleanNumber;
    } else {
      currentText = "";
    }
    isFinished = false;
  }

  if (currentText === "0" && val !== ".") {
    currentText = "";
  }
}
