import { Text } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';

type Props = {
  bold?: boolean;
  themeColor?: string;
  style?: Style;
  children: React.ReactNode;
};

const ResumePDFText = ({
  bold = false,
  themeColor,
  style = {},
  children,
}: Props) => {
  return (
    <Text
      style={{
        fontWeight: bold ? 'bold' : 'normal',
        ...style,
      }}
    >
      {children}
    </Text>
  );
};
export default ResumePDFText;
