import {
  IBookCitation,
  IChapterCitation,
  ICitationType,
  IIntroductionCitation,
  IJournalCitation,
  IWebsiteCitation,
} from '@/types';
import React from 'react';

interface IMLAReferenceProps {
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

const MLAReference: React.FC<IMLAReferenceProps> = ({ citation }) => {
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
          fullName += `${last_name}`;
        }
        if (middle_name) {
          fullName += ` ${middle_name}`;
        }
        if (first_name) {
          fullName += ` ${first_name}`;
        }
        return fullName;
      });
      if (contributorNames.length >= 3) {
        reference += `${contributorNames[0]} et al.`;
      } else {
        reference += `${contributorNames.join(' & ')}.`;
      }
    }
    reference += ` "${article_title}." <em>${website_title}</em>, ${publisher},`;
    reference += ` ${access_date.day} ${access_date.month} ${access_date.year}`;
    if (url) {
      reference += ` ${url},`;
    }
    return reference.endsWith(',') ? reference.slice(0, -1) + '.' : reference;
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
          fullName += `${last_name}`;
        }
        if (middle_name) {
          fullName += ` ${middle_name}`;
        }
        if (first_name) {
          fullName += ` ${first_name}`;
        }
        return fullName;
      });
      if (contributorNames.length >= 3) {
        reference += `${contributorNames[0]} et al.`;
      } else {
        reference += `${contributorNames.join(' & ')}.`;
      }
    }
    reference += ` "${article_title}." <em>${journal_title}</em>,`;
    if (advanced_info?.volume) reference += ` vol. ${advanced_info?.volume},`;
    if (advanced_info?.issue) reference += ` no. ${advanced_info?.issue},`;
    if (publish_date?.day) reference += ` ${publish_date?.day}`;
    if (publish_date?.month) reference += ` ${publish_date?.month}`;
    if (publish_date?.year) reference += ` ${publish_date?.year},`;
    if (page_info?.start && page_info?.end)
      reference += ` pp. ${page_info?.start}-${page_info?.end},`;
    if (doi) reference += ` https://doi.org/${doi}.`;
    return reference.endsWith(',') ? reference.slice(0, -1) + '.' : reference;
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
          fullName += `${last_name}`;
        }
        if (middle_name) {
          fullName += ` ${middle_name}`;
        }
        if (first_name) {
          fullName += ` ${first_name}`;
        }
        return fullName;
      });
      if (contributorNames.length >= 3) {
        reference += `${contributorNames[0]} et al.`;
      } else {
        reference += `${contributorNames.join(' & ')}.`;
      }
    }
    reference += ` <em>${book_title}</em>. ${advanced_info?.edition}nd ed., vol. ${advanced_info?.vol} ${advanced_info?.total_vol}, ${publication_info?.publisher}, ${publication_info?.publish_year}`;
    if (advanced_info?.edition) {
      reference += ` ${advanced_info.edition}nd ed.,`;
    }
    if (advanced_info?.vol) {
      reference += ` Vol. ${advanced_info.vol},`;
    }
    if (advanced_info?.total_vol) {
      reference += ` ${advanced_info.total_vol},`;
    }
    if (publication_info?.publisher) {
      reference += ` ${publication_info.publisher},`;
    }
    if (publication_info?.publish_year) {
      reference += ` ${publication_info.publish_year},`;
    }
    return reference.endsWith(',') ? reference.slice(0, -1) + '.' : reference;
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
          fullName += `${last_name}`;
        }
        if (middle_name) {
          fullName += ` ${middle_name}`;
        }
        if (first_name) {
          fullName += ` ${first_name}`;
        }
        return fullName;
      });
      if (contributorNames.length >= 3) {
        reference += `${contributorNames[0]} et al.`;
      } else {
        reference += `${contributorNames.join(' & ')}.`;
      }
    }
    reference += ` "${section_title}." <em>${book_title}</em>.`;
    if (advanced_info?.edition) {
      reference += ` ${advanced_info.edition}nd ed.,`;
    }
    if (advanced_info?.vol) {
      reference += ` Vol. ${advanced_info.vol},`;
    }
    if (advanced_info?.total_vol) {
      reference += ` ${advanced_info.total_vol},`;
    }
    if (publication_info?.publisher) {
      reference += ` ${publication_info.publisher},`;
    }
    if (publication_info?.city) {
      reference += ` ${publication_info.city},`;
    }
    if (publication_info?.state) {
      reference += ` ${publication_info.state},`;
    }
    if (page_info?.start && page_info.end) {
      reference += ` ${page_info.start}-${page_info.end}.`;
    }
    if (advanced_info?.series) {
      reference += ` ${advanced_info.series}.`;
    }
    return reference.endsWith(',') ? reference.slice(0, -1) + '.' : reference;
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
          fullName += `${last_name}`;
        }
        if (middle_name) {
          fullName += ` ${middle_name}`;
        }
        if (first_name) {
          fullName += ` ${first_name}`;
        }

        return fullName;
      });
      if (contributorNames.length >= 3) {
        reference += `${contributorNames[0]} et al.`;
      } else {
        reference += `${contributorNames.join(' & ')}.`;
      }
    }
    reference += ` "${section_title}." <em>${book_title}</em>.`;
    if (advanced_info?.edition) {
      reference += ` ${advanced_info.edition}nd ed.,`;
    }
    if (advanced_info?.vol) {
      reference += ` Vol. ${advanced_info.vol},`;
    }
    if (advanced_info?.total_vol) {
      reference += ` ${advanced_info.total_vol},`;
    }
    if (publication_info?.publisher) {
      reference += ` ${publication_info.publisher},`;
    }
    if (publication_info?.city) {
      reference += ` ${publication_info.city},`;
    }
    if (publication_info?.state) {
      reference += ` ${publication_info.state},`;
    }
    if (page_info?.start && page_info.end) {
      reference += ` ${page_info.start}-${page_info.end}.`;
    }
    if (advanced_info?.series) {
      reference += ` ${advanced_info.series}.`;
    }
    return reference.endsWith(',') ? reference.slice(0, -1) + '.' : reference;
  };

  const generateMLAReference = () => {
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
  };

  return (
    <p dangerouslySetInnerHTML={{ __html: generateMLAReference() ?? '' }} />
  );
};

export default MLAReference;
