<script lang="ts">
  let answer: number | null
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

  function addMarks(e: KeyboardEvent) {
    if (e.ctrlKey || e.shiftKey || e.metaKey) return
    e.preventDefault()

    const number = Number(e.key)
    if (marks[number - 1].selected == true) {
      answer = number
    } else if (number) {
      marks[number - 1].selected = true
      answer = null
    }
  }
</script>

<div class="small">
  <div class={answer ? 'answer' : 'answer hidden'}>{answer || ''}</div>
  <div class={answer ? 'pencil-marks hidden' : 'pencil-marks'}>
    {#each marks as mark}
      <div class={mark.selected ? 'pencil-mark' : 'pencil-mark hidden'}>
        {mark.value}
      </div>
    {/each}
  </div>
</div>

<svelte:window on:keydown={addMarks} />

<style>
  .small {
    border: 1px solid black;
    width: 100px;
    height: 100px;
    position: relative;
  }
  .answer {
    background-color: pink;
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
  }
  .pencil-mark {
    text-align: center;
    background-color: lightblue;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .hidden {
    visibility: hidden;
  }
</style>
