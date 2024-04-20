import { EditorDictType } from '@/types';
import { memo } from 'react';
import ResearchInput from './ResearchInput';

type Props = { t: EditorDictType };
const ResearchCover = ({ t }: Props) => {
  return <ResearchInput t={t} />;
};
export default memo(ResearchCover);
