import { JSONContent } from '@tiptap/react';
import Cookies from 'js-cookie';
import { IDetectionResult, IPlagiarismData, IPolishParams } from './type';

// ----------------------------------------------------------------
// Essay Polish
// ----------------------------------------------------------------
export async function copilot(params: {
  tool: string;
  text: string;
  writing_goal?: string;
}): Promise<ReadableStream> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/editor/tool/${params.tool}`,
      {
        method: 'POST',
        body: JSON.stringify({
          text: params.text,
          writing_goal: params.writing_goal,
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok || !res.body) throw new Error('Opps something went wrong');
    return res.body;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function humanize(params: {
  text: string;
}): Promise<ReadableStream> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/editor/humanize`,
      {
        method: 'POST',
        body: JSON.stringify({
          text: params.text,
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok || !res.body) throw new Error('Opps something went wrong');
    return res.body;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function ask(params: {
  instruction: string;
  text: string;
  writing_goal?: string;
  session_id?: string;
}): Promise<ReadableStream> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/editor/tool/chat`,
      {
        method: 'POST',
        body: JSON.stringify({
          text: params.text,
          instruction: params.instruction,
          writing_goal: params.writing_goal,
          session_id: params.session_id ?? null,
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok || !res.body) throw new Error('Opps something went wrong');
    return res.body;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function plagiarismCheck(text: string) {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/editor/plagiarism_check`,
      {
        method: 'POST',
        body: JSON.stringify({
          text,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    if (data.code !== 0) {
      throw new Error(data.msg as string);
    }
    return data.data;
  } catch (error) {
    throw new Error('Opps something went wrong, please try again later');
  }
}

export async function batchParaphrase(texts: string[]) {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/editor/plagiarism_check/paraphrase`,
      {
        method: 'POST',
        body: JSON.stringify({
          texts: texts,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    if (data.code !== 0) {
      throw new Error(data.msg as string);
    }

    return data.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function batchHumanize(texts: string[]): Promise<string[]> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/editor/humanize/batch`,
      {
        method: 'POST',
        body: JSON.stringify({
          text: texts,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: 'text/event-stream',
        },
      }
    );
    const data = await res.json();
    if (data.code !== 0) {
      throw new Error(data.msg as string);
    }
    return data.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function plagiarismQuery(
  scan_id: string
): Promise<IPlagiarismData> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/editor/plagiarism_check/${scan_id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    if (data.code !== 0) {
      throw new Error(data.msg as string);
    }
    return data.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function submitPolish(params: IPolishParams) {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/editor/tool/grammar_typo/block`,
      {
        method: 'POST',
        body: JSON.stringify({
          blocks: params.block,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    if (data.code !== 0) {
      throw new Error(data.msg as string);
    }
    return data.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

// ----------------------------------------------------------------
// AI-Detection
// ----------------------------------------------------------------
export async function getDetectionResult(params: {
  text: JSONContent[];
}): Promise<IDetectionResult> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/editor/ai_detect`,
      {
        method: 'POST',
        body: JSON.stringify({
          blocks: params.text,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    if (data.code !== 0) {
      throw data.msg;
    }
    return data.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function PageTrack(
  event: string,
  time: string,
  mobile?: number,
  traffic_source?: string
) {
  try {
    const token = Cookies.get('token');
    let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/log/page/${event}/?duration=${time}&mobile=${mobile ?? 0}&traffic_source=${traffic_source ?? ''}`;
    if (!token)
      url = `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/log/page/${event}/anonymous?duration=${time}&mobile=${mobile ?? 0}&traffic_source=${traffic_source ?? ''}`;
    await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      method: 'POST',
    });
  } catch (error) {
    console.error(error);
  }
}

export async function ButtonTrack(event: string, mobile: number) {
  try {
    let body = { mobile };
    const token = Cookies.get('token');
    let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/log/click/${event}`;
    if (!token)
      url = `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/log/click/${event}/anonymous`;
    await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      method: 'POST',
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error(error);
  }
}
