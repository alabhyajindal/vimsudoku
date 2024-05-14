<script lang="ts">
  import { clsx } from 'clsx'
  import {
    activeColumn,
    activeRow,
    activeBigCell,
    columns,
    puzzleCompleted,
  } from './store'

  export let small
  export let bigCellIndex
</script>

<div
  class={clsx({
    small: true,
    'small-active': small.active,
    incorrect: small.value !== small.answer && small.answer !== '',
    'selected-number':
      small.value !== '' &&
      small.value == $columns[$activeColumn][$activeRow].value,
    highlighted:
      small.columnIndex == $activeColumn ||
      small.rowIndex == $activeRow ||
      bigCellIndex == activeBigCell ||
      $activeBigCell == bigCellIndex,
  })}
>
  <div
    class={clsx({
      // animate: $puzzleCompleted,
      answer: true,
    })}
  >
    {small.value}
  </div>
  <div
    class={clsx({
      'pencil-marks': true,
      hidden: small.value,
    })}
  >
    {#each small.pencilMarks as mark}
      <div class={clsx({ 'pencil-mark': true, hidden: !mark.selected })}>
        {mark.value}
      </div>
    {/each}
  </div>
</div>

<style>
  .small {
    border: 0.5px solid var(--small-border-gray);
    aspect-ratio: 1;
    font-weight: 400;
    color: var(--dark-blue);
    user-select: none;
    min-height: 100%;
    position: relative;
  }

  .small-active {
    background-color: var(--light-blue) !important;
  }

  .answer {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    z-index: 1;
  }

  .pencil-marks {
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    font-size: 0.8em;
    z-index: 2;
    font-weight: 600;
    color: var(--pencil-blue);
  }

  .pencil-mark {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .incorrect {
    color: var(--incorrect-red);
  }

  .highlighted {
    background-color: var(--highlighted-bg);
  }

  .selected-number {
    background-color: var(--number-bg);
  }

  /* @keyframes scale {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(1.1);
    }
    50% {
      transform: scale(1.15);
    }
    75% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  .animate {
    animation: scale 0.6s infinite;
  } */
</style>
