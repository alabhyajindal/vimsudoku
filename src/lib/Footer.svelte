<footer>
  <div>
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
    <p class="sign">
      <a href="http://alabhyajindal.com" target="_blank">Alabhya Jindal</a>
    </p>
  </div>
</footer>

<style>
  a {
    color: var(--dark-blue);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 1em;
    font-weight: 500;
  }

  footer div:first-child {
    display: flex;
    justify-content: space-between;
  }

  footer ul {
    display: flex;
    list-style-type: none;
    gap: 1em;
  }

  .sign a {
    color: var(--bright-blue);
  }
</style>
