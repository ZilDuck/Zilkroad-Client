<script>
  export let searchResult

  $:imageSrc = searchResult.result_image ?? '/images/nft-image.png'
  $:resultAction = searchResult.result_action ?? ''
  $:resultTitle = searchResult.result_text ?? ''
</script>

<div class="flex items-center space-x-3 mb-5 last:mb-0">
  {#if imageSrc}
    <img src={imageSrc} alt="Search result" class="max-w-[40px] rounded-lg" />
  {/if}
  <p><a href={resultAction}>{resultTitle}</a></p>
</div>
