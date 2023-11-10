import { IBrainStormSection, IBrainstormHistory } from './type';

export async function getBrainstormDetails(
  template_id: string
): Promise<IBrainStormSection> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}get_template?lang=en`,
      {
        method: 'POST',
        body: JSON.stringify({
          template_id,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
        },
      }
    );
    const data = await res.json();
    return data.data.result;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function getBrianstormHistoryById(
  template_id: string
): Promise<IBrainstormHistory> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}write_history_query`,
      {
        method: 'POST',
        body: JSON.stringify({
          template_id,
          page: 1,
          page_size: 999,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function OptimizeAnswer(
  question_id: string,
  answer: string,
  type: 0 | 1
): Promise<string> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}answer_optimize`,
      {
        method: 'POST',
        body: JSON.stringify({
          question_id,
          answer,
          type,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
        },
      }
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function SubmitTemplatesForm(
  pro_mode: boolean,
  template_id: string,
  word_nums: number = 0,
  text: string[],
  types: string[]
): Promise<string> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}essay_write_submit`,
      {
        method: 'POST',
        body: JSON.stringify({
          pro_mode,
          template_id,
          word_nums,
          text,
          types,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
        },
      }
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    throw new Error(error as string);
  }
}
