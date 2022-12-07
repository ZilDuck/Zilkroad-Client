<script type="ts">
  import { onMount } from 'svelte'
  import { createChart } from 'lightweight-charts/dist/lightweight-charts.esm.production'

  export let data: SaleGraphPoint[]
  let rows = []

  let chartElement
  let chart

  if (data) {
    data.forEach((row) => {
      console.log({ time: Date.parse(new Date(Number(row.unixtime)).toDateString()) / 1000, value: parseFloat(row.price.toString()) })
      rows.push({ time:  Date.parse(new Date(Number(row.unixtime)).toDateString()) / 1000, value: parseFloat(row.price.toString()) })
    })
  }

  onMount(() => {
    chart = createChart(chartElement, {

      layout: {
        backgroundColor: 'rgba(0, 0, 0, 1)',
        textColor: '#d1d4dc'
      },
      grid: {
        vertLines: {
          visible: true
        },
        horzLines: {
          color: 'rgba(48, 48, 48, 1)'
        }
      },
      leftPriceScale: {
        borderVisible: false,
        visible: true
      },
      rightPriceScale: {
        borderVisible: false,
        visible: false,
        scaleMargins: {
            top: 0.1,
            bottom: 0.1,
        },
      },
      timeScale: {
        borderVisible: true,
        
      },
      crosshair: {
        horzLine: {
          visible: true
        }
      },
    })
    const lineSeries = chart.addLineSeries({
      color: 'rgba(255, 255, 255, 1)',
      lineWidth: 1
    })

    lineSeries.setData(rows)

    chart.timeScale().setVisibleRange({ //this is not properly tested - elt
      from: data[0],
      to: data[data.length - 1],
    });

    chart.timeScale().fitContent();
  })

</script>

<div class="rounded-lg min-h-[272px] p-10 flex flex-col justify-center border border-zilkroad-gray-dark">

  {#if data.length <= 0}
    <div class="flex flex-col justify-center items-center pb-5 h-full">
      <img src="/icons/Outline/General/Moon.svg" alt="No sales history" class="fill-white max-w-[24px] mb-[10px]" />
      <p class="text-[14px]">There is no sale history for this NFT yet</p>
    </div>
  {:else}
    <div class="chart w-full h-full" bind:this={chartElement} />
  {/if}
</div>

<style>
</style>
