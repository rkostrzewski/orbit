import { styled } from 'uebersicht'
import { getBackgroundColor } from '../components/Widget';

export default (config, theme) => {
  const Bar = styled('div')`
    box-sizing: border-box;

    position: absolute;
    top: ${theme.layout.top};
    bottom: ${theme.layout.bottom};
    left: ${theme.layout.left};
    right: ${theme.layout.right};

    display: grid;
    height: ${theme.layout.height};
    width: ${theme.layout.width};
    z-index: -1;
    grid-template-columns: ${theme.layout.gridTemplateColumns};
    grid-template-areas: ${theme.layout.gridTemplateAreas};
    grid-template-rows: 100%;
    overflow: hidden;

    font-size: ${theme.font.fontSize};
    font-family: ${theme.font.fontFamily};

    color: ${theme.colors.foreground};
    background: ${getBackgroundColor(theme, 'background')};
    backdrop-filter: blur(${theme.layout.blur});
    -webkit-backdrop-filter: blur(${theme.layout.blur});
  `

  return ({ children }) => config.enabled && (
    <Bar style={theme.styles.bar}>
      {children}
    </Bar>
  )
}
