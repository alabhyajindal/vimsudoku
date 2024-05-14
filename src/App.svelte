<script lang="ts">
  import clsx from 'clsx'
  import Sudoku from './lib/Sudoku.svelte'
  import type { Small } from './lib/helpers'
  import {
    inputMode,
    mistakes,
    activeColumn,
    activeRow,
    elapsedTime,
    displayTime,
    numberIndicators,
  } from './lib/store'
  import Footer from './lib/Footer.svelte'

  setInterval(() => {
    $elapsedTime += 1
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
          {$displayTime}
        </p>
      </div>
    </div>

    <Sudoku />

    <div class="bottom">
      <p class="mode-indicator">--{$inputMode}--</p>
      <div class="number-indicators">
        {#each $numberIndicators as number}
          <p class={clsx({ completed: number.completed })}>
            {number.value}
          </p>
        {/each}
      </div>
      <p class="cell-indicator">{$activeRow + 1},{$activeColumn + 1}</p>
    </div>
  </main>
</section>

<Footer />

<style>
  :global(*) {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  :global(body) {
    background-color: var(--background-blue);
    padding-top: 3em;
    height: 100vh;
  }

  :global(:root) {
    --background-blue: #d6ebfd;
    --light-blue: #a6d4fa;
    --dark-blue: #344861;
    --bright-blue: #325aaf;
    --incorrect-red: #e55c6c;
    --title-black: #0f172a;
    --pencil-blue: #2f4157;
    --label-blue: #717f90;
    --highlighted-bg: #d6deef;
    --number-bg: #c2cee7;
  }

  section {
    margin-inline: 2em;
  }

  :global(::selection) {
    background-color: var(--bright-blue);
    color: white;
  }

  main {
    flex: 0 1;
    max-width: 35%;
    margin-inline: auto;
    flex-grow: 1;
  }

  .side {
    position: fixed;
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
    color: var(--label-blue);
  }

  .completed {
    background-color: var(--bright-blue);
  }

  .bottom {
    font-family: monospace;
    font-weight: 700;
    font-size: 1.2em;

    color: var(--bright-blue);

    margin-block: 1em;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .number-indicators {
    display: flex;
    gap: 1.8em;
  }

  .mode-indicator {
    text-transform: uppercase;
  }

  .side {
    color: var(--dark-blue);
    margin-top: 3em;
    font-weight: 450;
  }

  code {
    background-color: var(--dark-blue);
    color: white;
    padding: 2px 4px;
    margin-inline: 4px;
    font-weight: 600;
  }

  .guide {
    font-size: 1em;
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
</style>
