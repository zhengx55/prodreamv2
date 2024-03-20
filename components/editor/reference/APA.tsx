import { ICitationData, ICitationType, IContributors } from '@/types';
import React from 'react';

interface IAPAReferenceProps {
  citation: {
    type: ICitationType;
    data: ICitationData;
  };
}

const APAReference: React.FC<IAPAReferenceProps> = ({ citation }) => {
  const formatAuthors = (contributors: IContributors[]) => {
    return contributors
      .map(
        ({ last_name, first_name }) =>
          `${last_name}, ${first_name ? `${first_name.charAt(0)}.` : ''}`
      )
      .join(', ');
  };

  const formatDate = ({
    year,
    month,
    day,
  }: {
    year: any;
    month: any;
    day: any;
  }) => {
    if (year && month && day) {
      return `(${year}, ${month} ${day})`;
    } else if (year && month) {
      return `(${year}, ${month})`;
    } else if (year) {
      return `(${year})`;
    }
    return '';
  };

  const generateReference = (data: ICitationData) => {
    let reference = '';
    if (data.contributors?.length) {
      reference += `${formatAuthors(data.contributors)} `;
    }

    const date = data.publish_date || data.access_date;
    if (date) {
      reference += `${formatDate(date)} `;
    }

    switch (citation.type) {
      case 'Website':
        reference += `${data.website_title}. ${data.url}`;
        break;
      case 'Journal':
        reference += `${data.article_title}. <em>${data.journal_title}</em>`;
        if (data.page_info?.start && data.page_info?.end) {
          reference += ` ${data.page_info.start}-${data.page_info.end}`;
        }
        if (data.doi) {
          reference += `, https://doi.org/${data.doi}`;
        }
        break;

      case 'WholeBook':
        reference += `<em>${data.book_title}</em>`;
        if (data.publication_info?.publisher) {
          reference += ` ${data.publication_info.publisher}`;
        }
        break;
      case 'BookSection':
      case 'BookSpecialSection':
        reference += `${data.section_title} In <em>${data.book_title}</em>`;
        if (data.page_info?.start && data.page_info?.end) {
          reference += `, pp. ${data.page_info.start}-${data.page_info.end}`;
        }
        if (data.publication_info?.publisher) {
          reference += `, ${data.publication_info.publisher}`;
        }
        break;
    }

    return reference.endsWith('.') ? reference : reference + '.';
  };

  return (
    <p
      dangerouslySetInnerHTML={{
        __html: generateReference(citation.data) ?? '',
      }}
    />
  );
};

export default APAReference;
