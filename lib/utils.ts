import { clsx, type ClassValue } from 'clsx';
import escapeStringRegExp from 'escape-string-regexp';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
type Object = { [key: string]: any };

const isObject = (item: any): item is Object => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

export function getReferralSource() {
  const sources = ['google', 'baidu'];
  return (
    sources.find((source) => document.referrer.includes(source)) || undefined
  );
}

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

export function formatTimestamphh(timestamp: number) {
  const currentLocalTime = new Date();
  const currentTimestamp = currentLocalTime.getTime();
  const differenceInMilliseconds = currentTimestamp - timestamp * 1000;
  const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
  const differenceInMinutes = differenceInMilliseconds / (1000 * 60);
  if (differenceInMinutes < 60) {
    const minutesAgo = Math.floor(differenceInMinutes);
    return `${minutesAgo} minutes ago`;
  }
  if (differenceInHours < 24) {
    const hoursAgo = Math.floor(differenceInHours);
    return `${hoursAgo} hours ago`;
  } else {
    const daysAgo = Math.floor(differenceInHours / 24);
    return `${daysAgo} days ago`;
  }
}

export function formatTimestamphh_number(
  timestamp: number,
  trans: (key: string, params: { [key: string]: any }) => string
) {
  const currentTime = new Date().getTime();
  const timeDifference = currentTime - timestamp * 1000;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 1) {
    return trans('TimesAgo.Days_Ago', { days: days });
  } else if (hours > 1) {
    return trans('TimesAgo.Hours_Ago', { hours: hours });
  } else if (minutes > 1) {
    return trans('TimesAgo.Minutes_Ago', { minutes: minutes });
  } else {
    return trans('TimesAgo.Seconds_Ago', { seconds: seconds });
  }
}

export function addRandomToDuplicates(array: string[]) {
  const countMap: Record<string, number> = {};
  const newArray = [];

  for (const element of array) {
    const count = countMap[element] || 0;
    countMap[element] = count + 1;

    if (count > 0) {
      // If the element has already appeared, add a random number
      newArray.push(`${element}+${Math.floor(Math.random() * 100)}`);
    } else {
      // Otherwise, directly add the element
      newArray.push(element);
    }
  }

  return newArray;
}

export function removeHtmlTags(input: string): string {
  let resultwithBR = input.replace(/<\/?span[^>]*>/g, '');
  return resultwithBR.replace(/<br\s*\/?>/gi, '\n');
}

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
    return null;
  }
}

export function createRegex(str: string) {
  let substring_regex: RegExp;
  if (/[^\w\s]+/g.test(str)) {
    substring_regex = new RegExp(escapeStringRegExp(str), 'i');
  } else {
    substring_regex = new RegExp(`\\b${str}\\b`, 'g');
  }
  return substring_regex;
}
