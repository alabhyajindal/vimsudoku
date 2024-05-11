<script lang="ts">
  import BigCell from './BigCell.svelte'
  import { data } from './store'

  export let pencilMode: boolean

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key == 'Escape') {
      e.preventDefault()
      pencilMode = !pencilMode
    }
  }

  console.log(($data[0][0].active = true))
</script>

<div>
  {#each $data as big, i}
    <BigCell {pencilMode} {big} />
  {/each}
</div>

<svelte:window on:keydown={handleKeyDown} />

<style>
  div {
    background-color: white;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border: 1px solid var(--dark-blue);
  }
</style>
