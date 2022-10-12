<script lang="ts">
  export let description: string
  export let value: string
  export let border: string
  export let columnMobile: boolean

  let borderValues = ''
  let columnMobileValues = ''

  if (border === 'right') {
    borderValues = 'md:border-r-[1px] md:pr-5 last:border-r-0 last:border-b-0'
  }

  if (border === 'left') {
    borderValues = 'md:border-l-[1px] md:pl-5 last:border-l-0'
  }

  if (columnMobile) {
    columnMobileValues = 'border-b-[1px] md:border-b-0 md:-pb-0 last:border-b-0 py-5 md:py-0'
  }
</script>

<div class="{borderValues} {columnMobileValues} border-zilkroad-gray-border">
  <h3 class="font-medium text-zilkroad-text-light">
    {description}
  </h3>
  <p class="pt-2 font-medium">{value}</p>
</div>
