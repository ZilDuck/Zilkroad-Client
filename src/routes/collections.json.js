import featuredCollections from '../json/home/featuredCollections.json'

export async function get({ url: { searchParams } }) {
  
  let collections;
  let type = searchParams.get('type')
  
  if (type === 'featured') {
    collections = featuredCollections // replace with api call
  }
  
  return {
    body: collections
  };
}