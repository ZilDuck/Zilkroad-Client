<script context="module">
  export async function load({ params, fetch }) {
    const supportedActivityTypes = ["royalties", "buyers", "sellers"]
    const { activityType } = params;
    // If the url does not match one of our supported types then 404
    if(supportedActivityTypes.indexOf(activityType) === -1) {
      return { status: 404 };
    }
    const [ wallets ] = await Promise.all([
      fetch(`/wallet-activity/wallets.json?type=${activityType}`).then((r) => r.json()),
    ]);
    return {
      props: { wallets, activityType, supportedActivityTypes}
    };
  }
</script>

<script>
  
  import Header from "../../components/Header.svelte";
  import WalletActivityCardList from "../../lib/WalletActivityCardList/index.svelte";

  export let activityType = ''
  export let title
  export let tableTitle
  export let description
  export let supportedActivityTypes = []
  export let wallets = []
  
  if ( activityType === supportedActivityTypes[0] ) {
    title = 'NFT Royalties'
    tableTitle = 'All Royalties'
    description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem elementum lorem felis tincidunt.' +
      ' Semper urna, cursus sed congue fringilla gravida velit egestas nascetur.'
  } else if ( activityType === supportedActivityTypes[1] ) {
    title = 'Zilkroad Buyer Wallets'
    tableTitle = 'All Buyers'
    description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem elementum lorem felis tincidunt.' +
      ' Semper urna, cursus sed congue fringilla gravida velit egestas nascetur.'
  } else if ( activityType === supportedActivityTypes[2] ) {
    title = 'Zilkroad Seller Wallets'
    tableTitle = 'All Sellers'
    description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem elementum lorem felis tincidunt.' +
      ' Semper urna, cursus sed congue fringilla gravida velit egestas nascetur.'
  }
  
</script>

<Header className="bg-cover bg-liquid-metal h-[500px]" light={true}>
  <div class="mx-auto max-w-screen-xl">
    <div class="pt-32 w-1/2">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  </div>
</Header>

<main class="mt-[-7.5%] xl:mt-[-144px] space-y-28">
  <div class="mx-auto max-w-screen-xl">
    <h2>{tableTitle}</h2>
    <WalletActivityCardList wallets={wallets} />
  </div>
</main>


