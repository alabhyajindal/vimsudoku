<script lang="ts">
  let answer: number
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
      return
    }
    if (number) marks[number - 1].selected = true
  }
</script>

<div class="small">
  <div class="answer">{answer || ''}</div>
  <div class="pencil-marks">
    {#each marks as mark}
      <div
        class={mark.selected ? 'pencil-mark' : 'pencil-mark pencil-mark-hidden'}
      >
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
  }
  .pencil-marks {
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .pencil-mark {
    text-align: center;
    background-color: lightgray;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .pencil-mark-hidden {
    visibility: hidden;
  }
</style>
