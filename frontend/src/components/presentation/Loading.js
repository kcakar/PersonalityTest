import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

const Loading = () => (
    <Dimmer  active inverted inline='centered'>
      <Loader  size='large' />
    </Dimmer>
)

export default Loading