'use client';
import useAiEditor from '@/zustand/store';
import { memo } from 'react';

type Props = {};
export const SynonymMenu = memo((props: Props) => {
  const updateSynonymMenu = useAiEditor((state) => state.updateSynonymMenu);

  return <div>SynonymMenu</div>;
});

SynonymMenu.displayName = 'SynonymMenu';
