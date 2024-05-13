<script lang="ts">
  import BigCell from './BigCell.svelte'
  import { activeBigCell, activeSmallCell, bigCells, pencilMode } from './store'

  function navigate(e: KeyboardEvent) {
    if (e.key == 'j') {
      if ($activeBigCell >= 6 && $activeSmallCell >= 6) return
      $bigCells[$activeBigCell][$activeSmallCell].active = false
      if ($activeSmallCell >= 6) {
        $activeBigCell += 3
        $activeSmallCell -= 6
      } else $activeSmallCell += 3
    } else if (e.key == 'k') {
      if ($activeBigCell == 0 && $activeSmallCell <= 2) return
      $bigCells[$activeBigCell][$activeSmallCell].active = false

      if ($activeSmallCell <= 2) {
        $activeBigCell -= 3
        $activeSmallCell += 6
      } else $activeSmallCell -= 3
    } else if (e.key == 'l') {
      if (
        ($activeBigCell == 2 || $activeBigCell == 5 || $activeBigCell == 8) &&
        ($activeSmallCell == 2 ||
          $activeSmallCell == 5 ||
          $activeSmallCell == 8)
      )
        return
      $bigCells[$activeBigCell][$activeSmallCell].active = false

      if (
        $activeSmallCell == 2 ||
        $activeSmallCell == 5 ||
        $activeSmallCell == 8
      ) {
        $activeBigCell++
        $activeSmallCell -= 2
      } else $activeSmallCell++
    } else if (e.key == 'h') {
      if (
        ($activeBigCell == 0 || $activeBigCell == 3 || $activeBigCell == 6) &&
        ($activeSmallCell == 0 ||
          $activeSmallCell == 3 ||
          $activeSmallCell == 6)
      )
        return
      $bigCells[$activeBigCell][$activeSmallCell].active = false

      if (
        $activeSmallCell == 0 ||
        $activeSmallCell == 3 ||
        $activeSmallCell == 6
      ) {
        $activeBigCell--
        $activeSmallCell += 2
      } else $activeSmallCell--
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key == 'Escape' || (e.ctrlKey && e.key == '[')) {
      $pencilMode = !$pencilMode
    } else if (Number(e.key)) {
      if (!$bigCells[$activeBigCell][$activeSmallCell].prefilled) {
        if (!$pencilMode) {
          $bigCells[$activeBigCell][$activeSmallCell].pencilMarks = $bigCells[
            $activeBigCell
          ][$activeSmallCell].pencilMarks.map((v) => ({
            ...v,
            selected: false,
          }))
          $bigCells[$activeBigCell][$activeSmallCell].value = Number(e.key)
        } else if ($pencilMode) {
          $bigCells[$activeBigCell][$activeSmallCell].value = ''
          $bigCells[$activeBigCell][$activeSmallCell].pencilMarks[
            Number(e.key) - 1
          ].selected =
            !$bigCells[$activeBigCell][$activeSmallCell].pencilMarks[
              Number(e.key) - 1
            ].selected
        }
      }
    } else {
      navigate(e)
    }
  }

  $: $bigCells[$activeBigCell][$activeSmallCell].active = true
</script>

<div>
  {#each $bigCells as big, i}
    <BigCell {big} />
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
