<script lang="ts">
  import SmallCell from './SmallCell.svelte'

  export let big
  export let bigCellIndex
</script>

<div>
  {#each big as small, i}
    <SmallCell {small} {bigCellIndex} />
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
