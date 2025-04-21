const PIXEL_SIZE = 20;

function drawPixel(ctx, x, y, color, size) {
  ctx.fillStyle = color;
  ctx.fillRect(x * size, y * size, size, size);
}

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

// Re-use flower parts (can modularize later if needed)
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
      }

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
      }

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
      }

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
      }

const flower = JSON.parse(localStorage.getItem("plantedFlower"));

if (flower) {
  drawFromGrid(ctx, petals[flower.petal], 5, 1);
  drawFromGrid(ctx, pistils[flower.pistil], 6, 3);
  drawFromGrid(ctx, stems[flower.stem], 7, 8);
  drawFromGrid(ctx, leaves[flower.leaves], 5, 10);
}

function drawGardenBackground(ctx, width, height) {
    ctx.fillStyle = "#eaffea";
    ctx.fillRect(0, 0, width, height);
  }
  
  const canvas = document.getElementById("gardenCanvas");
  const ctx = canvas.getContext("2d");
  
  drawGardenBackground(ctx, canvas.width, canvas.height);