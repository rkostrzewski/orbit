import { compose, lifecycle, mapProps } from 'recompose'
import connect from './connect';
import { get } from '../utils';

let timers = {}

const withPeriodicUpdate = (stateKey, { updater, refreshFrequency, initialOutput, delay  }) => (Component) => {
  let timer = 0;
  
  if (timers[stateKey]) {
    clearTimeout(timers[stateKey])
  }

  const mapStateToProps = (state) => ({
    output: get(state, stateKey, initialOutput)
  })

  const mapDispatchToProps = (dispatch) => {
    const schedulePeriodicUpdate = () => {
      if (timer) return;

      const interval = typeof refreshFrequency === 'undefined' ? 1000 : refreshFrequency
      const callback = () => {
        const startTime = Date.now()
        updater(dispatch)
        const diff = Date.now() - startTime
        timer = timers[stateKey] = setTimeout(callback, interval - diff)
      }

      timer = timers[stateKey] = setTimeout(callback, delay || 0)
    }

    return {
      schedulePeriodicUpdate,
    }
  }

  const Wrapper = compose(
    lifecycle({ componentDidMount () { this.props.schedulePeriodicUpdate() },  componentWillUnmount () { clearTimeout(timer) } }),
    mapProps(({ schedulePeriodicUpdate, ...rest }) => rest),
  )(Component)

  return connect(mapStateToProps, mapDispatchToProps)(Wrapper);
}

export default withPeriodicUpdate;
