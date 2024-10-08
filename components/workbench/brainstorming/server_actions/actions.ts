'use server';

import { actionClient } from '@/lib/actions/client';
import { flattenValidationErrors } from 'next-safe-action';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

const createMaterialSchema = zfd.formData({
  title: zfd.text(z.string().optional()),
  content: zfd.text(z.string()),
});

const updateMaterialSchema = zfd.formData({
  title: zfd.text(z.string().optional()),
  content: zfd.text(z.string()),
});

export const createMaterial = actionClient
  .schema(createMaterialSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .bindArgsSchemas<[theme_id: z.ZodString]>([z.string()])
  .action(
    async ({
      parsedInput: { title, content },
      bindArgsParsedInputs: [theme_id],
    }) => {
      const token = cookies().get('token')?.value;
      await fetch(`${process.env.NEXT_PUBLIC_API_V2_BASE_URL}material`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          theme_id: theme_id,
        }),
      });
      revalidateTag('materials');
    }
  );

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
    revalidateTag('materials');
    return { message: 'Material deleted successfully' };
  });

export const updateMaterial = actionClient
  .schema(updateMaterialSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .bindArgsSchemas<[id: z.ZodString, theme_id: z.ZodString]>([
    z.string(),
    z.string(),
  ])
  .action(
    async ({
      parsedInput: { title, content },
      bindArgsParsedInputs: [id, theme_id],
    }) => {
      const token = cookies().get('token')?.value;
      await fetch(`${process.env.NEXT_PUBLIC_API_V2_BASE_URL}material/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          theme_id: theme_id,
        }),
      });
      revalidateTag('materials');
    }
  );

export async function revalidateMaterials() {
  revalidateTag('materials');
}
