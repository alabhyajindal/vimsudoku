<script lang="ts">
  import App from '../App.svelte'
  import BigCell from './BigCell.svelte'
  import {
    activeBigCell,
    activeSmallCell,
    bigCells,
    pencilMode,
    columns,
    activeColumn,
    activeRow,
    rows,
  } from './store'

  function navigate(e: KeyboardEvent) {
    if (e.key == 'j') {
      if ($activeRow + 1 <= 8) {
        $columns[$activeColumn][$activeRow].active = false
        $activeRow++
        $columns[$activeColumn][$activeRow].active = true
      }
    } else if (e.key == 'k') {
      if ($activeRow - 1 >= 0) {
        $columns[$activeColumn][$activeRow].active = false
        $activeRow--
        $columns[$activeColumn][$activeRow].active = true
      }
    } else if (e.key == 'l') {
      if ($activeColumn + 1 <= 8) {
        $rows[$activeRow][$activeColumn].active = false
        $activeColumn++
        $rows[$activeRow][$activeColumn].active = true
      }
    } else if (e.key == 'h') {
      if ($activeColumn - 1 <= 0) {
        $rows[$activeRow][$activeColumn].active = false
        $activeColumn--
        $rows[$activeRow][$activeColumn].active = true
      }
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

  // $: $bigCells[$activeBigCell][$activeSmallCell].active = true

  $: $columns[$activeColumn][$activeRow].active = true
  $: $rows[$activeRow][$activeColumn].active = true

  $: console.log($bigCells)
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
