<script lang="ts">
  import { slide } from 'svelte/transition'
  import { puzzleCompleted, displayTime } from './store'
</script>

<aside>
  <div>
    {#if $puzzleCompleted}
      <div in:slide={{ duration: 1200 }} class="done">
        <p class="cong">congratulations!</p>
        <p>you completed the puzzle in {$displayTime}</p>
        <p>amazing!</p>
        <p class="next">press <code>y</code> to play again</p>
        <p>press <code>q</code> to exit</p>
        <p></p>
      </div>
    {:else}
      <div class="haiku">
        <p>blocks of nine await,</p>
        <p>each keystroke a careful step,</p>
        <p>one path to the end.</p>
      </div>
    {/if}
  </div>

  <div>
    <p class="sign">
      <a href="http://alabhyajindal.com" target="_blank">Alabhya Jindal</a>
    </p>
  </div>
</aside>

<style>
  aside {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 280px;
  }

  .haiku {
    line-height: 1.4;
  }

  .done {
    display: flex;
    flex-direction: column;
    gap: 0.4em;
  }

  .cong {
    font-weight: 600;
    font-size: 1.2em;
  }

  .next {
    margin-top: 2em;
  }
</style>
