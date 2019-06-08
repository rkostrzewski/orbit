import { withCommand } from '../state';
import Widget from '../components/Widget';

export default (config, theme) => {
  const { refreshFrequency } = config;
  const command = `
   ps cax | grep chunkwm > /dev/null
   if [ $? -eq 0 ]; then
     /usr/local/bin/chunkc tiling::query --desktop id
   else
     echo ""
   fi
  `

  const Workspace = ({ output }) => (
    <Widget name="workspace" theme={theme}>
      {output}
    </Widget>
  );

  return withCommand(
    'workspace',
    { refreshFrequency, command, initialOutput: '' },
  )(Workspace)
}