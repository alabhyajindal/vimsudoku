<script lang="ts">
  let answer: number | null

  export let pencilMode: boolean
  export let small
</script>

<div class="small">
  <div class="answer">{small.value}</div>
  <div class={answer ? 'pencil-marks hidden' : 'pencil-marks'}>
    {#each small.pencilMarks as mark}
      <div class={mark.selected ? 'pencil-mark' : 'pencil-mark hidden'}>
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
</style>
