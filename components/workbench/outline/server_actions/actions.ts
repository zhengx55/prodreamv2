'use server';
import { actionClient } from '@/lib/actions/client';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const deleteOutline = actionClient
  .bindArgsSchemas<[outline_id: z.ZodString]>([z.string()])
  .action(async ({ bindArgsParsedInputs: [outline_id] }) => {
    const token = cookies().get('token')?.value;
    await fetch(
      `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}outline/${outline_id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    revalidateTag('outlines');
    return { message: 'Outline deleted successfully' };
  });

export async function revalidateOutlines() {
  revalidateTag('outlines');
}

export const generateDraft = actionClient
  .bindArgsSchemas<[outline_id: z.ZodString]>([z.string()])
  .action(async ({ bindArgsParsedInputs: [outline_id] }) => {
    const token = cookies().get('token')?.value;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_V2_BASE_URL}draft`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ outline_id }),
    });
    const data = await res.json();
    redirect(`/draft&feedback/${data.data.draft_id}`);
  });
