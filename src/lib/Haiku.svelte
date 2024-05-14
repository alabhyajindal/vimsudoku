<script lang="ts">
  import clsx from 'clsx'
  import { puzzleCompleted, displayTime } from './store'
</script>

<aside>
  <div>
    {#if $puzzleCompleted}
      <div class="done">
        <p class="cong">congratulations!</p>
        <p>you completed the puzzle in {$displayTime}</p>
        <p>press <code>y</code> if you want to play again</p>
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

  a {
    color: var(--bright-blue);
  }

  .done {
    display: flex;
    flex-direction: column;
    gap: 0.4em;
    font-weight: 500;
  }

  .cong {
    font-weight: 600;
    font-size: 1.2em;
  }
</style>
