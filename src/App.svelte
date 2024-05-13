<script lang="ts">
  import Sudoku from './lib/Sudoku.svelte'
  import { inputMode, mistakes, activeColumn, activeRow } from './lib/store'

  function formattedTime(elapsedSeconds: number) {
    const hours = Math.floor(elapsedSeconds / 3600)
    const remainingSeconds = elapsedSeconds % 3600

    const minutes = Math.floor(remainingSeconds / 60)
    const seconds = remainingSeconds % 60

    let formattedTime = ''

    if (hours) formattedTime += `${hours}h `
    if (minutes) formattedTime += `${minutes}m `
    formattedTime += `${seconds}s`

    return formattedTime.trim()
  }

  let elapsedTime = 0
  setInterval(() => {
    elapsedTime += 1
  }, 1000)
</script>

<section>
  <div class="side left">
    <div class="intro">
      <div class="guide">
        <p>
          <code>j, h, k, l</code> to navigate
        </p>
        <p>
          <code>&lt;C-&lsqb;&gt;</code>,
          <code>&lt;Esc&gt;</code> to switch modes
        </p>
        <p><code>1-9</code> to add values</p>
        <p><code>x</code> to erase</p>
      </div>
    </div>
  </div>

  <main>
    <div class="top">
      <div>
        <h1>Vim Sudoku</h1>
      </div>
      <div class="top-right">
        <p class="mistakes">
          <span class="label">Mistakes: </span>{$mistakes}/5
        </p>
        <p class="time">
          {formattedTime(elapsedTime)}
        </p>
      </div>
    </div>

    <Sudoku />

    <div class="bottom">
      <p class="mode-indicator">--{$inputMode}--</p>
      <div class="bottom-right">
        <p class="cell-indicator">{$activeRow + 1},{$activeColumn + 1}</p>
        <p class="content-indicator">All</p>
      </div>
    </div>
  </main>

  <div class="side right">
    <div class="right-inner">
      <div class="links">
        <ul>
          <li>
            <a
              href="https://superuser.com/questions/246487/how-to-use-vimtutor"
              target="_blank">Learn Vim</a
            >
          </li>
          <li>
            <a
              href="https://youtu.be/8zRXDsGydeQ?si=BQnRRL4y0SwHzsTe"
              target="_blank">Learn Sudoku</a
            >
          </li>
          <li>
            <a href="https://forms.gle/uvTWNFR6nzc8gC1A7" target="_blank"
              >Send feedback</a
            >
          </li>
        </ul>
      </div>
      <p class="sign">
        <a href="http://alabhyajindal.com" target="_blank">Alabhya Jindal</a>
      </p>
    </div>
  </div>
</section>

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
    --highlighted-bg: #dee2e6;
    --pencil-blue: #2f4157;
    --label-blue: #717f90;
  }

  section {
    display: flex;
  }

  ::selection {
    background-color: var(--bright-blue);
    color: white;
  }

  main {
    flex: 0 0 500px;
    max-width: 500px;
    margin-inline: auto;
    flex-grow: 1;
  }

  .side {
    flex: 0 1;
    min-width: 400px;
  }

  .links {
    margin-bottom: 5em;
  }

  .right {
    position: relative;
  }

  .links a {
    color: var(--dark-blue);
  }

  .links {
    color: var(--dark-blue);
    position: absolute;
    right: 0;
    color: var(--bright-blue);
  }

  .sign a {
    color: var(--bright-blue);
  }

  .sign {
    position: absolute;
    bottom: 0;
    font-weight: 500;

    right: 0;
    margin-bottom: 2em;
  }

  .top {
    color: var(--dark-blue);
    margin-bottom: 0.8em;
    font-weight: 600;
    font-size: 0.95em;
    display: flex;
    align-items: end;
    justify-content: space-between;
  }

  .top-right {
    display: flex;
    gap: 2em;
  }

  h1 {
    font-size: 1.4em;
    color: var(--title-black);
  }

  .time {
    display: flex;
    justify-content: end;
    position: relative;
    min-width: 5em;
  }

  .label {
    color: var(--label-blue);
  }

  li {
    list-style-type: none;
    margin-bottom: 0.4em;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  .bottom {
    font-family: monospace;
    font-weight: 700;
    font-size: 1.2em;

    color: var(--bright-blue);

    margin-block: 1em;
    padding-bottom: 1em;

    display: flex;
    align-items: center;
    justify-content: space-between;

    /* border-bottom: 1.6px solid var(--bright-blue); */
  }

  .bottom-right {
    display: flex;
    gap: 4em;
  }

  .mode-indicator {
    text-transform: uppercase;
  }

  .side {
    font-size: 1.1em;
    color: var(--dark-blue);
    margin-top: 3em;
    font-weight: 450;
  }

  code {
    background-color: var(--dark-blue);
    color: white;
    padding: 2px 4px;
    margin-inline: 4px;
    font-weight: 600;
  }

  .guide {
    font-size: 1em;
    display: flex;
    flex-direction: column;
    gap: 0.6em;
  }
</style>
