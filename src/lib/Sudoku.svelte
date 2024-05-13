<script lang="ts">
  import BigCell from './BigCell.svelte'
  import type { Small } from './puzzleGenerator'
  import {
    bigCells,
    pencilMode,
    columns,
    activeColumn,
    activeRow,
    rows,
    activeBigCell,
    mistakes,
  } from './store'

  function navigate(e: KeyboardEvent) {
    let columnCell = $columns[$activeColumn][$activeRow]
    let rowCell = $rows[$activeRow][$activeColumn]
    columnCell.active = false
    rowCell.active = false

    if (e.key == 'j') {
      if ($activeRow + 1 <= 8) {
        $activeRow++
      }
    } else if (e.key == 'k') {
      if ($activeRow - 1 >= 0) {
        $activeRow--
      }
    } else if (e.key == 'l') {
      if ($activeColumn + 1 <= 8) {
        $activeColumn++
      }
    } else if (e.key == 'h') {
      if ($activeColumn - 1 >= 0) {
        $activeColumn--
      }
    } else if (e.key == 'x') {
      if (!$columns[$activeColumn][$activeRow].prefilled) {
        $columns[$activeColumn][$activeRow].value = ''

        $columns[$activeColumn][$activeRow].pencilMarks = $columns[
          $activeColumn
        ][$activeRow].pencilMarks.map((v) => ({
          ...v,
          selected: false,
        }))
      }
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key == 'Escape' || (e.ctrlKey && e.key == '[')) {
      if ($pencilMode == 'pencil') $pencilMode = 'solve'
      else if ($pencilMode == 'solve') $pencilMode = 'pencil'
      else if ($pencilMode == 'cmd') $pencilMode = 'pencil'
    } else if (Number(e.key)) {
      if (!$columns[$activeColumn][$activeRow].prefilled) {
        if ($pencilMode == 'solve') {
          $columns[$activeColumn][$activeRow].value = Number(e.key)
          if (
            $columns[$activeColumn][$activeRow].value !==
            $columns[$activeColumn][$activeRow].answer
          ) {
            $mistakes++
          }

          $columns[$activeColumn][$activeRow].pencilMarks = $columns[
            $activeColumn
          ][$activeRow].pencilMarks.map((v) => ({
            ...v,
            selected: false,
          }))
        } else if ($pencilMode == 'pencil') {
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

  function checkCompletion(columns: Small[][]) {
    let count = 0
    columns.forEach((column) => {
      column.forEach((cell) => {
        if (cell.answer == cell.value) count++
      })
    })
    if (count == 81) return true
    return false
  }

  // $: if (checkCompletion($columns)) console.log('puzzle done')

  function getActiveBigCell(activeColumn: number, activeRow: number) {
    const bigCellRow = Math.floor(activeRow / 3)
    const bigCellCol = Math.floor(activeColumn / 3)

    return bigCellRow * 3 + bigCellCol
  }

  $: {
    $columns[$activeColumn][$activeRow].active = true
    $rows[$activeRow][$activeColumn].active = true
    $columns[$activeColumn][$activeRow].value =
      $columns[$activeColumn][$activeRow].value

    $activeBigCell = getActiveBigCell($activeColumn, $activeRow)
  }
</script>

<div>
  {#each $bigCells as big, i}
    <BigCell {big} bigCellIndex={i} />
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
