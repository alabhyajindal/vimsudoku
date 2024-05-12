function generatePuzzle() {
  const grid = [...Array(9)].map(() => Array(9).fill(0))

  function backtrack(row: number, col: number) {
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

  function isValidPlacement(row: number, col: number, num: number) {
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

interface PencilMarks {
  value: number
  selected: boolean
}

interface Small {
  answer: number
  pencilMarks: PencilMarks[]
  value: '' | number
  active: boolean
  index: number
  prefilled: boolean
}

export function generateData() {
  const puzzle = generatePuzzle()

  let data = puzzle.map((p) => {
    return p.map((answer, index) => {
      const prefilled = Math.random() > 0.45
      const value = prefilled ? answer : ''
      const pencilMarks = Array.from({ length: 9 }).map((_, i) => ({
        value: i + 1,
        selected: false,
      }))

      const small: Small = {
        answer,
        pencilMarks,
        value,
        index,
        prefilled,
        active: false,
      }
      return small
    })
  })

  return data
}
