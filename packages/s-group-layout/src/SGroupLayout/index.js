import styled from 'vue-styled-components'
import group from '../Group'

const SGroupLayout = styled(group)`
  display: grid;
  grid-template-columns: repeat(${props => props.cols}, 100px);
  grid-template-rows: repeat(${props => props.rows}, 100px);
  grid-column-gap: ${props => Array.isArray(props.gap) ? props.gap[1] : props.gap};
  grid-row-gap: ${props => Array.isArray(props.gap) ? props.gap[0] : props.gap};

  ${props => {
    return props.option.map((item, index) => {
      return ` &:not(.border) > :nth-child(${index + 1}) {grid-area: ${item};}`
    })
  }
}
`
export default SGroupLayout
