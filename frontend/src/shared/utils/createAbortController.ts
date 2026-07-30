export const createAbortController = () => {
  let controller: AbortController | null = null;

  const getSignal = () => {
    controller?.abort();
    controller = new AbortController();

    return controller.signal;
  };

  return { getSignal };
};
