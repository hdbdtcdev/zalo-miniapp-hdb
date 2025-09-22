/* Core */
import { createLogger } from 'redux-logger';

const middleware = [
  createLogger({
    duration: false,
    timestamp: false,
    collapsed: true,
    logErrors: true,
    diff: false,
    predicate: (getState, action) => action.type.includes('error') || action.type.includes('failure'), // Log only error-related actions
    colors: {
      title: () => '#139BFE',
      prevState: () => '#1C5FAF',
      action: () => '#149945',
      nextState: () => '#A47104',
      error: () => '#ff0005',
    },
  }),
];

export { middleware };
