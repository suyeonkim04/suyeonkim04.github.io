const mainCanvas = document.getElementById("flowerCanvas");
const mainCtx = mainCanvas.getContext("2d");

const PIXEL_SIZE = 20;
let selectedPetal = "petal1";
let selectedPistil = "pistil1";
let selectedStem = "stem1";
let selectedLeaves = "leaves1";

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
      ["#FF69B4", "#FF69B4", "#FF69B4", null, "#FF69B4", "#FF69B4", "#FF69B4"],
      ["#FF69B4", "#FF69B4", "#FF69B4", "#FF69B4", "#FF69B4", "#FF69B4", "#FF69B4"],
      [null, null, "#FF69B4", "#FF69B4", "#FF69B4", null, null],
      ["#FF69B4", "#FF69B4", "#FF69B4", "#FF69B4", "#FF69B4", "#FF69B4", "#FF69B4"],
      ["#FF69B4", "#FF69B4", "#FF69B4", null, "#FF69B4", "#FF69B4", "#FF69B4"],
      ["#FF69B4", "#FF69B4", "#FF69B4", null, "#FF69B4", "#FF69B4", "#FF69B4"]
    ],
    petal3: [
      [null, null, "#FA8072", "#FA8072", "#FA8072", null, null],
      [null, "#FA8072", "#FFA07A", "#FFA07A", "#FFA07A", "#FA8072", null],
      ["#FA8072", "#FFA07A", "#FFDAB9", "#FFDAB9", "#FFDAB9", "#FFA07A", "#FA8072"],
      ["#FA8072", "#FFA07A", "#FFDAB9", "#FFE4B5", "#FFDAB9", "#FFA07A", "#FA8072"],
      ["#FA8072", "#FFA07A", "#FFDAB9", "#FFDAB9", "#FFDAB9", "#FFA07A", "#FA8072"],
      [null, "#FA8072", "#FFA07A", "#FFA07A", "#FFA07A", "#FA8072", null],
      [null, null, "#FA8072", "#FA8072", "#FA8072", null, null]
    ],
    petal4: [
      [null, "#8A2BE2", "#8A2BE2", null, "#8A2BE2", "#8A2BE2", null],
      ["#8A2BE2", "#BA55D3", "#DA70D6", "#BA55D3", "#DA70D6", "#BA55D3", "#8A2BE2"],
      ["#BA55D3", "#DA70D6", "#DDA0DD", "#DDA0DD", "#DDA0DD", "#DA70D6", "#BA55D3"],
      [null, "#DA70D6", "#DDA0DD", "#EE82EE", "#DDA0DD", "#DA70D6", null],
      [null, "#BA55D3", "#DA70D6", "#DDA0DD", "#DA70D6", "#BA55D3", null],
      [null, null, "#8A2BE2", "#BA55D3", "#8A2BE2", null, null],
      [null, null, null, "#8A2BE2", null, null, null]
    ]
  };

//pistils
const pistils = {
  pistil1: [
    [null, null, "#FFA500", null, null],
    [null, "#FFA500", "#FFD700", "#FFA500", null],
    [null, null, "#FFA500", null, null]
  ],
  pistil2: [
    [null, null, "#8A2BE2", null, null],
    [null, "#8A2BE2", "#DA70D6", "#8A2BE2", null],
    [null, null, "#8A2BE2", null, null]
  ],
  pistil3: [
    [null, "#90EE90", "#90EE90", "#90EE90", null],
    ["#90EE90", "#32CD32", "#ADFF2F", "#32CD32", "#90EE90"],
    [null, "#90EE90", "#ADFF2F", "#90EE90", null]
  ],
  pistil4: [
    [null, "#FFDAB9", "#FFE4B5", "#FFDAB9", null],
    ["#FFE4B5", "#FFFACD", "#FFFFE0", "#FFFACD", "#FFE4B5"],
    [null, "#FFDAB9", "#FFE4B5", "#FFDAB9", null]
  ]
};

//stems
const stems = {
  stem1: [
    ["#228B22"],
    ["#228B22"],
    ["#228B22"],
    ["#228B22"],
    ["#228B22"]
  ],
  stem2: [
    ["#006400"],
    ["#006400"],
    ["#006400"],
    ["#006400"],
    ["#006400"]
  ],
  stem3: [
    ["#556B2F"],
    ["#6B8E23"],
    ["#6B8E23"],
    ["#556B2F"],
    ["#556B2F"]
  ],
  stem4: [
    ["#2E8B57"],
    ["#3CB371"],
    ["#2E8B57"],
    ["#3CB371"],
    ["#2E8B57"]
  ]
};

//stem leaves
const leaves = {
  leaves1: [
    ["#228B22", null, "#228B22", null, "#228B22"],
    [null, "#228B22", "#228B22", "#228B22", null],
    [null, null, "#228B22", null, null]
  ],
  leaves2: [
    ["#006400", null, null, null, null],
    ["#006400", "#006400", "#006400", null, null]
  ],
  leaves3: [
    ["#6B8E23", "#6B8E23", null, "#6B8E23", "#6B8E23"],
    [null, "#556B2F", "#6B8E23", "#556B2F", null],
    [null, null, "#6B8E23", null, null]
  ],
  leaves4: [
    ["#90EE90", null, null, null, "#90EE90"],
    ["#90EE90", "#ADFF2F", null, "#ADFF2F", "#90EE90"],
    [null, "#90EE90", "#ADFF2F", "#90EE90", null]
  ]
};

// draw pixel on canvas
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

//MAIN CANVAS
function drawFlower() {
  mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);

  drawFromGrid(mainCtx, petals[selectedPetal], 4, 1);
  drawFromGrid(mainCtx, pistils[selectedPistil], 5, 3);
  drawFromGrid(mainCtx, stems[selectedStem], 7, 8);
  drawFromGrid(mainCtx, leaves[selectedLeaves], 5, 10);
}

//PETALS
//selection display
document.querySelectorAll("#petalOptions canvas").forEach(canvas => {
  const type = canvas.dataset.type;
  const ctx = canvas.getContext("2d");

//preview on selection display
  drawFromGrid(ctx, petals[type], 0, 0, 10);

//selection interaction
  canvas.addEventListener("click", () => {
    selectedPetal = type;
    document.querySelectorAll("#petalOptions canvas").forEach(c => c.classList.remove("selected"));
    canvas.classList.add("selected");
    drawFlower();
  });
});

//PISTILS
drawFlower();
document.querySelector(`[data-type="${selectedPetal}"]`).classList.add("selected");

document.querySelectorAll("#pistilOptions canvas").forEach(canvas => {
  const type = canvas.dataset.type;
  const ctx = canvas.getContext("2d");

  const grid = pistils[type];
  drawFromGrid(ctx, grid, 1, 1, 10);

  canvas.addEventListener("click", () => {
    selectedPistil = type;
    document.querySelectorAll("#pistilOptions canvas").forEach(c => c.classList.remove("selected"));
    canvas.classList.add("selected");
    drawFlower();
  });
});
document.querySelector(`[data-type="${selectedPistil}"]`).classList.add("selected");

//STEMS
document.querySelectorAll("#stemOptions canvas").forEach(canvas => {
  const type = canvas.dataset.type;
  const ctx = canvas.getContext("2d");

  const grid = stems[type];
  drawFromGrid(ctx, grid, 3, 1, 10);

  canvas.addEventListener("click", () => {
    selectedStem = type;
    document.querySelectorAll("#stemOptions canvas").forEach(c => c.classList.remove("selected"));
    canvas.classList.add("selected");
    drawFlower();
  });
});
document.querySelector(`[data-type="${selectedStem}"]`).classList.add("selected");

//STEM LEAVES
document.querySelectorAll("#leavesOptions canvas").forEach(canvas => {
  const type = canvas.dataset.type;
  const ctx = canvas.getContext("2d");

  const grid = leaves[type];
  drawFromGrid(ctx, grid, 1, 3, 10);

  canvas.addEventListener("click", () => {
    selectedLeaves = type;
    document.querySelectorAll("#leavesOptions canvas").forEach(c => c.classList.remove("selected"));
    canvas.classList.add("selected");
    drawFlower();
  });
});
document.querySelector(`[data-type="${selectedLeaves}"]`).classList.add("selected");

//button
document.getElementById("plantButton").addEventListener("click", () => {
  const flower = {
    petal: selectedPetal,
    pistil: selectedPistil,
    stem: selectedStem,
    leaves: selectedLeaves,
    timestamp: Date.now()
  };

  localStorage.setItem("plantedFlower", JSON.stringify(flower));

  window.location.href = "garden.html";
});


//firebase stuff
// const plantedFlowers = [];

// document.getElementById("plantButton").addEventListener("click", () => {
//   const flower = {
//     petal: selectedPetal,
//     pistil: selectedPistil,
//     stem: selectedStem,
//     leaves: selectedLeaves,
//     x,
//     y
//   };
//   plantedFlowers.push(flower);
// });