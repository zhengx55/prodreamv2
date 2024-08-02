import { actionClient } from '@/lib/actions/client';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';

export const deleteMaterial = actionClient
  .bindArgsSchemas<[essay_id: z.ZodString]>([z.string()])
  .action(async ({ bindArgsParsedInputs: [essay_id] }) => {
    const token = cookies().get('token')?.value;
    await fetch(`${process.env.NEXT_PUBLIC_API_V2_BASE_URL}essay/${essay_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    revalidateTag('outlines');
    return { message: 'Outline deleted successfully' };
  });
