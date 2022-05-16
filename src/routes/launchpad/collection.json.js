import featuredMintableCollection from '../../json/launchpad/featuredMintableCollection.json'


export async function get() {

  let collection = featuredMintableCollection;

  return {
    body: collection
  };
}