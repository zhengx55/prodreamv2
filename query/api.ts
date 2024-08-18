import { IDiscount, ISubscription } from '@/types';
import { JSONContent } from '@tiptap/react';
import Cookies from 'js-cookie';
import {
  IDetectionResult,
  IPlagiarismData,
  IPolishParams,
  LoginData,
  UserTrackData,
} from './type';

// ----------------------------------------------------------------
// Info
// ----------------------------------------------------------------

export async function resendEmail(): Promise<void> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/verification_email`,
      {
        headers: { Authorization: `Bearer ${token}` },
        method: 'GET',
      }
    );
    const data = await res.json();
    if (data.code !== 0) {
      throw data.msg;
    }
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function getUserMemberShip(): Promise<ISubscription> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/payment/balance`,
      {
        headers: { Authorization: `Bearer ${token}` },
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

export async function getCoupon(coupon: string): Promise<ISubscription> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/payment/coupon/${coupon}`,
      {
        headers: { Authorization: `Bearer ${token}` },
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

export async function getDiscountInfo(): Promise<IDiscount> {
  const token = Cookies.get('token');
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/referral_discount`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!res.ok) throw new Error('Failed to fetch coupon');
  const data = await res.json();
  if (data.code !== 0) throw new Error('Failed to fetch coupon');
  return data.data;
}

export async function purchaseMembership(params: {
  product_id: string;
  url: string;
  coupon: string;
}) {
  try {
    const formData = new FormData();
    formData.append('redirect_url', params.url);
    formData.append('coupon', params.coupon);
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/payment/${params.product_id}/order`,
      {
        method: 'POST',
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
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

export async function unSubscripeMembership(params: {
  subscription_id: string;
}) {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/payment/orders/${params.subscription_id}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
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

export async function getUserInfo(): Promise<UserTrackData> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/auxiliary_info`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
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

export async function updateUserInfo(params: {
  field: keyof UserTrackData;
  data: any;
}) {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/auxiliary_info`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify({
          field: params.field,
          data: params.data,
        }),
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

export async function getIpAddress() {
  try {
    const ip = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/utils/ip_country`
    );
    const ip_data = (await ip.json()).data;
    return ip_data === 'China';
  } catch (error) {
    return false;
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

export async function synonym(params: { word: string }): Promise<string[]> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/editor/tool/synonyms/${params.word}`,
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

export async function outline(params: {
  essay_type: string;
  idea: string;
  area: string;
}): Promise<ReadableStream> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/editor/tool/outline_generate/${params.essay_type}`,
      {
        method: 'POST',
        body: JSON.stringify({
          idea: params.idea,
          area: params.area,
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

export async function refreshUserSession(): Promise<LoginData> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/me`,
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

// ----------------------------------------------------------------
// Onboarding
// ----------------------------------------------------------------
export async function setFeaturePreferences(params: {
  features: string[];
}): Promise<void> {
  try {
    const token = Cookies.get('token');
    const formdata = new FormData();
    formdata.append('features', params.features.join(','));
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/feature_preference`,
      {
        headers: { Authorization: `Bearer ${token}` },
        method: 'PUT',
        body: formdata,
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

// ----------------------------------------------------------------
// CHAT AGENT
// ----------------------------------------------------------------
export async function SendChatAgent({
  session_id,
  response,
  agent,
}: {
  session_id: string | null;
  response: string | null;
  agent: string | null;
}): Promise<ReadableStream> {
  try {
    const token = Cookies.get('token');
    const body = JSON.stringify({ session_id, response, agent });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/chat/agent`,
      {
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok || !res.body) throw new Error('Oops something went wrong');

    return res.body;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

// ----------------------------------------------------------------
// Feedback
// ----------------------------------------------------------------
export async function submitFeedback(params: {
  description: string;
  attachments: string[];
  feedback_type: 'issue' | 'feature';
}): Promise<void> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/feedback/`,
      {
        method: 'POST',
        body: JSON.stringify(params),
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
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function feedbackAttachments(attachment: File): Promise<string[]> {
  try {
    const token = Cookies.get('token');
    const formData = new FormData();
    formData.append('attachment', attachment);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/feedback/attachment`,
      {
        method: 'POST',
        body: formData,
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
