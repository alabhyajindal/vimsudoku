<script lang="ts">
  import Grid from './lib/Grid.svelte'
  let pencilMode = false
</script>

<main>
  <!-- <p>{pencilMode ? 'pencil' : 'solve'}</p> -->
  <Grid {pencilMode} />
</main>

<style>
  :global(*) {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  :global(body) {
    background-color: var(--background-blue);
    padding-top: 3em;
    padding-inline: 2em;
  }

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
    margin-inline: auto;
  }
</style>
