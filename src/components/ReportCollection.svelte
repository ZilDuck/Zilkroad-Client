<script>
  import { toast } from '$store/toast'
  import wallet from '$store/wallet'
  import Report from './icons/Report.svelte'
  import { fly } from 'svelte/transition'

  export let contractId

  let reportPending = false

  function userConfirmReport() {
    reportPending = true
  }

  function userCancelReport() {
    reportPending = false
  }

  async function reportCollection() {
    const user = $wallet.bech32 ?? '<no-user>'
    await fetch(`/collections/${contractId}/report.json?user=${user}`)
      .catch((error) => {
        console.log(error)
        toast.add({ message: 'Issue with reporting collection, please try again later', type: 'error' })
      })
      .then(() => {
        toast.add({ message: 'Collection reported, this will be reviewed by the Zilkroad Team', type: 'success' })
      })
      .finally(()=> {
        reportPending = false
      })
  }
</script>

<div class="flex items-center">
  {#if !reportPending}
    <p class="text-[#D8A270] mr-[10px] cursor-pointer" on:click={userConfirmReport}>Report collection</p>
  {/if}
  {#if reportPending}
    <p in:fly={{ y: -30 }} class="text-red-500 mr-[10px] cursor-pointer" on:click={reportCollection}>Confirm Report</p>
    <p in:fly={{ y: -30 }} class="text-gray-100 mr-[10px] cursor-pointer" on:click={userCancelReport}>Cancel</p>
  {/if}
  <Report />
</div>
