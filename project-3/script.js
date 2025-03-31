const mainCanvas = document.getElementById("flowerCanvas");
const mainCtx = mainCanvas.getContext("2d");

const PIXEL_SIZE = 20;
let selectedPetal = "petal1";

// petals
const petals = {
    petal1: [
      [null, null, null, "#FFD700", null, null, null],
      [null, null, "#FFD700", "#FFD700", "#FFD700", null, null],
      [null, "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", null],
      ["#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700"],
      [null, "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", null],
      [null, null, "#FFD700", "#FFD700", "#FFD700", null, null],
      [null, null, null, "#FFD700", null, null, null]
    ],
    petal2: [
      ["#FF69B4", "#FF69B4", "#FF69B4", null, "#FF69B4", "#FF69B4", "#FF69B4"],
      ["#FF69B4", null, null, null, null, null, "#FF69B4"],
      ["#FF69B4", null, "#FF69B4", "#FF69B4", "#FF69B4", null, "#FF69B4"],
      [null, null, "#FF69B4", "#FF69B4", "#FF69B4", null, null],
      ["#FF69B4", null, "#FF69B4", "#FF69B4", "#FF69B4", null, "#FF69B4"],
      ["#FF69B4", null, null, null, null, null, "#FF69B4"],
      ["#FF69B4", "#FF69B4", "#FF69B4", null, "#FF69B4", "#FF69B4", "#FF69B4"]
    ]
  };

// Draw pixels to a canvas context
function drawPixel(ctx, x, y, color, size) {
  ctx.fillStyle = color;
  ctx.fillRect(x * size, y * size, size, size);
}

// pixel grid to canvas
function drawFromGrid(ctx, grid, offsetX, offsetY, pixelSize = PIXEL_SIZE) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const color = grid[y][x];
      if (color) {
        drawPixel(ctx, offsetX + x, offsetY + y, color, pixelSize);
      }
    }
  }
}

// drawing flower onto preview canvas
function drawFlower() {
  mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  drawFromGrid(mainCtx, petals[selectedPetal], 4, 1);
}

// petal selection display
document.querySelectorAll("#petalOptions canvas").forEach(canvas => {
  const type = canvas.dataset.type;
  const ctx = canvas.getContext("2d");

  // preview on selection display
  drawFromGrid(ctx, petals[type], 0, 0, 10);

  // selection interaction
  canvas.addEventListener("click", () => {
    selectedPetal = type;
    document.querySelectorAll("#petalOptions canvas").forEach(c => c.classList.remove("selected"));
    canvas.classList.add("selected");
    drawFlower();
  });
});

drawFlower();
document.querySelector(`[data-type="${selectedPetal}"]`).classList.add("selected");
