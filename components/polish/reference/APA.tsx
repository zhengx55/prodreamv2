import {
  IBookCitation,
  IChapterCitation,
  ICitationType,
  IIntroductionCitation,
  IJournalCitation,
  IWebsiteCitation,
} from '@/types';
import React from 'react';

interface IAPAReferenceProps {
  citation: {
    type: ICitationType;
    data:
      | IWebsiteCitation
      | IJournalCitation
      | IBookCitation
      | IChapterCitation
      | IIntroductionCitation;
  };
}

const APAReference: React.FC<IAPAReferenceProps> = ({ citation }) => {
  const formatAuthors = (contributors: any[]) => {
    return contributors
      .map((contributor) => {
        const { last_name, first_name } = contributor;
        return `${last_name}, ${first_name?.charAt(0)}.`;
      })
      .join(', ');
  };

  const generateWebsiteReference = (citation: IWebsiteCitation) => {
    const { website_title, url, access_date, contributors } = citation;

    let reference = '';

    if (contributors && contributors.length > 0) {
      reference += `${formatAuthors(contributors)} `;
    }

    if (access_date) {
      reference += `(${access_date.year}, ${access_date.month} ${access_date.day}). `;
    }

    reference += `${website_title}. ${url}`;

    return reference;
  };

  const generateJournalReference = (citation: IJournalCitation) => {
    const {
      journal_title,
      article_title,
      contributors,
      page_info,
      publish_date,
      doi,
    } = citation;

    let reference = '';

    if (contributors && contributors.length > 0) {
      reference += `${formatAuthors(contributors)} `;
    }

    if (publish_date) {
      reference += `(${publish_date.year}, ${publish_date.month} ${publish_date.day}). `;
    }

    reference += `${article_title}. ${journal_title}`;

    if (page_info?.start && page_info?.end) {
      reference += `, ${page_info.start}-${page_info.end}`;
    }

    if (doi) {
      reference += `. https://doi.org/${doi}`;
    }

    return reference;
  };

  const generateBookReference = (citation: IBookCitation) => {
    const { book_title, advanced_info, publication_info, contributors } =
      citation;

    let reference = '';

    if (contributors && contributors.length > 0) {
      reference += `${formatAuthors(contributors)} `;
    }

    reference += `(${publication_info?.publish_year}). ${book_title}`;

    if (advanced_info?.edition) {
      reference += ` (${advanced_info.edition}nd ed.).`;
    }

    if (publication_info?.publisher) {
      reference += ` ${publication_info.publisher}.`;
    }

    return reference;
  };

  const generateChapterReference = (citation: IChapterCitation) => {
    const {
      advanced_info,
      book_title,
      page_info,
      publication_info,
      contributors,
      section_title,
    } = citation;

    let reference = '';

    if (contributors && contributors.length > 0) {
      reference += `${formatAuthors(contributors)} `;
    }

    reference += `(${publication_info?.publish_year}). ${section_title}. In ${book_title}`;

    if (advanced_info?.edition) {
      reference += ` (${advanced_info.edition}nd ed.).`;
    }

    if (publication_info?.publisher) {
      reference += ` ${publication_info.publisher}.`;
    }

    if (publication_info?.city) {
      reference += ` ${publication_info.city}.`;
    }

    if (publication_info?.state) {
      reference += ` ${publication_info.state}.`;
    }

    if (page_info?.start && page_info.end) {
      reference += ` pp. ${page_info.start}-${page_info.end}.`;
    }

    return reference;
  };

  const generateIntroductionReference = (citation: IIntroductionCitation) => {
    const {
      contributors,
      advanced_info,
      book_title,
      page_info,
      publication_info,
      section_title,
    } = citation;

    let reference = '';

    if (contributors && contributors.length > 0) {
      reference += `${formatAuthors(contributors)} `;
    }

    reference += `(${publication_info?.publish_year}). ${section_title}. In ${book_title}`;

    if (advanced_info?.edition) {
      reference += ` (${advanced_info.edition}nd ed.).`;
    }

    if (publication_info?.publisher) {
      reference += ` ${publication_info.publisher}.`;
    }

    if (publication_info?.city) {
      reference += ` ${publication_info.city}.`;
    }

    if (publication_info?.state) {
      reference += ` ${publication_info.state}.`;
    }

    if (page_info?.start && page_info.end) {
      reference += ` pp. ${page_info.start}-${page_info.end}.`;
    }

    return reference;
  };

  const generateAPAReference = () => {
    if (citation.type === 'Website') {
      return generateWebsiteReference(citation.data as IWebsiteCitation);
    } else if (citation.type === 'Journal') {
      return generateJournalReference(citation.data as IJournalCitation);
    } else if (citation.type === 'WholeBook') {
      return generateBookReference(citation.data as IBookCitation);
    } else if (citation.type === 'BookSection') {
      return generateChapterReference(citation.data as IChapterCitation);
    } else if (citation.type === 'BookSpecialSection') {
      return generateIntroductionReference(
        citation.data as IIntroductionCitation
      );
    }
    // Add similar conditions for other citation types as needed.
  };

  return (
    <p dangerouslySetInnerHTML={{ __html: generateAPAReference() ?? '' }} />
  );
};

export default APAReference;
