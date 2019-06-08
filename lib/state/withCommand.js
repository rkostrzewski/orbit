import { run } from 'uebersicht'
import withPeriodicUpdate from './withPeriodicUpdate';

const withCommand = (key, { command, refreshFrequency, initialOutput }) => (Component) => {
  const commandHash = stringHashCode(command);
  const stateKey = `${key}.${commandHash}.output`;

  return withPeriodicUpdate(stateKey, {
    updater: (dispatch) => run(command).then(value => dispatch({ key: stateKey, value })),
    refreshFrequency,
    initialOutput
  })(Component)
}

export default withCommand;

const stringHashCode = function(string) {
  var hash = 0, i, chr;
  if (string.length === 0) return hash;
  for (i = 0; i < string.length; i++) {
    chr   = string.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return hash;
};