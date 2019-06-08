import { mapProps, compose, shouldUpdate } from "recompose";

const connect = (mapStateToProps, mapDispatchToProps) => {
  return compose(
    mapProps(({ state, dispatch, ...props}) => ({
      ownProps: props,
      stateProps: mapStateToProps ? mapStateToProps(state, props) : {}, 
      dispatchProps: mapDispatchToProps ? mapDispatchToProps(dispatch) : {},
    })),
    shouldUpdate((props, prevProps) => {
      if (props === prevProps) {
        return false;
      } 
      
      const areShallowEqual = shallowEqual({ ...props.ownProps, ...props.stateProps }, { ...prevProps.ownProps, ...prevProps.stateProps })
      return !areShallowEqual
    }),
    mapProps(({ ownProps, stateProps, dispatchProps }) => ({
      ...ownProps,
      ...stateProps,
      ...dispatchProps,
    })),
  );
}

export default connect;

const shallowEqual = (objA, objB) => {
  if (objA === objB) {
    return true;
  }

  if (!objA || !objB) {
    return false;
  }

  var aKeys = Object.keys(objA);
  var bKeys = Object.keys(objB);
  var len = aKeys.length;

  if (bKeys.length !== len) {
    return false;
  }

  for (var i = 0; i < len; i++) {
    var key = aKeys[i];

    if (objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
};