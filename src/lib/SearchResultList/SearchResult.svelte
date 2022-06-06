<script>
  export let searchResult

  let imageSrc = searchResult?.result_image
  let resultAction = searchResult?.result_action
  let resultTitle = searchResult?.result_text
</script>

<div class="flex items-center space-x-3 mb-5 last:mb-0">
  <img src="/images/nft-image.png" alt="Search result" class="max-w-[40px] rounded-lg" />
  <p><a href={resultAction}>Name of search result</a></p>
</div>
