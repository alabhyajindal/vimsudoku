export interface PencilMarks {
  value: number
  selected: boolean
}

export interface Small {
  answer: number
  pencilMarks: PencilMarks[]
  value: '' | number
  active: boolean
  prefilled: boolean
  highlighted: boolean
  columnIndex: number
  rowIndex: number
}

export function createData(): {
  bigCells: Small[][]
  columns: Small[][]
  rows: Small[][]
} {
  let grid = [...Array(9)].map(() => Array(9).fill(0))

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

  grid = addCellData(grid)

  // Create the big squares
  const bigCells = []
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      const square = []
      for (let k = 0; k < 3; k++) {
        for (let l = 0; l < 3; l++) {
          square.push(grid[i + k][j + l])
        }
      }
      bigCells.push(square)
    }
  }

  // Create nested arrays for columns and rows
  const columns = []
  for (let col = 0; col < 9; col++) {
    columns.push(grid.map((row) => row[col]))
  }

  const rows = grid

  return { bigCells, columns, rows }
}

function addCellData(grid: number[][]) {
  const result = grid.map((row, rowIndex) => {
    return row.map((answer, columnIndex) => {
      const prefilled = Math.random() > 0.25
      // const prefilled = Math.random() > 0.01
      const value = prefilled ? answer : ''
      const pencilMarks = Array.from({ length: 9 }).map((_, i) => ({
        value: i + 1,
        selected: false,
      }))

      const small: Small = {
        answer,
        pencilMarks,
        value,
        rowIndex,
        columnIndex,
        prefilled,
        active: false,
        highlighted: false,
      }
      return small
    })
  })
  return result
}

export function formatTime(elapsedSeconds: number) {
  const hours = Math.floor(elapsedSeconds / 3600)
  const remainingSeconds = elapsedSeconds % 3600

  const minutes = Math.floor(remainingSeconds / 60)
  const seconds = remainingSeconds % 60

  let formattedTime = ''

  if (hours) formattedTime += `${hours}h `
  if (minutes) formattedTime += `${minutes}m `
  formattedTime += `${seconds}s`

  return formattedTime.trim()
}

export function createNumberIndicators(columns: Small[][]) {
  let result: { value: number; count: number; completed: boolean }[] = []

  columns.forEach((column) => {
    column.forEach((cell) => {
      if (typeof result[cell.answer - 1] !== 'object') {
        result[cell.answer - 1] = {
          value: cell.answer,
          count: 0,
          completed: false,
        }
      }
      if (cell.answer == cell.value) {
        result[cell.answer - 1].count++
        if (result[cell.answer - 1].count == 9) {
          result[cell.answer - 1].completed = true
        }
      }
    })
  })

  return result
}

export function checkCompletion(columns: Small[][]) {
  let count = 0

  columns.forEach((column) => {
    column.forEach((cell) => {
      if (cell.answer == cell.value) count++
    })
  })
  if (count == 81) return true
  return false
}
