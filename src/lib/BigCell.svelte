<script lang="ts">
  import SmallCell from './SmallCell.svelte'

  export let big
</script>

<div>
  {#each big as small, i}
    <SmallCell {small} />
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
