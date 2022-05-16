import endingMintableCollections from '../../json/launchpad/endingMintableCollections.json'
import newlyMintableCollections from '../../json/launchpad/newlyMintableCollections.json'

export async function get({ url: { searchParams } }) {

  let collections;
  let type = searchParams.get('type')

  if (type === 'new') {
    collections = newlyMintableCollections // replace with api call
  }  
  
  if (type === 'ending') {
    collections = endingMintableCollections // replace with api call
  }
  
  return {
    body: collections
  };
}