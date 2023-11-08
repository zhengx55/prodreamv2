import { Page, View, Document, Text } from '@react-pdf/renderer';
import { spacing, styles } from './ResumeStyle';

type Props = {};

const ResumePdf = (props: Props) => {
  return (
    <Document>
      <Page
        size={'A4'}
        style={{
          ...styles.flexCol,
          color: '#333',
          fontSize: 14 + 'pt',
        }}
      >
        <View
          style={{
            ...styles.flexCol,
            padding: `${spacing[0]} ${spacing[20]}`,
          }}
        >
          <Text>13123</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ResumePdf;
