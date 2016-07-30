import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from '../reducers'
import DevTools from '../containers/DevTools'

const logger = createLogger()
export default (initialState = {}) => {
  const enhancer = compose(
    // Middleware you want to use in development:
    applyMiddleware(thunk, logger),
    // Required! Enable Redux DevTools with the monitors you chose
    DevTools.instrument()
  )

  const store = createStore(reducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    )
  }

  return store
}