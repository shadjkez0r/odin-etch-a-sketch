let currentMode = "default";
let isGreedOn = true;

const canvas = document.querySelector(".canvas");

const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

const createGrid = (size) => {
  canvas.innerHTML = "";
  const totalSquares = size ** 2;
  const squareSizePercent = 100 / size;
  for (let i = 0; i < totalSquares; i++) {
    const div = document.createElement("div");
    div.classList.add("canvas__grid");
    div.style.width = `${squareSizePercent}%`;
    div.style.height = `${squareSizePercent}%`;
    canvas.append(div);
  }
};

createGrid(16);

canvas.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("canvas__grid")) {
    if (currentMode === "rainbow") {
      e.target.style.backgroundColor = getRandomColor();
    } else {
      e.target.style.backgroundColor = "black";
    }
  }
});

const clear = () => {
  const canvasGrid = document.querySelectorAll(".canvas__grid");
  for (const grid of canvasGrid) {
    grid.style.backgroundColor = "white";
    grid.style.border = "1px solid #ccc";
  }
};

const gridoff = () => {
  const canvasGrid = document.querySelectorAll(".canvas__grid");
  if (isGreedOn) {
    for (const grid of canvasGrid) {
      grid.style.border = "none";
    }
    isGreedOn = false;
  } else {
    for (const grid of canvasGrid) {
      grid.style.border = "1px solid #ccc";
    }
    isGreedOn = true;
  }
};

const btnSize = document.querySelector(".buttons__size");
const btnRainbow = document.querySelector(".buttons__rainbow");
const btnDefault = document.querySelector(".buttons__default");
const btnClear = document.querySelector(".buttons__clear");
const btnGridoff = document.querySelector(".buttons__gridoff");

btnClear.addEventListener("click", () => clear());
btnGridoff.addEventListener("click", () => gridoff());
btnDefault.addEventListener("click", () => (currentMode = "default"));
btnRainbow.addEventListener("click", () => (currentMode = "rainbow"));
btnSize.addEventListener("click", () => {
  let userInput = prompt("Enter greed size (min: 1, max: 100):");
  let newSize = Number(userInput);

  if (newSize > 0 && newSize <= 100) {
    createGrid(newSize);
  } else {
    alert("Error! Enter correct number between 1 and 100 included!");
  }
});
