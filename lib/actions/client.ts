import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from 'next-safe-action';

class MyCustomError extends Error {}

export const actionClient = createSafeActionClient({
  handleReturnedServerError(e) {
    if (e instanceof MyCustomError) {
      return e.message;
    }
    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});
