import { derived, writable } from 'svelte/store'
import { createData } from './puzzleGenerator'

const data = createData()

export const bigCells = writable(data.bigCells)
export const activeBigCell = writable(0)
export const activeSmallCell = writable(0)

export const columns = writable(data.columns)
export const activeColumn = writable(0)

export const rows = writable(data.rows)
export const activeRow = writable(0)

export const pencilMode = writable(true)

// export const currentCell = derived(
//   [data, activeBigCell, activeSmallCell],
//   ([$data, $activeBigCell, $activeSmallCell]) =>
//     $data[$activeBigCell][$activeSmallCell]
// )
