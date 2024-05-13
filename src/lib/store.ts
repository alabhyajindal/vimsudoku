import { derived, writable } from 'svelte/store'
import { createData, type Small } from './puzzleGenerator'

export const activeBigCell = writable(0)
export const activeSmallCell = writable(0)

export const activeColumn = writable(0)
export const activeRow = writable(0)

export const pencilMode = writable(false)

const data = createData()
export const rows = writable<Small[][]>(data.rows)
export const columns = writable<Small[][]>(data.columns)
// export const bigCells = writable<Small[][]>(data.bigCells)

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
