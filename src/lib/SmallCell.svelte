<script lang="ts">
  import { clsx } from 'clsx'
  import { pencilMode, activeColumn, activeRow } from './store'

  export let small
</script>

<div
  class={clsx({
    small: true,
    'small-active': small.active,
    incorrect: small.value !== small.answer,
    highlighted: small.index == $activeColumn || small.index2 == $activeRow,
  })}
>
  <div class="answer">
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
    border: 0.5px solid var(--dark-blue);
    aspect-ratio: 1;
    font-weight: 350;
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
  }

  .pencil-mark {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hidden {
    visibility: hidden;
  }

  .incorrect {
    color: var(--incorrect-red);
  }

  .highlighted {
    background-color: var(--highlighted-bg);
  }
</style>
