import styled from 'vue-styled-components'
import item from '../item'

const SItem = styled(item)`
  grid-column: ${ props => Number(props.x) + 1 } / span ${ props => props.w };
  grid-row: ${ props => Number(props.y) + 1 } / span ${ props => props.h };
`
export default SItem
