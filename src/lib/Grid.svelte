<script lang="ts">
  import BigCell from './BigCell.svelte'
  import { activeBigCell, activeSmallCell, data } from './store'

  export let pencilMode: boolean

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key == 'Escape') {
      e.preventDefault()
      pencilMode = !pencilMode
    } else if (e.key == 'j') {
      if ($activeBigCell == 6 && $activeSmallCell >= 6) return
      $data[$activeBigCell][$activeSmallCell].active = false
      if ($activeSmallCell >= 6) {
        $activeBigCell += 3
        $activeSmallCell = 0
      } else $activeSmallCell += 3
    } else if (e.key == 'k') {
      if ($activeBigCell == 0 && $activeSmallCell == 0) return
      $data[$activeBigCell][$activeSmallCell].active = false

      if ($activeSmallCell == 0) {
        $activeBigCell -= 3
        $activeSmallCell = 9
      }
      $activeSmallCell -= 3
    } else if (e.key == 'l') {
      if ($activeBigCell == 2 && $activeSmallCell == 2) return
      $data[$activeBigCell][$activeSmallCell].active = false

      if (
        $activeSmallCell == 2 ||
        $activeSmallCell == 5 ||
        $activeSmallCell == 8
      ) {
        $activeBigCell++
        $activeSmallCell = 0
      } else $activeSmallCell++
    }
  }

  $: $data[$activeBigCell][$activeSmallCell].active = true
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
