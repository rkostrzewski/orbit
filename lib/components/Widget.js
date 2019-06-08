import { styled } from 'uebersicht'
import Color from 'color'

import { get } from '../utils';

export const getColor = (theme, path, defaultValue, mod = c => c) => mod(
  get(theme.colors, path, typeof defaultValue === 'function' ? defaultValue(theme) : defaultValue),
  theme
)
export const applyOpacity = (color, theme) => Color(color).fade(1 - theme.opacity).string()
export const getBackgroundColor = (theme, path, defaultValue) => getColor(theme, path, defaultValue, applyOpacity)

export const getWidgetColor = (colorName, defaultValue, mod = c => c) =>
  ({ name, theme }) => getColor(theme, `widgets.${name}.${colorName}`, defaultValue, mod)
export const getWidgetBackgroundColor = (colorName, defaultValue) => getWidgetColor(colorName, defaultValue, applyOpacity)

const Widget = styled('div')`
  grid-area: ${({ name }) => name};
  color: ${getWidgetColor('foreground', t => t.colors.foreground)};
  background: ${getWidgetBackgroundColor('background', 'transparent')};
  display: flex;
  align-items: center;
  justify-content: ${p => !p.center ? 'flex-start' : 'center'};
  padding: 0 1em;
  overflow: hidden;
`

Widget.defaultProps = {
  center: true,
}

export default (props) => (
  <Widget {...props} style={{ ...props.style, ...get(props.theme, `styles.${props.name}`, {})}}/>
);