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
      layout: {
        backgroundColor: 'rgba(23, 23, 23, 1)',
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
      leftPriceScale: {
        borderVisible: false,
        visible: true
      },
      rightPriceScale: {
        borderVisible: false,
        visible: false
      },
      timeScale: {
        borderVisible: false
      },
      crosshair: {
        horzLine: {
          visible: false
        }
      }
    })
    const lineSeries = chart.addLineSeries({
      color: 'rgba(255, 255, 255, 1)',
      lineWidth: 1
    })
    lineSeries.setData(rows)
  })

  function resizeChart() {
    chart.resize(chartElement.clientWidth, chartElement.clientHeight, true)
  }
</script>

<svelte:window on:resize={resizeChart} />

<div class="p-8 bg-gray-900 rounded-lg">
  <div class="chart w-full h-80" bind:this={chartElement} />
</div>

<style>
</style>
