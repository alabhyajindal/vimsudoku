<script lang="ts">
  import BigCell from './BigCell.svelte'
  import type { Small } from './helpers'
  import {
    bigCells,
    inputMode,
    columns,
    activeColumn,
    activeRow,
    rows,
    activeBigCell,
    mistakes,
    displayTime,
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
      if ($inputMode == 'pencil') $inputMode = 'solve'
      else if ($inputMode == 'solve') $inputMode = 'pencil'
      else if ($inputMode == 'cmd') $inputMode = 'pencil'
    } else if (Number(e.key)) {
      if (!$columns[$activeColumn][$activeRow].prefilled) {
        if ($inputMode == 'solve') {
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
        } else if ($inputMode == 'pencil') {
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
    if (count == 81) {
      alert(`Congratulations! You completed the game in ${$displayTime}`)
    }
    return false
  }

  function checkMistakes(mistakes: number) {
    if (mistakes == 5) {
      alert('Game over. Press <CR> to start a new game.')
      window.location.reload()
    }
  }

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

    checkCompletion($columns)
    checkMistakes($mistakes)
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
