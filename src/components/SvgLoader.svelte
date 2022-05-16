<script>
  export let size = 30
</script>

<svg height={size} width={size} id='L5' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px'
     viewBox='0 0 100 100' xml:space='preserve'>
  <circle fill='#444444' stroke='none' cx='6' cy='50' r='6'>
    <animateTransform
      attributeName='transform'
      dur='1s'
      type='translate'
      values='0 15 ; 0 -15; 0 15'
      repeatCount='indefinite'
      begin='0.1' />
  </circle>
  <circle fill='#444444' stroke='none' cx='30' cy='50' r='6'>
    <animateTransform
      attributeName='transform'
      dur='1s'
      type='translate'
      values='0 10 ; 0 -10; 0 10'
      repeatCount='indefinite'
      begin='0.2' />
  </circle>
  <circle fill='#444444' stroke='none' cx='54' cy='50' r='6'>
    <animateTransform
      attributeName='transform'
      dur='1s'
      type='translate'
      values='0 5 ; 0 -5; 0 5'
      repeatCount='indefinite'
      begin='0.3' />
  </circle>
</svg>