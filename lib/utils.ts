import { ICitation, IPolishResultAData } from '@/query/type';
import { IJournalCitation } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import posthog from 'posthog-js';
import { twMerge } from 'tailwind-merge';

export function btnClick(btnName: string, userId: string) {
  posthog.capture(btnName, {
    // button_id: buttonId, // Dynamic button ID
    user_id: userId,
    // ... other properties
  });
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
type Object = { [key: string]: any };

const isObject = (item: any): item is Object => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

/**
 * Deep merge two objects by overriding target with fields in source.
 * It returns a new object and doesn't modify any object in place since
 * it deep clones the target object first.
 */
export const deepMerge = (target: Object, source: Object, level = 0) => {
  const copyTarget = level === 0 ? structuredClone(target) : target;
  for (const key in source) {
    const sourceValue = source[key];
    // Assign source value to copyTarget if source value is not an object.
    // Otherwise, call deepMerge recursively to merge all its keys
    if (!isObject(sourceValue)) {
      copyTarget[key] = sourceValue;
    } else {
      if (!isObject(copyTarget[key])) {
        copyTarget[key] = {};
      }
      deepMerge(copyTarget[key], sourceValue, level + 1);
    }
  }
  return copyTarget;
};

export const deepEqual = (
  obj1: { [x: string]: any } | null,
  obj2: { [x: string]: any } | null
) => {
  if (obj1 === obj2) {
    return true;
  }

  if (
    typeof obj1 !== 'object' ||
    obj1 === null ||
    typeof obj2 !== 'object' ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
};

export function formatDateMM(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const yearStr = year.toString();
  const monthStr = month < 10 ? `0${month}` : month.toString();

  return `${yearStr}-${monthStr}`;
}

export function countWords(inputString: string) {
  if (!inputString) return 0;
  const words = inputString.match(/\b\w+\b/g);
  if (!words) {
    return 0;
  }
  return words.length;
}

export function findSwappedElements(
  originalArray: Array<any>,
  swappedArray: Array<any>
) {
  if (originalArray.length !== swappedArray.length) {
    return null;
  }

  const swapIndexes = [];

  for (let i = 0; i < originalArray.length; i++) {
    if (originalArray[i] !== swappedArray[i]) {
      swapIndexes.push(i);
    }
  }

  if (swapIndexes.length === 2) {
    return swapIndexes;
  } else {
    return null;
  }
}

export function formatTimestamphh(timestampString: string) {
  const currentLocalTime = new Date();
  const utcTimeString = currentLocalTime
    .toISOString()
    .replace('T', ' ')
    .slice(0, 19);

  const targetTimestamp = new Date(timestampString).getTime();
  const differenceInMilliseconds =
    new Date(utcTimeString).getTime() - targetTimestamp;
  const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

  if (differenceInHours < 24) {
    const hoursAgo = Math.floor(differenceInHours);
    return `${hoursAgo} hours ago`;
  } else {
    return timestampString;
  }
}

export function formatTimestamphh_number(timestamp: number) {
  const currentTime = new Date().getTime();
  const timeDifference = currentTime - timestamp * 1000;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 1) {
    return `${days} days ago`;
  } else if (hours > 1) {
    return `${hours} hours ago`;
  } else if (minutes > 1) {
    return `${minutes} mins ago`;
  } else {
    return `${seconds} seconds ago`;
  }
}

export function addRandomToDuplicates(array: string[]) {
  const countMap: Record<string, number> = {};
  const newArray = [];

  for (const element of array) {
    const count = countMap[element] || 0;
    countMap[element] = count + 1;

    if (count > 0) {
      // 如果元素已经出现过，添加随机数
      newArray.push(`${element}+${Math.floor(Math.random() * 100)}`);
    } else {
      // 否则直接添加元素
      newArray.push(element);
    }
  }

  return newArray;
}

export function formatTimestampToDateString(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const monthNames = [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dec.',
  ];
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${month} ${day}, ${year} ${hours}:${minutes}:${seconds}`;
}

export function removeHtmlTags(input: string): string {
  let resultwithBR = input.replace(/<\/?span[^>]*>/g, '');
  return resultwithBR.replace(/<br\s*\/?>/gi, '\n');
}

export const getSubStrPos = (current_suggestion: IPolishResultAData) => {
  let corrsponding_segement = '';
  current_suggestion?.data.forEach((suggestion, suggenstion_idx) => {
    if ([2, 3].includes(suggestion.status)) {
      if (
        suggenstion_idx < current_suggestion.data.length - 1 &&
        [2, 3].includes(current_suggestion.data.at(suggenstion_idx + 1)!.status)
      ) {
        corrsponding_segement += ` ${suggestion.sub_str}`;
      } else {
        corrsponding_segement += ` ${suggestion.sub_str} `;
      }
    } else if (
      suggestion.status === 1 &&
      suggenstion_idx < current_suggestion.data.length - 1 &&
      ![1, 2, 3].includes(
        current_suggestion.data.at(suggenstion_idx + 1)!.status
      )
    ) {
      corrsponding_segement += ' ';
    } else {
      corrsponding_segement += suggestion.sub_str;
    }
  });
  return corrsponding_segement;
};

export const getDiffSentencesPair = (item: IPolishResultAData) => {
  let relpace_string = '';
  let original_string = '';
  item.data.map((sentence) => {
    if (sentence.status === 0) {
      original_string === ''
        ? (original_string += `${sentence.sub_str}`)
        : (original_string += ` ${sentence.sub_str}`);
      relpace_string === ''
        ? (relpace_string += `${sentence.sub_str}`)
        : (relpace_string += ` ${sentence.sub_str}`);
    } else if ([1, 2, 3].includes(sentence.status)) {
      if (sentence.status !== 1) {
        original_string === ''
          ? (original_string += `${sentence.sub_str}`)
          : (original_string += ` ${sentence.sub_str}`);
      }
      if (sentence.status !== 2) {
        relpace_string === ''
          ? (relpace_string += `${sentence.new_str}`)
          : (relpace_string += ` ${sentence.new_str}`);
      } else {
        relpace_string += ' ';
      }
    }
  });
  original_string = original_string.trim();
  return { relpace_string, original_string };
};

export function numberToMonth(number: number): string | null {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  if (number >= 1 && number <= 12) {
    return months[number - 1];
  } else {
    // 不在有效范围内返回 null 或者其他默认值
    return null;
  }
}

export function ConvertCitationData(item: ICitation) {
  const converted_data = {} as IJournalCitation;
  const {
    advanced_info,
    article_title,
    authors,
    doi,
    journal_title,
    page_info,
    publish_date,
    abstract,
    pdf_url,
    reference_count,
    area,
  } = item;
  console.log('🚀 ~ ConvertCitationData ~ item:', item);
  converted_data.publish_date = {
    day: publish_date.day ?? '',
    month: publish_date.month ? numberToMonth(publish_date.month) : '',
    year: publish_date.year ?? '',
  };
  converted_data.contributors = authors ?? [
    {
      first_name: '',
      last_name: '',
      middle_name: '',
      role: '',
      suffix: '',
    },
  ];
  converted_data.reference_count = reference_count ?? 0;
  converted_data.area = area ?? [];
  converted_data.page_info = page_info ?? '';
  converted_data.journal_title = journal_title ?? '';
  converted_data.article_title = article_title ?? '';
  converted_data.abstract = abstract ?? '';
  converted_data.pdf_url = pdf_url ?? '';
  converted_data.doi = doi ?? '';
  converted_data.advanced_info = {
    issue: advanced_info.issue ?? '',
    volume: advanced_info.volume ?? '',
    series: advanced_info.series ?? '',
  };
  return converted_data;
}
