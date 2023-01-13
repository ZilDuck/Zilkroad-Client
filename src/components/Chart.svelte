<script type="ts">
  import { onMount } from 'svelte'
  import { createChart } from 'lightweight-charts/dist/lightweight-charts.esm.production'

  export let data: SaleGraphPoint[]
  let rows = []

  let chartElement
  let chart

  var line_data = []

  if (data) {
    data.forEach((row) => {
      console.log(`line ${row.date} ${parseFloat(row.max)}`)
      line_data.push({ time: row.date, value: row.max })
    })
  }

  onMount(() => {
    chart = createChart(chartElement, {
      height: 500,
      width: 500,
      layout: {
        backgroundColor: 'rgba(0, 0, 0, 1)',
        textColor: '#d1d4dc'
      },
      grid: {
        vertLines: {
          visible: false
        },
        horzLines: {
          color: 'rgba(48, 48, 48, 1)'
        }
      },
      rightPriceScale: {
        scaleMargins: {
          top: 0.75,
          bottom: 0.05,
        },
		    borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
      },
      crosshair: {
        horzLine: {
          visible: false
        },
        vertLine: {
          visable: false
        }
      },
    })
    const lineSeries = chart.addLineSeries({
      color: 'rgba(255, 255, 255, 1)',
      lineWidth: 1
    })

    lineSeries.setData(line_data)

    chart.timeScale().setVisibleRange({ //this is not properly tested - elt
      from: data[0],
      to: data[data.length - 1],
    });

    chart.timeScale().fitContent();

    new ResizeObserver(entries => {
      if (entries.length === 0 || entries[0].target !== chartElement) { return; }
      const newRect = entries[0].contentRect;
      chart.applyOptions({ height: newRect.height, width: newRect.width });
    }).observe(chartElement);
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
