<script>
  let enrolled = true;
</script>

{#if !enrolled}
  <button class="canvas-quick-enrol">Quick Enroll</button>
{/if}

{#if enrolled}
  <button class="canvas-quick-enrol">Unenroll</button>
{/if}


<style>
  button.canvas-quick-enrol {
    margin-left: 2rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
</style>
