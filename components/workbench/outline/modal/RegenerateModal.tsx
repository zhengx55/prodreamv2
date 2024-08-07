import { memo } from 'react';

type Props = {
  close: () => void;
};

const RegenerateModal = ({ close }: Props) => {
  return <div>RegenerateModal</div>;
};

export default memo(RegenerateModal);
