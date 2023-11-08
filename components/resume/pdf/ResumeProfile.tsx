import { View } from '@react-pdf/renderer';
import { spacing, styles } from '../ResumeStyle';
import ResumePDFSection from '../common/Section';
import ResumePDFText from '../common/Text';
import { IconType, ResumePDFIcon } from '../common/Icon';
import ResumePDFLink from '../common/Link';
import { IResumeProfile } from '../../../types/index';

export const ResumePDFProfile = ({
  profile,
  isPDF,
}: {
  profile: IResumeProfile;
  isPDF: boolean;
}) => {
  const { lastname, firstname, email, number, website, linkedin, location } =
    profile;
  const iconProps = { email, number, location, website, linkedin };

  return (
    <ResumePDFSection style={{ marginTop: spacing['4'] }}>
      <ResumePDFText
        themeColor='#7D22F5'
        bold={true}
        style={{ fontSize: '20pt' }}
      >
        {firstname}&nbsp;{lastname}
      </ResumePDFText>
      <View
        style={{
          ...styles.flexRowBetween,
          flexWrap: 'wrap',
          marginTop: spacing['0.5'],
        }}
      >
        {Object.entries(iconProps).map(([key, value]) => {
          if (!value) return null;

          let iconType = key as IconType;
          if (key === 'website' || 'linkedin') {
            if (value.includes('github')) {
              iconType = 'url_github';
            } else if (value.includes('linkedin')) {
              iconType = 'url_linkedin';
            }
          }

          const shouldUseLinkWrapper = [
            'email',
            'website',
            'linkedin',
            'number',
          ].includes(key);
          const Wrapper = ({ children }: { children: React.ReactNode }) => {
            if (!shouldUseLinkWrapper) return <>{children}</>;

            let src = '';
            switch (key) {
              case 'email': {
                src = `mailto:${value}`;
                break;
              }
              case 'number': {
                src = `tel:${value.replace(/[^\d+]/g, '')}`;
                break;
              }
              default: {
                src = value.startsWith('http') ? value : `https://${value}`;
              }
            }

            return (
              <ResumePDFLink src={src} isPDF={isPDF}>
                {children}
              </ResumePDFLink>
            );
          };

          return (
            <View
              key={key}
              style={{
                ...styles.flexRow,
                alignItems: 'center',
                gap: spacing['1'],
              }}
            >
              <ResumePDFIcon type={iconType} isPDF={isPDF} />
              <Wrapper>
                <ResumePDFText>{value}</ResumePDFText>
              </Wrapper>
            </View>
          );
        })}
      </View>
    </ResumePDFSection>
  );
};
