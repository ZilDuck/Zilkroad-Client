<script context="module">
  export function load({ error, status }) {
    return {
      props: {
        title: `${status}: ${error.message}`
      }
    }
  }
</script>

<script>
  export let title;
</script>

<main class="space-y-28 mx-5">
  <div class="mx-auto max-w-screen-xl">
    <h1 class="text-5xl text-center pt-20">{title}</h1>
  </div>
</main>