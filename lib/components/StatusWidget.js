import { styled } from 'uebersicht';
import Widget from './Widget';

const IconWrapper = styled('div')`
  order: ${p => p.position === 'left' ? 1 : 2};
  height: 1em;
  width: 1em;
  display: flex;
  align-items: center;

  & svg {
    height: 1em;
    width: 1em;
  }
`

const Value = styled('span')`
  order: ${p => p.position === 'left' ? 2 : 1};
  margin-left: ${p => p.position === 'left' ? 0.5 : 0}em;
  margin-right: ${p => p.position === 'left' ? 0 : 0.5}em;

  &:after {
    content: ${props => `'${props.unit || ''}'`};
    margin-left: 0.1em;
  }
`

const StatusWidget = ({ icon, value, unit, position = 'left', name, theme, ...rest }) => (
  <Widget name={name} theme={theme} {...rest}>
    <IconWrapper theme={theme} name={name} position={position}>
      {icon}
    </IconWrapper>
    <Value unit={unit} position={position}>
      {value}
    </Value>
  </Widget>
);

export default StatusWidget;