<script lang="ts">
  import Grid from './lib/Grid.svelte'
  import { pencilMode } from './lib/store'
</script>

<main>
  <Grid />
  <p class="mode-indicator">{$pencilMode ? 'pencil' : 'solve'}</p>
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
    --highlighted-bg: #d0d8df;
    --timer-gray: #94a3b7;
  }

  main {
    max-width: 500px;
    margin-inline: auto;
  }

  .mode-indicator {
    font-family: monospace;
    text-transform: uppercase;
    font-weight: 600;
    color: var(--dark-blue);
    margin-top: 1em;
    font-size: 1.2em;
  }
</style>
