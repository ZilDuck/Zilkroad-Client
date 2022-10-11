<script>
  import { cdnBaseUrl } from '../../lib/cdn'

  export let searchResult
  
  // Leaving this in, just in case Nic hates me and I've changed things
  // $:imageSrc = searchResult.result_image ?? '/images/nft-image.png'
  $:imageSrc = cdnBaseUrl + searchResult.nonfungible_address + '?optimizer=image&width=800' ?? '/images/nft-image.png'
  $:resultAction = searchResult.result_action ?? ''
  $:resultTitle = searchResult.result_text ?? ''
  
  let placeholder = '/images/nft-image.png'

  const handleImageError = (image) => {
    image.target.src = placeholder
  }
</script>

<div class="flex items-center space-x-3 mb-5 last:mb-0">
  {#if imageSrc}
    <img src={imageSrc} alt="Search result" class="max-w-[40px] rounded-lg" on:error={handleImageError}/>
  {/if}
  <p><a href={resultAction}>{resultTitle}</a></p>
</div>
