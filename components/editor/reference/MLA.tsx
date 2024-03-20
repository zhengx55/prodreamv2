import { ICitationData, ICitationType, IContributors } from '@/types';
import React from 'react';

interface IMLAReferenceProps {
  citation: {
    type: ICitationType;
    data: ICitationData;
  };
}

const MLAReference: React.FC<IMLAReferenceProps> = ({ citation }) => {
  const formatContributors = (contributors: IContributors[]) => {
    const names = contributors.map(({ first_name, middle_name, last_name }) => {
      return [last_name, middle_name, first_name].filter(Boolean).join(' ');
    });
    return names.length > 2 ? `${names[0]} et al.` : names.join(' & ');
  };

  const generateReference = (data: ICitationData) => {
    let reference = '';
    if (data.contributors?.length) {
      reference += `${formatContributors(data.contributors)} `;
    }
    switch (citation.type) {
      case 'Website':
        reference += `"${data.article_title}." <em>${data.website_title}</em>, ${data.publisher},`;
        if (data.access_date) {
          reference += ` ${data.access_date.day} ${data.access_date.month} ${data.access_date.year},`;
        }
        if (data.url) {
          reference += ` ${data.url},`;
        }
        break;
      case 'Journal':
        reference += `"${data.article_title}." <em>${data.journal_title}</em>,`;
        if (data.advanced_info?.volume)
          reference += ` vol. ${data.advanced_info.volume},`;
        if (data.advanced_info?.issue)
          reference += ` no. ${data.advanced_info.issue},`;
        if (data.publish_date) {
          reference += ` ${data.publish_date.year},`;
        }
        if (data.page_info?.start && data.page_info.end) {
          reference += ` pp. ${data.page_info.start}-${data.page_info.end},`;
        }
        if (data.doi) {
          reference += ` https://doi.org/${data.doi},`;
        }
        break;
      case 'WholeBook':
        reference += `<em>${data.book_title}</em>`;
        if (data.advanced_info?.edition)
          reference += `, ${data.advanced_info.edition} ed.,`;
        if (data.publication_info) {
          reference += ` ${data.publication_info.publisher}, ${data.publication_info.publish_year},`;
        }
        break;
      case 'BookSection':
      case 'BookSpecialSection':
        reference += `"${data.section_title}." In <em>${data.book_title}</em>,`;
        if (data.page_info?.start && data.page_info?.end) {
          reference += ` pp. ${data.page_info.start}-${data.page_info.end},`;
        }
        if (data.advanced_info?.edition)
          reference += ` ${data.advanced_info.edition} ed.,`;
        if (data.publication_info) {
          reference += ` ${data.publication_info.publisher}, ${data.publication_info.publish_year},`;
        }
        break;
    }

    return reference.endsWith(',')
      ? reference.slice(0, -1) + '.'
      : reference + '.';
  };

  return (
    <p
      dangerouslySetInnerHTML={{
        __html: generateReference(citation.data) ?? '',
      }}
    />
  );
};

export default MLAReference;
