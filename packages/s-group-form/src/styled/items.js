import styled from 'vue-styled-components'
import items from '../items'

const Items = styled(items)`
  ${ props => {
    return Object.keys(props.mergeStyle).map(key => {
      return key.replace(/([A-Z])/g, "-$1").toLowerCase() + ':' + props.mergeStyle[key] + ' !important'
    }).join(';')
  }}
`
export default Items
