import { derived, writable } from 'svelte/store'
import { generateData } from './puzzleGenerator'

export const data = writable(generateData())
export const activeBigCell = writable(0)
export const activeSmallCell = writable(0)
export const pencilMode = writable(false)

// export const currentCell = derived(
//   [data, activeBigCell, activeSmallCell],
//   ([$data, $activeBigCell, $activeSmallCell]) =>
//     $data[$activeBigCell][$activeSmallCell]
// )
