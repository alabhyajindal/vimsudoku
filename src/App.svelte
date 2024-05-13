<script lang="ts">
  import Sudoku from './lib/Sudoku.svelte'
  import { inputMode, mistakes, activeColumn, activeRow } from './lib/store'

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

<section>
  <div class="side left">
    <div class="intro">
      <div class="guide">
        <p>
          <code>j, h, k, l</code> to navigate
        </p>
        <p>
          <code>&lt;C-&lsqb;&gt;</code>,
          <code>&lt;Esc&gt;</code> to switch modes
        </p>
        <p><code>1-9</code> to add values</p>
        <p><code>x</code> to erase</p>
      </div>
    </div>
  </div>

  <main>
    <div class="top">
      <div>
        <h1>Vim Sudoku</h1>
      </div>
      <div class="top-right">
        <p class="mistakes">
          <span class="label">Mistakes: </span>{$mistakes}/5
        </p>
        <p class="time">
          {formattedTime(elapsedTime)}
        </p>
      </div>
    </div>

    <Sudoku />

    <div class="vim-bottom">
      <div class="bottom">
        <p class="mode-indicator">--{$inputMode}--</p>
        <div class="bottom-right">
          <p class="cell-indicator">{$activeRow + 1},{$activeColumn + 1}</p>
          <p class="content-indicator">All</p>
        </div>
      </div>
    </div>
  </main>

  <div class="side right">
    <p><a href="https://forms.gle/uvTWNFR6nzc8gC1A7">Feedback?</a></p>
    <p class="sign">Alabhya Jindal</p>
  </div>
</section>

<style>
  :global(*) {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  :global(body) {
    background-color: var(--background-blue);
    padding-top: 3em;
    padding-inline: 4em;
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

  section {
    display: flex;
  }

  main {
    flex: 0 0 500px;
    max-width: 500px;
    margin-inline: auto;
    flex-grow: 1;
  }

  .side {
    flex: 0 1;
    min-width: 400px;
  }

  .right {
    text-align: right;
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
    min-width: 5em;
  }

  .label {
    opacity: 60%;
  }

  .vim-bottom {
    font-family: monospace;
    font-weight: 600;
    font-size: 1.2em;
  }

  .bottom {
    background-color: var(--dark-blue);
    color: white;
    margin-top: 1em;

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

  .side {
    color: var(--title-black);
    margin-top: 4em;
    font-weight: 450;
  }

  .sign {
  }

  code {
    background-color: var(--dark-blue);
    color: white;
    padding: 2px 4px;
    margin-inline: 4px;
    font-weight: 600;
  }

  .intro {
  }

  /* .intro > p:first-child {
    font-size: 1.2em;
    font-weight: 500;
    margin-bottom: 1.6em;
  } */

  .guide {
    font-size: 1em;
    display: flex;
    flex-direction: column;
    gap: 0.6em;
  }
</style>
