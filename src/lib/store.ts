import { writable } from 'svelte/store'
import { generateData } from './puzzleGenerator'

export const data = writable(generateData())
