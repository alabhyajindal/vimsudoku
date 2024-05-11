import { writable } from 'svelte/store'
import { generatePuzzle } from './puzzleGenerator'

export const puzzle = writable(generatePuzzle())
