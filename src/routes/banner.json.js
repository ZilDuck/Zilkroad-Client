import * as api from '../lib/api.js'

export async function get() {
  let advert = await api.get(`banner-advert`).catch((e) => console.log(e)) ?? [{}]

  return {
    body: {
      advertise_start_unixtime: advert[0]?.advertise_start_unixtime ?? '',
      advertise_end_unixtime: advert[0]?.advertise_end_unixtime ?? '',
      adtitle: advert[0]?.advertise_header ?? '',
      description: advert[0]?.advertise_description ?? '',
      advertise_uri: advert[0]?.advertise_uri ?? '',
      nonfungible_address: advert[0]?.nonfungible_address ?? '',
      desktop_image_uri: advert[0]?.desktop_image_uri ?? '',
      mobile_image_uri: advert[0]?.mobile_image_uri ?? ''
    }
  }
}
