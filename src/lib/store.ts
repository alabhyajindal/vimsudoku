import { writable } from 'svelte/store'
import { generateData } from './puzzleGenerator'

export const data = writable(generateData())
export const activeBigCell = writable(0)
export const activeSmallCell = writable(0)
export const pencilMode = writable(false)
