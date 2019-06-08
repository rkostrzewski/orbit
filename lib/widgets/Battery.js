import { css } from 'uebersicht';
import StatusWidget from '../components/StatusWidget';
import { getColor } from '../components/Widget';
import { withCommand } from '../state';

export default (config, theme) => {
  const { refreshFrequency } = config;

  const command = `
    charging=false
    if pmset -g batt | grep AC &> /dev/null; then 
      charging=true
    fi
    battery="$(pmset -g batt | grep -o '[0-9]*%' | cut -f1 -d%)"
    echo "{\\"charging\\": \${charging}, \\"battery\\": \${battery} }"
  `;

  const Battery = ({ output }) => {
    let status = { charging: false, battery: 0 };
    try {
      status = JSON.parse(output)
    } catch (e) {
      console.error(e)
    }

    const BatteryIcon = getBatteryIcon(status);
    const batteryIconClass = css`
      transform: scale(1.2, 1.2);
    `
    const icon = <BatteryIcon fill={getColor(theme, 'widgets.cpu.foreground', theme.colors.foreground)} className={batteryIconClass} />

    return (
      <StatusWidget
        name="battery"
        theme={theme}
        icon={icon}
        value={status.battery}
        unit='%'
        position='right'
      />
    )
  };

  return withCommand(
    'battery',
    { command, stateKey: 'battery', refreshFrequency, initialOutput: '{ "charging": false, "battery": 0 }' },
  )(Battery);
};

const getBatteryIcon = (status) => {
  if (status.charging) {
    return batteryIcons.charging
  }

  if (status.battery > 90) {
    return batteryIcons.full
  }

  if (status.battery > 70) {
    return batteryIcons.high
  }

  if (status.battery > 40) {
    return batteryIcons.medium
  }

  if (status.battery > 15) {
    return batteryIcons.low
  }

  return batteryIcons.empty
}

const batteryIcons = {
  charging: ({ fill, className }) => (
    <svg xmlns='http://www.w3.org/2000/svg' id='svg7384' viewBox='0 0 16 16' className={className}
      enableBackground='new'>
      <defs id='defs7386'>
        <filter id='filter7554' colorInterpolationFilters='sRGB'>
          <feBlend id='feBlend7556' in2='BackgroundImage' mode='darken' />
        </filter>
      </defs>
      <g id='g4250' transform='matrix(.52112 0 0 .52112 20.768 5.345)' fill={fill}>
        <path d='M 1.6035156 3.90625 C 1.2699962 3.90625 1 4.1772302 1 4.5097656 L 1 11.490234 C 1 11.824256 1.2699962 12.09375 1.6035156 12.09375 L 13.318359 12.09375 C 13.652352 12.09375 13.921875 11.823754 13.921875 11.490234 L 13.921875 10.251953 L 14.396484 10.251953 C 14.730488 10.251953 15 9.9834201 15 9.6484375 L 15 6.4042969 C 15.000521 6.0702975 14.730484 5.7988281 14.396484 5.7988281 L 13.921875 5.7988281 L 13.921875 4.5097656 C 13.921875 4.1772302 13.652378 3.90625 13.318359 3.90625 L 1.6035156 3.90625 z M 7.0429688 5.921875 L 7.0625 5.921875 L 8.3515625 8.3496094 L 11.783203 6.8945312 L 8.0605469 10.296875 L 6.7714844 7.8671875 L 3.3398438 9.3222656 L 7.0429688 5.921875 z'
          transform='matrix(1.91893 0 0 1.91893 -39.851 -10.257)' id='path7-4-0-7-3-8-0-1-9-3'
      />
      </g>
    </svg>
  ),
  empty: ({ fill, className }) => (
    <svg xmlns='http://www.w3.org/2000/svg' id='svg7384' viewBox='0 0 16 16' className={className}
      enableBackground='new'>
      <defs id='defs7386'>
        <filter id='filter7554' colorInterpolationFilters='sRGB'>
          <feBlend id='feBlend7556' in2='BackgroundImage' mode='darken' />
        </filter>
      </defs>
      <g id='g4250' transform='matrix(.52112 0 0 .52112 20.768 5.345)' fill={fill}>
        <path d='m -12.22523,0.87170715 -0.909758,0 0,-2.47448235 c 0,-0.6381117 -0.518742,-1.1587503 -1.1597,-1.1587503 l -22.479049,0 c -0.64,0 -1.15875,0.5206386 -1.15875,1.1587503 l 0,13.3940252 c 0,0.640964 0.51875,1.158751 1.15875,1.158751 l 22.479049,0 c 0.640908,0 1.158739,-0.518751 1.158739,-1.158751 l 0,-2.3767664 0.909709,0 c 0.64093,0 1.15875,-0.5159432 1.15875,-1.1587508 l 0,-6.2243097 c 10e-4,-0.640921 -0.516819,-1.15971595 -1.15774,-1.15971595 z'
          id='path7-4-0-7-3-8-0-1-9-3' fill='#d33636' />
      </g>
    </svg>
  ),
  low: ({ fill, className }) => (
    <svg xmlns='http://www.w3.org/2000/svg' id='svg7384' viewBox='0 0 16 16' className={className}
      enableBackground='new'>
      <defs id='defs7386'>
        <filter id='filter7554' colorInterpolationFilters='sRGB'>
          <feBlend id='feBlend7556' in2='BackgroundImage' mode='darken' />
        </filter>
      </defs>
      <g id='g4250' transform='matrix(.52112 0 0 .52112 20.768 5.345)' fill={fill}>
        <path d='M 1.6035156,3.90625 C 1.2699962,3.90625 1,4.1772302 1,4.5097656 l 0,6.9804684 c 0,0.334023 0.2699962,0.603516 0.6035156,0.603516 l 11.7148434,0 c 0.333993,0 0.603516,-0.269995 0.603516,-0.603516 l 0,-1.238281 0.474609,0 C 14.730488,10.251953 15,9.9834201 15,9.6484375 L 15,6.4042969 C 15.000521,6.0702975 14.730485,5.7988281 14.396484,5.7988281 l -0.474609,0 0,-1.2890625 c 0,-0.3325354 -0.269497,-0.6035156 -0.603516,-0.6035156 z m 3.3021328,0.9785156 7.1286326,0 c 0.293803,0 0.53125,0.235494 0.53125,0.5292969 l 0,5.1718755 c 0,0.293802 -0.237447,0.529296 -0.53125,0.529296 l -7.1286326,0 c -0.2938029,0 -0.5292969,-0.235494 -0.5292969,-0.529296 l 0,-5.1718755 c 0,-0.2938029 0.235494,-0.5292969 0.5292969,-0.5292969 z'
          transform='matrix(1.91893 0 0 1.91893 -39.851 -10.257)' id='path4288'
        />
      </g>
    </svg>
  ),
  medium: ({ fill, className }) => (
    <svg xmlns='http://www.w3.org/2000/svg' id='svg7384' viewBox='0 0 16 16' className={className}
      enableBackground='new'>
      <defs id='defs7386'>
        <filter id='filter7554' colorInterpolationFilters='sRGB'>
          <feBlend id='feBlend7556' in2='BackgroundImage' mode='darken' />
        </filter >
      </defs >
      <g id='g4250' transform='matrix(.52112 0 0 .52112 20.768 5.345)' fill={fill}>
        <path d='M 1.6035156,3.90625 C 1.2699962,3.90625 1,4.1772302 1,4.5097656 l 0,6.9804684 c 0,0.334023 0.2699962,0.603516 0.6035156,0.603516 l 11.7148434,0 c 0.333993,0 0.603516,-0.269995 0.603516,-0.603516 l 0,-1.238281 0.474609,0 C 14.730488,10.251953 15,9.9834201 15,9.6484375 L 15,6.4042969 C 15.000521,6.0702975 14.730485,5.7988281 14.396484,5.7988281 l -0.474609,0 0,-1.2890625 c 0,-0.3325354 -0.269497,-0.6035156 -0.603516,-0.6035156 z m 5.3021328,0.9785156 5.1286326,0 c 0.293803,0 0.53125,0.235494 0.53125,0.5292969 l 0,5.1718755 c 0,0.293802 -0.237447,0.529296 -0.53125,0.529296 l -5.1286326,0 c -0.2938029,0 -0.5292969,-0.235494 -0.5292969,-0.529296 l 0,-5.1718755 c 0,-0.2938029 0.235494,-0.5292969 0.5292969,-0.5292969 z'
          transform='matrix(1.91893 0 0 1.91893 -39.851 -10.257)' id='path4288'
        />
      </g>
    </svg >
  ),
  high: ({ fill, className }) => (
    <svg xmlns='http://www.w3.org/2000/svg' id='svg7384' viewBox='0 0 16 16' className={className}
      enableBackground='new'>
      <defs id='defs7386'>
        <filter id='filter7554' colorInterpolationFilters='sRGB'>
          <feBlend id='feBlend7556' in2='BackgroundImage' mode='darken' />
        </filter>
      </defs>
      <g id='g4250' transform='matrix(.52112 0 0 .52112 20.768 5.345)' fill={fill}>
        <path d='M 1.6035156,3.90625 C 1.2699962,3.90625 1,4.1772302 1,4.5097656 l 0,6.9804684 c 0,0.334023 0.2699962,0.603516 0.6035156,0.603516 l 11.7148434,0 c 0.333993,0 0.603516,-0.269995 0.603516,-0.603516 l 0,-1.238281 0.474609,0 C 14.730488,10.251953 15,9.9834201 15,9.6484375 L 15,6.4042969 C 15.000521,6.0702975 14.730485,5.7988281 14.396484,5.7988281 l -0.474609,0 0,-1.2890625 c 0,-0.3325354 -0.269497,-0.6035156 -0.603516,-0.6035156 z m 9.6021324,0.9785156 1.028727,0 c 0.293802,0 0.53125,0.235494 0.53125,0.5292969 l 0,5.1718755 c 0,0.293802 -0.237448,0.529296 -0.53125,0.529296 l -1.028727,0 c -0.293803,0 -0.529297,-0.235494 -0.529297,-0.529296 l 0,-5.1718755 c 0,-0.2938029 0.235494,-0.5292969 0.529297,-0.5292969 z'
          transform='matrix(1.91893 0 0 1.91893 -39.851 -10.257)' id='path4288'
        />
      </g>
    </svg>
  ),
  full: ({ fill, className }) => (
    <svg xmlns='http://www.w3.org/2000/svg' id='svg7384' viewBox='0 0 16 16' className={className}
      enableBackground='new'>
      <defs id='defs7386'>
        <filter id='filter7554' colorInterpolationFilters='sRGB'>
          <feBlend id='feBlend7556' in2='BackgroundImage' mode='darken' />
        </filter>
      </defs>
      <g id='g4250' transform='matrix(.52112 0 0 .52112 20.768 5.345)' fill={fill}>
        <path d='M 1.6035156,3.90625 C 1.2699962,3.90625 1,4.1772302 1,4.5097656 l 0,6.9804684 c 0,0.334022 0.2699962,0.603516 0.6035156,0.603516 l 11.7148434,0 c 0.333993,0 0.603516,-0.269996 0.603516,-0.603516 l 0,-1.238281 0.474609,0 C 14.730488,10.251953 15,9.9834201 15,9.6484375 L 15,6.4042969 C 15.000521,6.0702975 14.730484,5.7988281 14.396484,5.7988281 l -0.474609,0 0,-1.2890625 c 0,-0.3325354 -0.269497,-0.6035156 -0.603516,-0.6035156 z'
          transform='matrix(1.91893 0 0 1.91893 -39.851 -10.257)' id='path7-4-0-7-3-8-0-1-9-3'
        />
      </g>
    </svg>
  )
}
