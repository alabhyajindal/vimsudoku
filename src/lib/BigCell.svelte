<script lang="ts">
  import SmallCell from './SmallCell.svelte'
  export let pencilMode: boolean
</script>

<div>
  {#each { length: 9 } as _, i}
    <SmallCell {pencilMode} />
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
