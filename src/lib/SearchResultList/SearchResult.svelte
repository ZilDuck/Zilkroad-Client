<script>

  export let searchResult

  let imageSrc = searchResult?.result_image
  let resultAction =  searchResult?.result_action
  let resultTitle =  searchResult?.result_text
  
</script>

<div class="flex space-x-3">
  <img src="{imageSrc}"/>
  <p><a href="{resultAction}">{resultTitle}</a></p>
</div>