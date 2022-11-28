<script type="ts">
  import { onMount } from 'svelte'
  import { createChart } from 'lightweight-charts/dist/lightweight-charts.esm.production'

  export let data: SaleGraphPoint[]
  let rows = []

  let chartElement
  let chart

  if (data) {
    data.forEach((row) => {
      rows.push({
        time: new Date(Number(row.unixtime)).toDateString(),
        value: row.price
      })
    })
  }

  onMount(() => {
    chart = createChart(chartElement, {
      width: '519',
      height: '350',
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
        visible: false
      },
      timeScale: {
        borderVisible: true
      },
      crosshair: {
        horzLine: {
          visible: true
        }
      }
    })
    const lineSeries = chart.addLineSeries({
      color: 'rgba(255, 255, 255, 1)',
      lineWidth: 1
    })

    lineSeries.setData(rows)

    chart.timeScale().setVisibleRange({ //this is not properly tested - elt
      from: data[1],
      to: data[data.length - 1],
    });
  })

  function resizeChart() {
    chart.resize(chartElement.clientWidth, chartElement.clientHeight, true)
  }
</script>

<svelte:window on:resize={resizeChart} />

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
