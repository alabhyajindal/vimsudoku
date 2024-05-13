<script lang="ts">
  import BigCell from './BigCell.svelte'
  import {
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
      if ($activeColumn - 1 >= 0) {
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
      if (!$columns[$activeColumn][$activeRow].prefilled) {
        if (!$pencilMode) {
          $columns[$activeColumn][$activeRow].value = Number(e.key)
          $columns[$activeColumn][$activeRow].pencilMarks = $columns[
            $activeColumn
          ][$activeRow].pencilMarks.map((v) => ({
            ...v,
            selected: false,
          }))
        } else if ($pencilMode) {
          $columns[$activeColumn][$activeRow].value = ''
          $columns[$activeColumn][$activeRow].pencilMarks[
            Number(e.key) - 1
          ].selected =
            !$columns[$activeColumn][$activeRow].pencilMarks[Number(e.key) - 1]
              .selected
        }
      }
    } else {
      navigate(e)
    }
  }

  $: {
    $columns[$activeColumn][$activeRow].active = true
    $rows[$activeRow][$activeColumn].active = true
    $columns[$activeColumn][$activeRow].value =
      $columns[$activeColumn][$activeRow].value
  }
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
