<script>
  import { onMount } from 'svelte'
  import { createChart } from 'lightweight-charts/dist/lightweight-charts.esm.production'

  let chartElement
  let chart

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
    console.log('Generate random data', generateRandomData(60))
    lineSeries.setData(generateRandomData(60))

  })

  function generateRandomData(numberOfRows) {
    let data = []
    let value = 400
    let date = new Date()

    date.setDate(date.getDate() - numberOfRows - 1200)

    for (let i = 0; i < numberOfRows; i++) {
      date.setDate(date.getDate() + 20)
      let newDate = date.toDateString()
      value = value + (Math.random() < 0.5 ? Math.random() - 1 : Math.random())
      data.push({
        time: newDate,
        value: value
      })
    }
    return data
  }

  function resizeChart() {
    chart.resize(chartElement.clientWidth,chartElement.clientHeight,true)
  }

</script>

<svelte:window on:resize={resizeChart} />

<div class="p-8 bg-gray-900 rounded-lg">
  <div class="chart w-full h-80" bind:this={chartElement} />
</div>

<style>
</style>
