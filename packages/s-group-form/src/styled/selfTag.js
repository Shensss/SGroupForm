import styled from 'vue-styled-components'
import selfTag from '../types/selfTag'

const SelfTag = styled(selfTag)`
  width: 100%;
  ${ props => {
    if(props.inputStyle){
      return Object.keys(props.inputStyle).map(key => {
        return key.replace(/([A-Z])/g, "-$1").toLowerCase() + ':' + props.inputStyle[key] + ' !important'
      }).join(';')
    }
  }}
`
export default SelfTag
