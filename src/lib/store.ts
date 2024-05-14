import { derived, writable } from 'svelte/store'
import {
  checkCompletion,
  createData,
  createNumberIndicators,
  formatTime,
  type Small,
} from './helpers'

export const activeBigCell = writable(0)
export const activeSmallCell = writable(0)

export const activeColumn = writable(0)
export const activeRow = writable(0)

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

export const inputMode = writable('pencil')

export const mistakes = writable(0)

export const command = writable('')

export const elapsedTime = writable(0)

export const displayTime = derived(elapsedTime, ($elapsedTime) =>
  formatTime($elapsedTime)
)

export const numberIndicators = derived(columns, ($columns) =>
  createNumberIndicators($columns)
)

export const puzzleCompleted = derived(columns, ($columns) =>
  checkCompletion($columns)
)
