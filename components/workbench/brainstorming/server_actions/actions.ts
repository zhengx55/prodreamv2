'use server';

import { actionClient } from '@/lib/actions/client';
import { revalidatePath } from 'next/cache';
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
  .action(async () => {
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
