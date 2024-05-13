import { derived, writable } from 'svelte/store'
import { generateData, generateNew } from './puzzleGenerator'

// export const bigCells = writable(generateData())
export const bigCells = writable(generateNew())
export const activeBigCell = writable(0)
export const activeSmallCell = writable(0)
export const pencilMode = writable(true)

// export const currentCell = derived(
//   [data, activeBigCell, activeSmallCell],
//   ([$data, $activeBigCell, $activeSmallCell]) =>
//     $data[$activeBigCell][$activeSmallCell]
// )
