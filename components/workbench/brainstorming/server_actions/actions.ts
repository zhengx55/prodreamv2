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
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        student_id: user_id,
      }),
    });
    revalidatePath('/brainstorming');
    return { message: 'Material created successfully' };
  });

export const deleteMaterial = actionClient
  .schema(z.object({ material_id: z.string() }))
  .action(async ({ parsedInput: { material_id } }) => {
    const token = cookies().get('token')?.value;
    await fetch(
      `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}material/${material_id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    revalidatePath('/brainstorming');
    return { message: 'Material deleted successfully' };
  });
export const updateMaterial = actionClient
  .schema(updateMaterialSchema)
  .action(async () => {
    revalidatePath('/brainstorming');
    redirect('/brainstorming');
  });
