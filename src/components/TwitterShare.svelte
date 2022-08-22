<script>
    import TwitterWhite from '$components/icons/TwitterWhite.svelte'
  
    export let text
    export let url
    export let hashtags
    export let via
    export let related
  
    $: query = [
      text && `text=${encodeURIComponent(text)}`,
      url && `url=${encodeURIComponent(url)}`,
      hashtags && `hashtags=${hashtags}`,
      via && `via=${encodeURIComponent(via)}`,
      related && `related=${encodeURIComponent(related)}`
    ]
      .filter(Boolean)
      .join('&')
  
    $: href = `https://twitter.com/intent/tweet?${query}`
  
    function open(e) {
      e.preventDefault()
  
      const w = 600
      const h = 400
      const x = (screen.width - w) / 2
      const y = (screen.height - h) / 2
      const features = `width=${w},height=${h},left=${x},top=${y}`
  
      window.open(href, '_blank', features)
    }
  </script>
  
  <a target="_blank" noreferrer {href} on:click={open} class="flex items-center">
    <TwitterWhite />
  </a>
  