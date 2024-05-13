<script lang="ts">
  import Sudoku from './lib/Sudoku.svelte'
  import { pencilMode, mistakes, activeColumn, activeRow } from './lib/store'

  function formattedTime(elapsedSeconds: number) {
    const hours = Math.floor(elapsedSeconds / 3600)
    const remainingSeconds = elapsedSeconds % 3600

    const minutes = Math.floor(remainingSeconds / 60)
    const seconds = remainingSeconds % 60

    let formattedTime = ''

    if (hours) formattedTime += `${hours}h `
    if (minutes) formattedTime += `${minutes}m `
    formattedTime += `${seconds}s`

    return formattedTime.trim()
  }

  let elapsedTime = 0
  setInterval(() => {
    elapsedTime += 1
  }, 1000)
</script>

<main>
  <div class="top">
    <div>
      <h1>Vim Sudoku</h1>
    </div>
    <div class="top-right">
      <p class="mistakes"><span class="label">Mistakes: </span>{$mistakes}/5</p>
      <p class="time">
        {formattedTime(elapsedTime)}
      </p>
    </div>
  </div>

  <Sudoku />

  <div class="bottom">
    <p class="mode-indicator">--{$pencilMode ? 'pencil' : 'solve'}--</p>
    <div class="bottom-right">
      <p class="cell-indicator">{$activeRow + 1},{$activeColumn + 1}</p>
      <p class="content-indicator">All</p>
    </div>
  </div>
</main>

<style>
  :global(*) {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  :global(body) {
    background-color: var(--background-blue);
    padding-top: 3em;
    padding-inline: 2em;
  }

  :global(:root) {
    --background-blue: #d6ebfd;
    --light-blue: #bbdefb;
    --dark-blue: #344861;
    --bright-blue: #325aaf;
    --incorrect-red: #e55c6c;
    --title-black: #0f172a;
    --highlighted-bg: #dee2e6;
    --pencil-blue: #2f4157;
  }

  main {
    max-width: 500px;
    margin-inline: auto;
  }

  .top {
    color: var(--dark-blue);
    margin-bottom: 0.8em;
    font-weight: 600;
    font-size: 0.95em;
    display: flex;
    align-items: end;
    justify-content: space-between;
  }

  .top-right {
    display: flex;
    gap: 2em;
  }

  h1 {
    font-size: 1.4em;
    color: var(--title-black);
  }

  .time {
    display: flex;
    justify-content: end;
    position: relative;
    min-width: 7em;
  }

  .label {
    opacity: 60%;
  }

  .bottom {
    font-family: monospace;
    background-color: var(--dark-blue);
    color: white;
    margin-top: 1em;
    font-weight: 600;
    font-size: 1.2em;
    padding: 2px;
    padding-top: 4px;
    padding-inline: 4px;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .bottom-right {
    display: flex;
    gap: 4em;
  }

  .mode-indicator {
    text-transform: uppercase;
  }
</style>
