import { derived, writable } from 'svelte/store'
import { createData } from './puzzleGenerator'

export const bigCells = writable(createData().bigCells)
export const activeBigCell = writable(0)
export const activeSmallCell = writable(0)
export const pencilMode = writable(true)

// export const currentCell = derived(
//   [data, activeBigCell, activeSmallCell],
//   ([$data, $activeBigCell, $activeSmallCell]) =>
//     $data[$activeBigCell][$activeSmallCell]
// )
