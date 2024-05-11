<script lang="ts">
  import Grid from './lib/Grid.svelte'
  let pencilMode = false

  function handleKeyDown(e: KeyboardEvent) {
    if ((e.ctrlKey && e.key == '[') || e.key == 'Escape') {
      pencilMode = !pencilMode
      return
    } else if (e.ctrlKey) {
      return
    }
  }
</script>

<p>{pencilMode ? 'pencil' : 'solve'}</p>
<main>
  <Grid {pencilMode} />
</main>
<svelte:window on:keydown={handleKeyDown} />

<style>
  :global(:root) {
    --background-blue: #d6ebfd;
    --light-blue: #bbdefb;
    --dark-blue: #344861;
    --bright-blue: #325aaf;
    --incorrect-red: #e55c6c;
    --title-black: #0f172a;
    --highlighted-row: #e2ebf3;
    --highlighted-number: #c3d7ea;
    --timer-gray: #94a3b7;
  }

  main {
    max-width: 500px;
  }
</style>
