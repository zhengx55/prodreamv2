import { ICitationType } from '@/query/type';
import {
  IBookCitation,
  IChapterCitation,
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
  const generateWebsiteReference = (citation: IWebsiteCitation) => {
    const {
      website_title,
      publisher,
      article_title,
      access_date,
      contributors,
      url,
    } = citation;
    let reference = ``;
    if (contributors && contributors.length > 0) {
      const contributorNames = contributors.map((contributor) => {
        const { first_name, last_name, middle_name } = contributor;
        let fullName = '';
        if (last_name) {
          fullName += last_name;
        }
        if (first_name) {
          fullName += `, ${first_name.charAt(0)}.`;
        }
        if (middle_name) {
          fullName += ` ${middle_name.charAt(0)}.`;
        }
        return fullName;
      });
      reference += `${contributorNames.join(', ')}.`;
    }
    reference += ` (${access_date.year}, ${access_date.month} ${access_date.day}). ${article_title}. ${website_title}.`;
    if (publisher) {
      reference += ` ${publisher}.`;
    }
    if (url) {
      reference += ` ${url}.`;
    }
    return reference;
  };

  const generateJournalReference = (citation: IJournalCitation) => {
    const {
      journal_title,
      article_title,
      contributors,
      page_info,
      publish_date,
      advanced_info,
      doi,
    } = citation;
    let reference = '';
    if (contributors && contributors.length > 0) {
      const contributorNames = contributors.map((contributor) => {
        const { first_name, last_name, middle_name } = contributor;
        let fullName = '';
        if (last_name) {
          fullName += last_name;
        }
        if (first_name) {
          fullName += `, ${first_name.charAt(0)}.`;
        }
        if (middle_name) {
          fullName += ` ${middle_name.charAt(0)}.`;
        }
        return fullName;
      });
      reference += `${contributorNames.join(', ')}.`;
    }
    reference += ` (${publish_date?.year}). ${article_title}. ${journal_title}`;
    if (advanced_info?.volume) reference += `, ${advanced_info?.volume}`;
    if (advanced_info?.issue) reference += `(${advanced_info?.issue})`;
    if (page_info?.start && page_info?.end)
      reference += `, ${page_info?.start}-${page_info?.end}`;
    if (doi) reference += `, doi:${doi}`;
    return reference;
  };

  const generateBookReference = (citation: IBookCitation) => {
    const { book_title, advanced_info, publication_info, contributors } =
      citation;
    let reference = '';
    if (contributors && contributors.length > 0) {
      const contributorNames = contributors.map((contributor, idx) => {
        const { first_name, last_name, middle_name } = contributor;
        let fullName = '';
        if (last_name) {
          fullName += last_name;
        }
        if (first_name) {
          fullName += `, ${first_name.charAt(0)}.`;
        }
        if (middle_name) {
          fullName += ` ${middle_name.charAt(0)}.`;
        }
        return fullName;
      });
      reference += `${contributorNames.join(', ')}.`;
    }
    reference += ` (${publication_info?.publish_year}). ${book_title}`;
    if (advanced_info?.edition) {
      reference += ` (${advanced_info.edition}nd ed.)`;
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
      const contributorNames = contributors.map((contributor) => {
        const { first_name, last_name, middle_name } = contributor;
        let fullName = '';
        if (last_name) {
          fullName += last_name;
        }
        if (first_name) {
          fullName += `, ${first_name.charAt(0)}.`;
        }
        if (middle_name) {
          fullName += ` ${middle_name.charAt(0)}.`;
        }
        return fullName;
      });
      reference += `${contributorNames.join(', ')}.`;
    }
    reference += ` (${publication_info?.publish_year}). ${section_title}. In ${book_title}`;
    if (advanced_info?.edition) {
      reference += ` (${advanced_info.edition}nd ed.)`;
    }
    if (publication_info?.publisher) {
      reference += ` ${publication_info.publisher}.`;
    }
    if (page_info?.start && page_info?.end) {
      reference += ` (pp. ${page_info.start}-${page_info.end})`;
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
      const contributorNames = contributors.map((contributor) => {
        const { first_name, last_name, middle_name } = contributor;
        let fullName = '';
        if (last_name) {
          fullName += last_name;
        }
        if (first_name) {
          fullName += `, ${first_name.charAt(0)}.`;
        }
        if (middle_name) {
          fullName += ` ${middle_name.charAt(0)}.`;
        }
        return fullName;
      });
      reference += `${contributorNames.join(', ')}.`;
    }
    reference += ` (${publication_info?.publish_year}). ${section_title}. In ${book_title}`;
    if (advanced_info?.edition) {
      reference += ` (${advanced_info.edition}nd ed.)`;
    }
    if (publication_info?.publisher) {
      reference += ` ${publication_info.publisher}.`;
    }
    if (page_info?.start && page_info?.end) {
      reference += ` (pp. ${page_info.start}-${page_info.end})`;
    }
    return reference;
  };

  const generateAPAReference = () => {
    if (citation.type === 'website') {
      return generateWebsiteReference(citation.data as IWebsiteCitation);
    } else if (citation.type === 'journal') {
      return generateJournalReference(citation.data as IJournalCitation);
    } else if (citation.type === 'whole_book') {
      return generateBookReference(citation.data as IBookCitation);
    } else if (citation.type === 'book_section') {
      return generateChapterReference(citation.data as IChapterCitation);
    } else if (citation.type === 'booke_special_section') {
      return generateIntroductionReference(
        citation.data as IIntroductionCitation
      );
    }
  };

  return (
    <p dangerouslySetInnerHTML={{ __html: generateAPAReference() ?? '' }} />
  );
};

export default APAReference;
