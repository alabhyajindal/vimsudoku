<script lang="ts">
  let answer: number | null
  // let pencilMode = true
  export let pencilMode: boolean
  let marks = [
    {
      value: 1,
      selected: false,
    },
    {
      value: 2,
      selected: false,
    },
    {
      value: 3,
      selected: false,
    },
    {
      value: 4,
      selected: false,
    },
    {
      value: 5,
      selected: false,
    },
    {
      value: 6,
      selected: false,
    },
    {
      value: 7,
      selected: false,
    },
    {
      value: 8,
      selected: false,
    },
    {
      value: 9,
      selected: false,
    },
  ]

  function handleKeyDown(e: KeyboardEvent) {
    e.preventDefault()

    const number = Number(e.key)
    if (!number) return

    if (!pencilMode) {
      answer = number
    } else if (marks[number - 1].selected) {
      marks[number - 1].selected = false
      answer = null
    } else if (number) {
      marks[number - 1].selected = true
      answer = null
    }
  }
</script>

<div on:keydown={handleKeyDown} tabindex="1" class="small">
  <div class={answer ? 'answer' : 'answer hidden'}>{answer || ''}</div>
  <div class={answer ? 'pencil-marks hidden' : 'pencil-marks'}>
    {#each marks as mark}
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
    position: relative;
    font-weight: 350;
    color: var(--dark-blue);
    user-select: none;
    min-height: 100%;
  }

  .answer {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    z-index: -1;
  }
  .pencil-marks {
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    font-size: 0.8em;
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
