<script>
  import { canvasDetails } from "./lib/canvasDetails";

  // display nothing if homePage is false
  let homePage = false;
  // if homePage then display
  // - waiting button while waiting for async Canvas API calls to finish
  // - enroll button if user is enrolled in the current course
  // - unenroll button if user is not enrolled
  let enrolled = null;

  // set homePage to true if the pathname is /courses/<courseId>
  const href = location.pathname;
  if (href.match(/^\/courses\/\d+\/*$/)) {
    homePage = true;
  }

  // callBack function called when async Canvas API calls finish
  // assigns the results resulting in reactive change 
  const checkEnroll = function () {
    enrolled = canvas.getEnrollmentStatus();
    // reload the page so that student view is visible/invisible
  };

  // create the canvas details object that does all the hard work
  let canvas = new canvasDetails(checkEnroll);

  // onclick functions
  function startEnroll() {
    enrolled = canvas.enrollUser();
  }

  function startUnEnroll() {
    enrolled = canvas.unEnrollUser();
  }
</script>

{#if homePage}
  {#if enrolled === null}
    <button disabled class="canvas-quick-enrol">Waiting...</button>
  {/if}

  {#if enrolled === false}
    <button class="canvas-quick-enrol" on:click|preventDefault={startEnroll}>Quick Enroll</button
    >
  {/if}

  {#if enrolled === true}
    <button class="canvas-quick-enrol" on:click|preventDefault={startUnEnroll}>Unenroll</button>
  {/if}
{/if}

<style>
  button.canvas-quick-enrol {
    margin-left: 2rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
</style>
