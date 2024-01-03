'use server';
import { revalidatePath } from 'next/cache';
const clearCachesByServerAction = async (path: string) => {
  console.log('clearing caches');
  try {
    if (path) {
      revalidatePath(path);
    }
  } catch (error) {
    console.error('clearCachesByServerAction=> ', error);
  }
};
export default clearCachesByServerAction;
