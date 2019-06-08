import './lib/setupEnv';
import theme from './theme.json';
import config from './config.json';
import * as widgets from './lib/widgets';
import { set } from './lib/utils';

const { Bar, ...innerWidgets } = Object.keys(widgets)
  .filter(name => config[name.toLowerCase()].enabled)
  .reduce(
    (ws, name) => ({
      ...ws,
      [name]: widgets[name](config[name.toLowerCase()], theme),
    }),
    {}
  )

export const render = (state, dispatch) => Bar && (
  <Bar>
    {
      Object.keys(innerWidgets).map(key => {
        const Widget = innerWidgets[key];

        return <Widget key={key} state={state} dispatch={dispatch} />;
      })
    }
  </Bar>
)

export const initialState = {}
export const updateState = (event, state = initialState) => {
  const { key, value } = event;
  console.log('> update', key, new Date())
  if (!key) {
    return state;
  }

  const nextState = set(state, key, value);
  return nextState
}
