<script>
  import { getEnrollmentStatus,enrollUser,unEnrollUser } from './lib/canvasEnrol';

  let enrolled = getEnrollmentStatus();

  function startEnroll() {
    enrolled = enrollUser();
  }

  function startUnEnroll() {
    enrolled = unEnrollUser();
  }
</script>

{#if !enrolled}
  <button class="canvas-quick-enrol" on:click|preventDefault={startEnroll}>Quick Enroll</button>
{/if}

{#if enrolled}
  <button class="canvas-quick-enrol" on:click|preventDefault={startUnEnroll}>Unenroll</button>
{/if}


<style>
  button.canvas-quick-enrol {
    margin-left: 2rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
</style>
