var totalNum = 0;
var enteredNum = "";
var sign = true;
var equation = [];

const assignEventListners = document.querySelectorAll('.btn-secondary').forEach(btn => {
     // Assigns all number and dot keys to functions
     if (!isNaN(btn.innerHTML) || btn.id == "dot") {
          btn.addEventListener('click', function() {
               enterNumber(btn.innerHTML.trim());
          });
     };

     // Assigns all mathematical expressions and all-clear to functions
     switch(btn.id) {
          case "AC":
               btn.addEventListener('click', allClear);
               break;

          case "equal":
               btn.addEventListener('click', Calculate);
               break;

          case "plus":
               btn.addEventListener('click', function() {
                    updateEquation(" + ");
               });
               break;
          
          case "minus":
               btn.addEventListener('click', function() {
                    updateEquation(" - ");
               });
               break;

          case "divide":
               btn.addEventListener('click', function() {
                    updateEquation(" ÷ ");
               });
               break;
          
          case "multiply":
               btn.addEventListener('click', function() {
                    updateEquation(" × ");
               });
               break;
          
          case "modulus":
               btn.addEventListener('click', function() {
                    updateEquation(" % ");
               });
               break;

          case "P/M":
               btn.addEventListener('click', PMSwitch);
               break;
     };
});

function enterNumber(num) {
     if (totalNum) {
          allClear()
     }
     // prevents 0 or decimal being used out of mathematical rules
     if ((enteredNum == "0" && num == 0) || (enteredNum.includes(".") && num == ".")){
          return;
     }

     if (enteredNum == "0") {
          enteredNum = ""
     }

     enteredNum += num;
     enteredNum = (enteredNum.charAt(0) == ".") ? "0" + enteredNum: enteredNum;
     updateDisplay();
};

function updateDisplay() {
     document.getElementById("sign").innerHTML = (sign) ? "": "-";
     document.getElementById("user-entry").innerHTML = (!enteredNum) ? 0 : enteredNum;
     document.getElementById("equation").innerHTML = equation.join("");
     document.getElementById("equals").innerHTML = "";
};

function updateEquation(operator) {
     if (totalNum) {
          let tempNum = String(totalNum);
          allClear()
          enteredNum = tempNum;
     }
     
     if (enteredNum) {
          if (!sign) {
               enteredNum = `(-${enteredNum})`;
               sign = true;
          }
          equation.push(enteredNum);
          if (operator) {
               equation.push(operator);
          }
          enteredNum = ""
          updateDisplay();
     }
};

function Calculate() {
     updateEquation();
     // if the last element in equation is an operator, that operator is popped from the equation array
     let lastElem = equation[equation.length - 1];
     if (lastElem.includes(" ")) {
          equation.pop();
          updateDisplay();
     };
     
     // removes all the brackets for negative numbers eg. (-6) to -6 and parse all number elements to float type
     let newEquation = [];
     for (let i = 0; i < equation.length; i++) {newEquation[i] = (equation[i].includes("(")) ? equation[i].substring(1, equation[i].length-1) : equation[i];
          if (!isNaN(newEquation[i])){
               newEquation[i] = parseFloat(newEquation[i]);
          };
     };

     // Applies ×, ÷, % operations to the equation
     while (newEquation.includes(" × ") || newEquation.includes(" ÷ ") || newEquation.includes(" % ")) {
          let num;
          for (let i = 0; i < newEquation.length; i++) {
               if (newEquation[i] == " × ") {
                    num = newEquation[i-1] * newEquation[i+1];
               } else if (newEquation[i] == " ÷ ") {
                    num = newEquation[i-1] / newEquation[i+1];
               } else if (newEquation[i] == " % ") {
                    num = newEquation[i-1] % newEquation[i+1];
               };
               if (num || num == 0) {
                    newEquation.splice(i-1, 3, num);
                    break;
               };
          };
     };

     // Applies +, - operations to the equation
     while (newEquation.length > 1) {
          let num;
          for (let i = 0; i < newEquation.length; i++) {
               if (newEquation[i] == " + ") {
                    num = newEquation[i-1] + newEquation[i+1];
               } else if (newEquation[i] == " - ") {
                    num = newEquation[i-1] - newEquation[i+1];
               };
               if (num || num == 0) {
                    newEquation.splice(i-1, 3, num);
                    break;
               };
          };
     };
     totalNum = newEquation[0];
     document.getElementById("equals").innerHTML = `&nbsp;=`;
     document.getElementById("user-entry").innerHTML = totalNum;
};

function allClear() {
     totalNum = 0;
     enteredNum = "";
     sign = true;
     equation = [];
     updateDisplay();
};

function PMSwitch() {
     if (totalNum) {
          allClear()
     }
     sign = (sign) ? false : true;
     updateDisplay();
};
