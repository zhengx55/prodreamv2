import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
  const currentTimestamp = new Date().getTime();
  const targetTimestamp = new Date(timestampString).getTime();
  const differenceInMilliseconds = currentTimestamp - targetTimestamp;
  const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

  if (differenceInHours < 24) {
    const hoursAgo = Math.floor(differenceInHours);
    return `${hoursAgo} hours ago`;
  } else {
    return timestampString;
  }
}
