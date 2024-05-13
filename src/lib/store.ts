import { derived, writable } from 'svelte/store'
import { createData } from './puzzleGenerator'

const data = createData()

// export const bigCells = writable(data.bigCells)
export const activeBigCell = writable(0)
export const activeSmallCell = writable(0)

// export const columns = writable(data.columns)
export const activeColumn = writable(0)

// export const rows = writable(data.rows)
export const activeRow = writable(0)

export const pencilMode = writable(true)

const newData = createData()

export const rows = writable(newData.rows)

export const bigCells = derived(rows, ($rows) => {
  const bigCells = []
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      const square = []
      for (let k = 0; k < 3; k++) {
        for (let l = 0; l < 3; l++) {
          square.push($rows[i + k][j + l])
        }
      }
      bigCells.push(square)
    }
  }
  return bigCells
})

// export const columns = derived(rows, ($rows) => {
//   const columns: number[][] = []
//   for (let col = 0; col < 9; col++) {
//     columns.push($rows.map((row) => row[col]))
//   }
//   return columns
// })

export const columns = writable(newData.columns)
