<script lang="ts">
  import clsx from 'clsx'
  import Sudoku from './lib/Sudoku.svelte'
  import {
    inputMode,
    mistakes,
    activeColumn,
    activeRow,
    elapsedTime,
    displayTime,
    numberIndicators,
    puzzleCompleted,
  } from './lib/store'
  import { onMount } from 'svelte'
  import Instructions from './lib/Instructions.svelte'
  import Haiku from './lib/Haiku.svelte'

  let timer = setInterval(() => {
    $elapsedTime += 1
  }, 1000)

  $: if ($puzzleCompleted) clearInterval(timer)

  onMount(() => {
    if (window.innerWidth < 1200) {
      alert(
        `Vim Sudoku looks best on screens wider than 1200 pixels. It may not look good on your screen which is ${window.innerWidth} pixels wide. Sorry!`
      )
    }
  })
</script>

<section>
  <Instructions />

  <main>
    <div class="top">
      <div>
        <h1>vim sudoku</h1>
      </div>
      <div class="top-right">
        <p class="mistakes">
          <span class="label">mistakes: </span>{$mistakes}/3
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

  <Haiku />
</section>

<!-- <Footer /> -->

<style>
  :global(*) {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  :global(body) {
    background-color: var(--background-blue);
    max-height: 100vh;
    color: var(--dark-blue);
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

  :global(::selection) {
    background-color: var(--bright-blue);
    color: white;
  }

  :global(aside) {
    font-weight: 450;
    font-size: 1em;
    align-self: stretch;
    margin-block: 1em;
  }

  :global(a) {
    color: var(--dark-blue);
  }

  :global(a:hover) {
    text-decoration: none;
  }

  :global(.hidden) {
    visibility: hidden;
  }

  :global(code) {
    background-color: var(--bright-blue);
    color: white;
    padding: 2px 4px;
    max-width: fit-content;
  }

  section {
    margin-inline: 4em;
    display: flex;
    justify-content: space-around;
    /* background-color: lightcoral; */
    height: 100vh;
  }

  main {
    margin-top: 2em;
    flex-shrink: 0;
    /* background-color: coral; */
    min-width: 600px;
    max-width: 35%;
    padding-inline: 0.4em;
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
    user-select: none;
    font-family: monospace;
    font-weight: 600;
    font-size: 1.3em;

    color: var(--bright-blue);

    margin-top: 1.6em;

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
    width: 7em;
  }
</style>
