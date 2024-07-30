'use server';

import { actionClient } from '@/lib/actions/client';
import { getUserIdFromToken } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const createMaterialSchema = z.object({
  title: z.string().max(50).optional(),
  content: z.string().max(1000),
});
const updateMaterialSchema = z.object({
  title: z.string().max(50).optional(),
  content: z.string().max(1000).optional(),
});

export const createMaterial = actionClient
  .schema(createMaterialSchema)
  .action(async ({ parsedInput: { title, content } }) => {
    const token = cookies().get('token')?.value;
    const user_id = getUserIdFromToken(token ?? '');
    await fetch(`${process.env.NEXT_PUBLIC_API_V2_BASE_URL}material`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });
    revalidatePath('/brainstorming');
    redirect('/brainstorming');
  });

export const deleteMaterial = () => {};
export const updateMaterial = actionClient
  .schema(updateMaterialSchema)
  .action(async () => {
    revalidatePath('/brainstorming');
    redirect('/brainstorming');
  });
