'use server';
import { actionClient } from '@/lib/actions/client';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';

export const deleteDraft = actionClient
  .bindArgsSchemas<[draft_id: z.ZodString]>([z.string()])
  .action(async ({ bindArgsParsedInputs: [draft_id] }) => {
    const token = cookies().get('token')?.value;
    await fetch(`${process.env.NEXT_PUBLIC_API_V2_BASE_URL}draft/${draft_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    revalidateTag('drafts');
    return { message: 'Draft deleted successfully' };
  });

export const updateDraft = actionClient
  .schema(
    z.object({
      draft_id: z.string(),
      title: z.union([z.string(), z.null()]),
      content: z.union([z.string(), z.null()]),
      html: z.union([z.string(), z.null()]),
    })
  )
  .action(async ({ parsedInput: { draft_id, title, content, html } }) => {
    const token = cookies().get('token')?.value;
    await fetch(`${process.env.NEXT_PUBLIC_API_V2_BASE_URL}draft/${draft_id}`, {
      method: 'PATCH',
      body: JSON.stringify({ title, content, html }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    revalidateTag(`draft-${draft_id}`);
    revalidateTag('drafts');
  });

export async function revalidateDrafts() {
  revalidateTag('drafts');
}
