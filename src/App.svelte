<script>
  import { onMount } from 'svelte'
  function generatePuzzle() {
    const grid = [...Array(9)].map(() => Array(9).fill(0))

    function backtrack(row, col) {
      if (row === 9) return true
      if (col === 9) return backtrack(row + 1, 0)
      if (grid[row][col] !== 0) return backtrack(row, col + 1)

      const shuffledNumbers = Array.from({ length: 9 }, (_, i) => i + 1).sort(
        () => Math.random() - 0.5
      )

      for (const num of shuffledNumbers) {
        if (isValidPlacement(row, col, num)) {
          grid[row][col] = num
          if (backtrack(row, col + 1)) return true
          grid[row][col] = 0 // Backtrack
        }
      }
      return false // No valid placement found
    }

    function isValidPlacement(row, col, num) {
      for (let i = 0; i < 9; i++) {
        if (
          grid[row][i] === num ||
          grid[i][col] === num ||
          grid[Math.floor(row / 3) * 3 + Math.floor(i / 3)][
            Math.floor(col / 3) * 3 + (i % 3)
          ] === num
        ) {
          return false
        }
      }
      return true
    }

    backtrack(0, 0)

    // Create the big squares
    const bigSquares = []
    for (let i = 0; i < 9; i += 3) {
      for (let j = 0; j < 9; j += 3) {
        const square = []
        for (let k = 0; k < 3; k++) {
          for (let l = 0; l < 3; l++) {
            square.push(grid[i + k][j + l])
          }
        }
        bigSquares.push(square)
      }
    }

    return bigSquares
  }

  function fillPuzzlePartially() {
    const solvedPuzzle = generatePuzzle()
    const flatSolved = solvedPuzzle.flat()

    const randomIndexes = new Set()
    while (randomIndexes.size < 35) {
      randomIndexes.add(Math.floor(Math.random() * flatSolved.length))
    }
    const flatPuzzle = flatSolved.map((value, index) =>
      randomIndexes.has(index) ? null : value
    )
    onMount(() => {
      // a differnt approach is likely needed
      // the only one relied on data attributes to create the grid
      // there's a better way
    })
  }
  fillPuzzlePartially()
</script>

<h1>Svelte</h1>
<div class="container">
  <div class="big big-1">
    <div class="small big-1-small-1 a-1"></div>
    <div class="small big-1-small-2 b-1"></div>
    <div class="small big-1-small-3 c-1"></div>
    <div class="small big-1-small-4 a-2"></div>
    <div class="small big-1-small-5 b-2"></div>
    <div class="small big-1-small-6 c-2"></div>
    <div class="small big-1-small-7 a-3"></div>
    <div class="small big-1-small-8 b-3"></div>
    <div class="small big-1-small-9 c-3"></div>
  </div>
  <div class="big big-2">
    <div class="small big-2-small-1 d-1"></div>
    <div class="small big-2-small-2 e-1"></div>
    <div class="small big-2-small-3 f-1"></div>
    <div class="small big-2-small-4 d-2"></div>
    <div class="small big-2-small-5 e-2"></div>
    <div class="small big-2-small-6 f-2"></div>
    <div class="small big-2-small-7 d-3"></div>
    <div class="small big-2-small-8 e-3"></div>
    <div class="small big-2-small-9 f-3"></div>
  </div>
  <div class="big big-3">
    <div class="small big-3-small-1 g-1"></div>
    <div class="small big-3-small-2 h-1"></div>
    <div class="small big-3-small-3 i-1"></div>
    <div class="small big-3-small-4 g-2"></div>
    <div class="small big-3-small-5 h-2"></div>
    <div class="small big-3-small-6 i-2"></div>
    <div class="small big-3-small-7 g-3"></div>
    <div class="small big-3-small-8 h-3"></div>
    <div class="small big-3-small-9 i-3"></div>
  </div>
  <div class="big big-4">
    <div class="small big-4-small-1 a-4"></div>
    <div class="small big-4-small-2 b-4"></div>
    <div class="small big-4-small-3 c-4"></div>
    <div class="small big-4-small-4 a-5"></div>
    <div class="small big-4-small-5 b-5"></div>
    <div class="small big-4-small-6 c-5"></div>
    <div class="small big-4-small-7 a-6"></div>
    <div class="small big-4-small-8 b-6"></div>
    <div class="small big-4-small-9 c-6"></div>
  </div>
  <div class="big big-5">
    <div class="small big-5-small-1 d-4"></div>
    <div class="small big-5-small-2 e-4"></div>
    <div class="small big-5-small-3 f-4"></div>
    <div class="small big-5-small-4 d-5"></div>
    <div class="small big-5-small-5 e-5"></div>
    <div class="small big-5-small-6 f-5"></div>
    <div class="small big-5-small-7 d-6"></div>
    <div class="small big-5-small-8 e-6"></div>
    <div class="small big-5-small-9 f-6"></div>
  </div>
  <div class="big big-6">
    <div class="small big-6-small-1 g-4"></div>
    <div class="small big-6-small-2 h-4"></div>
    <div class="small big-6-small-3 i-4"></div>
    <div class="small big-6-small-4 g-5"></div>
    <div class="small big-6-small-5 h-5"></div>
    <div class="small big-6-small-6 i-5"></div>
    <div class="small big-6-small-7 g-6"></div>
    <div class="small big-6-small-8 h-6"></div>
    <div class="small big-6-small-9 i-6"></div>
  </div>
  <div class="big big-7">
    <div class="small big-7-small-1 a-7"></div>
    <div class="small big-7-small-2 b-7"></div>
    <div class="small big-7-small-3 c-7"></div>
    <div class="small big-7-small-4 a-8"></div>
    <div class="small big-7-small-5 b-8"></div>
    <div class="small big-7-small-6 c-8"></div>
    <div class="small big-7-small-7 a-9"></div>
    <div class="small big-7-small-8 b-9"></div>
    <div class="small big-7-small-9 c-9"></div>
  </div>
  <div class="big big-8">
    <div class="small big-8-small-1 d-7"></div>
    <div class="small big-8-small-2 e-7"></div>
    <div class="small big-8-small-3 f-7"></div>
    <div class="small big-8-small-4 d-8"></div>
    <div class="small big-8-small-5 e-8"></div>
    <div class="small big-8-small-6 f-8"></div>
    <div class="small big-8-small-7 d-9"></div>
    <div class="small big-8-small-8 e-9"></div>
    <div class="small big-8-small-9 f-9"></div>
  </div>
  <div class="big big-9">
    <div class="small big-9-small-1 g-7"></div>
    <div class="small big-9-small-2 h-7"></div>
    <div class="small big-9-small-3 i-7"></div>
    <div class="small big-9-small-4 g-8"></div>
    <div class="small big-9-small-5 h-8"></div>
    <div class="small big-9-small-6 i-8"></div>
    <div class="small big-9-small-7 g-9"></div>
    <div class="small big-9-small-8 h-9"></div>
    <div class="small big-9-small-9 i-9"></div>
  </div>
</div>
