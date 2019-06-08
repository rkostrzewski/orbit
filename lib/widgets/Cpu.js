import { Cpu as CpuIcon } from 'react-feather';
import StatusWidget from '../components/StatusWidget';
import { getColor } from '../components/Widget';
import { withCommand } from '../state';

export default (config, theme) => {
  const { refreshFrequency } = config;

  const command = `ps -e -o %cpu | awk '{s+=$1} END {print s}'`;

  const Cpu = ({ output }) => {
    const icon = <CpuIcon color={getColor(theme, 'widgets.cpu.foreground', theme.colors.foreground)} />

    return (
      <StatusWidget
        name="cpu"
        theme={theme}
        icon={icon}
        value={Math.round(output.trim())}
        unit='%'
      />
    )
  };

  return withCommand(
    'cpu',
    { command, stateKey: 'cpu', refreshFrequency, initialOutput: '0' },
  )(Cpu);
};