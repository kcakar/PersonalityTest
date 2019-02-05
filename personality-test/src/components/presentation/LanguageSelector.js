import React from 'react'
import { Dropdown } from 'semantic-ui-react'


const countries = [
  { text: 'Almanca', value: 'de' ,flag:'de' },
  { text: 'Türkçe', value: 'tr' ,flag:'tr' },
  { text: 'İspanyolca', value: 'es' ,flag:'es' },
  { text: 'Yunanca', value: 'gr' ,flag:'gr' },
  { text: 'Felemenkçe', value: 'nl' ,flag:'nl' },
  { text: 'Fransızca', value: 'fr' ,flag:'fr' },
  { text: 'Macarca', value: 'hu' ,flag:'hu' },
  { text: 'Çekçe', value: 'cz' ,flag:'cz' },
  { text: 'İtalyanca', value: 'it' ,flag:'it' },
  { text: 'Arapça', value: 'sa' ,flag:'sa' },
  { text: 'Endonezce', value: 'id' ,flag:'id' },
  { text: 'Korece', value: 'kp' ,flag:'kp' },
  { text: 'Ukraynaca', value: 'ua' ,flag:'ua' },
  { text: 'Vietnamca', value: 'vn' ,flag:'vn' },
  { text: 'Japonca', value: 'jp' ,flag:'jp' },
  { text: 'Rusça', value: 'ru' ,flag:'ru' },
  { text: 'Tayca', value: 'th' ,flag:'th' },
  { text: 'Hintçe', value: 'in' ,flag:'in' },
  { text: 'Çince', value: 'cn' ,flag:'cn' },
  { text: 'Portekizce', value: 'pt' ,flag:'pt' },
  { text: 'Lehçe', value: 'pl' ,flag:'pl' },
  { text: 'Rumence', value: 'ro',flag:'ro' }
]

const LanguageSelector = () => (
  <Dropdown placeholder='Dil seçimi' fluid search selection options={countries} />
)

export default LanguageSelector