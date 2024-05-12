<script lang="ts">
  let answer: number | null

  export let pencilMode: boolean
  export let small
</script>

<div class={small.active ? 'small small-active' : 'small'}>
  <div class="answer">{small.value}</div>
  <div class="pencil-marks">
    {#each small.pencilMarks as mark}
      <div class="pencil-mark">
        {mark}
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
    background-color: var(--light-blue);
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
</style>
