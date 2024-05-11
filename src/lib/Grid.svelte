<script lang="ts">
  import BigCell from './BigCell.svelte'
  export let pencilMode: boolean
</script>

<div>
  {#each { length: 9 } as _, i}
    <BigCell {pencilMode} />
  {/each}
</div>

<style>
  div {
    background-color: white;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border: 1px solid var(--dark-blue);
  }
</style>
