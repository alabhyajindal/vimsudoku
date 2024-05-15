<script lang="ts">
  import clsx from 'clsx'
  import BigCell from './BigCell.svelte'
  import {
    bigCells,
    inputMode,
    columns,
    activeColumn,
    activeRow,
    rows,
    activeBigCell,
    mistakes,
    puzzleCompleted,
  } from './store'

  let gCount = 0
  let gTime = 0

  function processCommands(e: KeyboardEvent) {
    let columnCell = $columns[$activeColumn][$activeRow]
    let rowCell = $rows[$activeRow][$activeColumn]
    columnCell.active = false
    rowCell.active = false

    if (e.key == 'j' || e.key == 'ArrowDown') {
      if ($activeRow + 1 <= 8) {
        $activeRow++
      }
    } else if (e.key == 'k' || e.key == 'ArrowUp') {
      if ($activeRow - 1 >= 0) {
        $activeRow--
      }
    } else if (e.key == 'l' || e.key == 'ArrowRight') {
      if ($activeColumn + 1 <= 8) {
        $activeColumn++
      }
    } else if (e.key == 'h' || e.key == 'ArrowLeft') {
      if ($activeColumn - 1 >= 0) {
        $activeColumn--
      }
    } else if (e.key == 'x' || e.key == 'Delete') {
      if (!$columns[$activeColumn][$activeRow].prefilled) {
        $columns[$activeColumn][$activeRow].value = ''

        $columns[$activeColumn][$activeRow].pencilMarks = $columns[
          $activeColumn
        ][$activeRow].pencilMarks.map((v) => ({
          ...v,
          selected: false,
        }))
      }
    } else if (e.key == 'L' || e.key == 'G') {
      $activeRow = 8
    } else if (e.key == 'H') {
      $activeRow = 0
    } else if (e.key == 'M') {
      $activeRow = 4
    } else if (e.key == '0') {
      $activeColumn = 0
    } else if (e.key == '$') {
      $activeColumn = 8
    } else if (e.key == 'g') {
      gCount++
      if (gCount < 2) {
        gTime = new Date().getTime()
      } else if (gCount == 2) {
        gCount = 0
        const currentTime = new Date().getTime()
        if (currentTime - gTime < 700) {
          $activeRow = 0
        }
      }
    } else if (e.key == 'w') {
      function findNext(comingFromPrevious: boolean) {
        const nextEmptyColumn = $rows[$activeRow].findIndex((row) => {
          const result =
            (row.value == '' || row.value !== row.answer) &&
            (row.columnIndex > $activeColumn || comingFromPrevious)
          return result
        })

        if (nextEmptyColumn >= 0) {
          $activeColumn = nextEmptyColumn
        } else {
          if ($activeRow + 1 <= 8) {
            $activeRow++
            $activeColumn = 0
            findNext(true)
          }
        }
      }

      findNext(false)
    } else if (e.key == 'b') {
      function findPrevious(comingFromNext: boolean) {
        const previousEmptyColumn = $rows[$activeRow].findLastIndex((row) => {
          const result =
            (row.value == '' || row.value !== row.answer) &&
            (row.columnIndex < $activeColumn || comingFromNext)
          return result
        })

        if (previousEmptyColumn >= 0) {
          $activeColumn = previousEmptyColumn
        } else {
          if ($activeRow - 1 >= 0) {
            $activeRow--
            $activeColumn = 0
            findPrevious(true)
          }
        }
      }

      findPrevious(false)
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if ($puzzleCompleted) {
      if (e.key == 'y') {
        window.location.reload()
      } else if (e.key == 'q') {
        window.close()
      } else {
        return
      }
    }

    if (e.key == 'Escape' || (e.ctrlKey && e.key == '[')) {
      if ($inputMode == 'pencil') $inputMode = 'solve'
      else if ($inputMode == 'solve') $inputMode = 'pencil'
      else if ($inputMode == 'cmd') $inputMode = 'pencil'
    } else if (Number(e.key) && e.key !== '0') {
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
      processCommands(e)
    }
  }

  function checkMistakes(mistakes: number) {
    setTimeout(() => {
      if (mistakes == 3) {
        alert('Game over. Press <CR> to start a new game.')
        window.location.reload()
      }
    }, 1)
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

    checkMistakes($mistakes)
  }
</script>

<div class={clsx({ animate: $puzzleCompleted })}>
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

  @keyframes bounce {
    0% {
      transform: translateY(0%);
    }
    50% {
      transform: translateY(-0.8%);
    }
    100% {
      transform: translateY(0%);
    }
  }

  .animate {
    animation: bounce 1s infinite;
  }
</style>
