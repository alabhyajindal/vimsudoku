<script lang="ts">
  import SmallCell from './SmallCell.svelte'

  export let pencilMode: boolean
  export let big

  console.log(big)
</script>

<div>
  {#each big as small, i}
    <SmallCell {pencilMode} {small} />
  {/each}
</div>

<style>
  div {
    border: 1px solid var(--dark-blue);
    aspect-ratio: 1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
</style>
