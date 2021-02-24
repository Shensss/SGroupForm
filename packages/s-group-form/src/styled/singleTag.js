import styled from 'vue-styled-components'
import singleTag from '../types/singleTag'

const SingleTag = styled(singleTag)`
  width: 100%;
  ${ props => {
    if(props.inputStyle){
      return Object.keys(props.inputStyle).map(key => {
        return key.replace(/([A-Z])/g, "-$1").toLowerCase() + ':' + props.inputStyle[key] + ' !important'
      }).join(';')
    }
  } }
`
export default SingleTag
