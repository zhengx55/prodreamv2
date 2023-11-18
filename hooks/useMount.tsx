import { EffectCallback, useEffect } from 'react';

export default function useMount(fn: Function) {
  useEffectOnce(() => {
    fn();
  });
}

const useEffectOnce = (effect: EffectCallback) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
};
