<script lang="ts">
  export let description: string
  export let value: string
  export let border: string

  let borderValues = ''

  if (border === 'right') {
    borderValues = 'border-r-[1px] pr-5 last:border-r-0'
  }

  if (border === 'left') {
    borderValues = 'border-l-[1px] pl-5 last:border-l-0'
  }
</script>

<div class="{borderValues} border-zilkroad-gray-border">
  <h3 class="font-medium text-zilkroad-text-light">
    {description}
  </h3>
  <p class="pt-2 font-medium">{value}</p>
</div>
