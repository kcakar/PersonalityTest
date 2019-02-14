import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const countries = [
  { text: 'Almanca', value: 'de' ,flag:'de' },
  { text: 'Arapça', value: 'sa' ,flag:'sa' },
  { text: 'Çekçe', value: 'cz' ,flag:'cz' },
  { text: 'Çince', value: 'cn' ,flag:'cn' },
  { text: 'Endonezce', value: 'id' ,flag:'id' },
  { text: 'Felemenkçe', value: 'nl' ,flag:'nl' },
  { text: 'Fransızca', value: 'fr' ,flag:'fr' },
  { text: 'Hintçe', value: 'in' ,flag:'in' },
  { text: 'İngilizce', value: 'en' ,flag:'gb' },
  { text: 'İspanyolca', value: 'es' ,flag:'es' },
  { text: 'İtalyanca', value: 'it' ,flag:'it' },
  { text: 'Japonca', value: 'jp' ,flag:'jp' },
  { text: 'Korece', value: 'kp' ,flag:'kp' },
  { text: 'Lehçe', value: 'pl' ,flag:'pl' },
  { text: 'Macarca', value: 'hu' ,flag:'hu' },
  { text: 'Portekizce', value: 'pt' ,flag:'pt' },
  { text: 'Rumence', value: 'ro',flag:'ro' },
  { text: 'Rusça', value: 'ru' ,flag:'ru' },
  { text: 'Tayca', value: 'th' ,flag:'th' },
  { text: 'Türkçe', value: 'tr' ,flag:'tr' },
  { text: 'Ukraynaca', value: 'ua' ,flag:'ua' },
  { text: 'Vietnamca', value: 'vn' ,flag:'vn' },
  { text: 'Yunanca', value: 'gr' ,flag:'gr' }
]

const LanguageSelector = (props) => (
  <Dropdown onChange={props.handleLanguageChange} placeholder='Dil seçimi' fluid search selection options={countries} value={props.selected}/>
)

LanguageSelector.propTypes = {
  handleLanguageChange:PropTypes.func.isRequired,
  selected:PropTypes.string.isRequired
}

export default LanguageSelector