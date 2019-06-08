import { format } from 'date-fns';
import Widget from '../components/Widget';
import { withPeriodicUpdate } from '../state';

export default (config, theme) => {
  const { refreshFrequency } = config;

  const Time = ({ output }) => (
    <Widget name="time" theme={theme}>
      {format(output, 'HH:mm')}
    </Widget>
  );

  const now = Date.now()
  const msInMinute = 60 * 1000;
  const delay = msInMinute - (now % msInMinute)
  
  return withPeriodicUpdate(
    'time',
    {
      updater: (dispatch) => dispatch({ key: 'time', value: Date.now() }),
      stateKey: 'time',
      refreshFrequency,
      initialOutput: now,
      delay,
    },
  )(Time);
};