import { useEffect } from 'react';
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';
import { store, type RootState, type AppDispatch } from './store';

import { loadStateFromLocalStorage, saveStateToLocalStorage } from './persist';
import { deepMerge } from '@/lib/utils';
import { initialResumeState, setResume } from './reducers/resumeSlice';
import { Resume } from '@/types';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Hook to save store to local storage on store change
 */
export const useSaveStateToLocalStorageOnChange = () => {
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      saveStateToLocalStorage(store.getState());
    });
    return unsubscribe;
  }, []);
};

export const useSetInitialStore = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const state = loadStateFromLocalStorage();
    if (!state) return;
    if (state.resume) {
      // We merge the initial state with the stored state to ensure
      // backward compatibility, since new fields might be added to
      // the initial state over time.
      const mergedResumeState = deepMerge(
        initialResumeState,
        state.resume
      ) as Resume;
      dispatch(setResume(mergedResumeState));
    }
    // if (state.settings) {
    //   const mergedSettingsState = deepMerge(
    //     initialSettings,
    //     state.settings
    //   ) as Settings;
    //   dispatch(setSettings(mergedSettingsState));
    // }
  }, []);
};
