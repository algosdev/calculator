const num = document.querySelectorAll('.num');
const screen = document.querySelector('.screen');
const history = document.querySelector('.history');
const oper = document.querySelectorAll('.oper');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');
const deleter = document.querySelector('.delete');

const m = oper[1].innerText; // multiplication sign
const s = oper[2].innerText; //substraction sign
const a = oper[3].innerText; // addition sign
const d = oper[0].innerText; //division sign
let x, y, z; // variables for calculations

let first = (localStorage.getItem("first") === null) ? true : localStorage.getItem("first");
if (first == true) {
  setTimeout(() => {
    if (first) {
      window.onload = whenOnload();
      localStorage.setItem('first', 'false');
    }
  }, 5300);
}
else {
  whenOnload();
}
function whenOnload() {
  console.log("Loaded");
  document.querySelector(".preload-cont").style.display = "none";
  document.querySelector("body").style.overflow = "visible";
}

// Delete last character
deleter.addEventListener('click', () => {
  screen.innerHTML = screen.innerText.slice(0, screen.innerText.length - 1);
});

// Clear display
clear.addEventListener('click', () => {
  screen.innerHTML = '';
  history.innerHTML = '';
});

// Click event for Equal button 
equal.addEventListener('click', () => {
  if (screen.innerText != '') {
    calc();
  }
});

// Click event fot operator buttons
oper.forEach(operator => {
  operator.addEventListener('click', () => {
    if (screen.innerText != '') {
      let v = screen.innerText
      history.innerHTML = screen.innerText + operator.innerText;
      screen.innerHTML = '';
    }
    else {
      history.innerHTML += '';
    }
  })
});

// Click event for number buttons
num.forEach(n => {
  n.addEventListener('click', () => {
    display(n.innerText);
  });
});

// Displaying numbers
function display(e) {
  if (e == '.') {
    if (screen.innerText == '') {
      screen.innerHTML = '0.'
    }
    else {
      displayOnce(e, screen);
    }
  }
  else {
    screen.innerHTML += e;
  }
}

// Display only one time (for dot sign)
function displayOnce(sign, string) {
  if (string.innerText.split(sign).length - 1 == 1) {
    string.innerText += '';
  }
  else {
    string.innerHTML += sign;
  }
}

// Calculations
function calc() {
  x = parseFloat(history.innerText.slice(0, history.innerText.length - 1));
  y = parseFloat(screen.innerText);
  if (history.innerText.slice(history.innerText.length - 1, history.innerText.length) == a) {
    z = x + y;
    console.log(z);
    history.innerHTML = `${x}${a}${y}`;
    screen.innerHTML = z;
  }
  else if (history.innerText.slice(history.innerText.length - 1, history.innerText.length) == s) {
    z = x - y;
    console.log(z);
    history.innerHTML = `${x}${s}${y}`;
    screen.innerHTML = z;
  }
  else if (history.innerText.slice(history.innerText.length - 1, history.innerText.length) == m) {
    z = x * y;
    console.log(z);
    history.innerHTML = `${x}${m}${y}`;
    screen.innerHTML = parseFloat(z.toFixed(3));
  }
  else if (history.innerText.slice(history.innerText.length - 1, history.innerText.length) == d) {
    z = x / y;
    console.log(z);
    history.innerHTML = `${x}${d}${y}`;
    screen.innerHTML = parseFloat(z.toFixed(3));
  }
}

