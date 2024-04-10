import {
  ICitationData,
  ICitationType,
  IDiscount,
  ISubscription,
} from '@/types';
import { JSONContent } from '@tiptap/react';
import Cookies from 'js-cookie';
import {
  ICitation,
  IDetectionResult,
  IDocDetail,
  IPlagiarismData,
  IPolishParams,
  IResetParams,
  ISigunUpRequest,
  IVerifyEmail,
  LoginData,
  ReferenceType,
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

export async function setLanguageInfo(params: { language_background: string }) {
  try {
    const token = Cookies.get('token');
    const formdata = new FormData();
    formdata.append('language_background', params.language_background);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/language_background`,
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

export async function setEduInfo(params: { educational_background: string }) {
  try {
    const token = Cookies.get('token');
    const formdata = new FormData();
    formdata.append('educational_background', params.educational_background);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/educational_background`,
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
// Authentication
// ----------------------------------------------------------------

export async function googleLogin(loginParam: {
  access_token: string;
  traffic_source?: string;
  referral?: string;
  is_mobile?: boolean;
}): Promise<{ access_token: string }> {
  try {
    const formData = new FormData();
    formData.append('google_access_token', loginParam.access_token);
    formData.append('traffic_source', loginParam.traffic_source ?? '');
    formData.append('referral', loginParam.referral ?? '');
    formData.append('is_mobile', loginParam.is_mobile ? '1' : '0');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/login/google`,
      {
        method: 'POST',
        body: formData,
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

export async function userLogin(loginParam: {
  username: string;
  password: string;
}): Promise<{ access_token: string }> {
  try {
    const formData = new FormData();
    formData.append('email', loginParam.username);
    formData.append('password', loginParam.password);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/login`,
      {
        method: 'POST',
        body: formData,
      }
    );
    const data = await res.json();
    if (data.data === null) {
      throw data.msg;
    }
    return data.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function userSignUp(signUpParam: ISigunUpRequest) {
  try {
    const formdata = new FormData();
    formdata.append('email', signUpParam.email);
    formdata.append('password', signUpParam.password);
    formdata.append('is_mobile', signUpParam.is_mobile ? '1' : '0');
    if (signUpParam.referral) formdata.append('referral', signUpParam.referral);
    if (signUpParam.traffic_source)
      formdata.append('traffic_source', signUpParam.traffic_source);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/register`,
      {
        method: 'POST',
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

export async function userReset(params: IResetParams) {
  try {
    const formData = new FormData();
    formData.append('email', params.email);
    formData.append('password', params.password);
    formData.append('verification_code', params.verification_code);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/password/forget`,
      {
        method: 'POST',
        body: formData,
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

export async function sendVerificationEmail(params: { email: string }) {
  try {
    const formData = new FormData();
    formData.append('email', params.email);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/password/forget/verification_code`,
      {
        method: 'POST',
        body: formData,
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

export async function verifyEmail(params: IVerifyEmail) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}verification_code?code=${params.code}&type=${params.type}&email=${params.email}`,
      {
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

export async function batchHumanize(texts: string[]) {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/editor/humanize`,
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
    return res.body;
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
// 通知
// ----------------------------------------------------------------

// ----------------------------------------------------------------
// Profile
// ----------------------------------------------------------------
export async function profileResetEmail(params: {
  new_email: string;
  password: string;
}) {
  try {
    const formData = new FormData();
    formData.append('email', params.new_email);
    formData.append('password', params.password);
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/email`,
      {
        method: 'PUT',
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

export async function profileResetPasswords(params: {
  new_password: string;
  old_password: string;
}) {
  try {
    const formData = new FormData();
    formData.append('password', params.new_password);
    formData.append('old_password', params.old_password);
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/password`,
      {
        method: 'PUT',
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

export async function profileResetName(params: {
  first_name: string;
  last_name: string;
}) {
  try {
    const token = Cookies.get('token');
    const formData = new FormData();
    formData.append('first_name', params.first_name);
    formData.append('last_name', params.last_name);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/name`,
      {
        method: 'PUT',
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

export async function profileResetAvatar(params: { file: File }) {
  try {
    const formData = new FormData();
    formData.append('avatar', params.file);
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/avatar`,
      {
        method: 'PUT',
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
// Doc
// ----------------------------------------------------------------
export async function createDoc(text?: string, title?: string, file?: File) {
  const formData = new FormData();
  formData.append('content', text ?? '');
  formData.append('title', title ?? '');
  if (file) {
    formData.append('file', file);
  }
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v0/editor/document`,
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          contentType: 'multipart/form-data',
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

export async function saveDoc(params: {
  id: string;
  title?: string;
  content?: string;
  citation_candidate_ids?: string[];
  citation_ids?: string[];
  use_intention?: string;
  brief_description?: string;
}) {
  try {
    let body: {
      title?: string;
      content?: string;
      citation_candidate_ids?: string[];
      citation_ids?: string[];
      use_intention?: string;
      brief_description?: string;
    } = {};
    if (params.content !== undefined) body.content = params.content;
    if (params.title !== undefined) body.title = params.title;
    if (params.citation_ids !== undefined)
      body.citation_ids = params.citation_ids;
    if (params.citation_candidate_ids !== undefined)
      body.citation_candidate_ids = params.citation_candidate_ids;
    if (params.use_intention !== undefined)
      body.use_intention = params.use_intention;
    if (params.brief_description !== undefined)
      body.brief_description = params.brief_description;

    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v0/editor/document/${params.id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
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

export async function deleteDoc(doc_id: string) {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v0/editor/document/${doc_id}`,
      {
        method: 'DELETE',
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

export async function getDocs(
  page: number,
  pageSize: number = 10,
  keyword?: string
): Promise<{ hasMore: boolean; list: IDocDetail[] }> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_BASE_URL
      }v0/editor/documents?page=${page}&page_size=${pageSize}${keyword ? `&query=${keyword}` : ''}`,
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
    return {
      hasMore: data.data.remaining_pages > 0,
      list: data.data.documents,
    };
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function getDocDetail(doc_id: string): Promise<IDocDetail> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v0/editor/document/${doc_id}`,
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
// Citation
// ----------------------------------------------------------------

export async function getReferenceType(params: {
  type: ReferenceType;
  bibtex: string[];
}): Promise<string[]> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/editor/citation/format/${params.type}`,
      {
        method: 'POST',
        body: JSON.stringify({
          bibtex: params.bibtex,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
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

export async function createCitation(params: {
  citation_type: ICitationType;
  citation_data: any;
  document_id: string;
}) {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/editor/citation/${params.citation_type}`,
      {
        method: 'POST',
        body: JSON.stringify({
          document_id: params.document_id,
          data: params.citation_data,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!res.ok) throw new Error('Opps something went wrong');
    const data = await res.json();
    return data.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function updateCitation(params: {
  citation_type: ICitationType;
  id: string;
  data: ICitationData;
}) {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/editor/citation/${params.citation_type}/${params.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(params.data),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!res.ok) throw new Error('Opps something went wrong');
    const data = await res.json();
    return data.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function getCitationDetail(params: {
  citation_type: ICitationType;
  citation_id: string;
}) {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/editor/citation/${params.citation_type}/${params.citation_id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) throw new Error('Opps something went wrong');
    const data = await res.json();
    return data.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function getCitations(params: { citation_ids: string[] }) {
  try {
    const token = Cookies.get('token');
    const queryString = params.citation_ids
      .map((item) => `citation_ids=${encodeURIComponent(item)}`)
      .join('&');

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/editor/citation?${queryString}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) throw new Error('Opps something went wrong');
    const data = await res.json();
    return data.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function searchCitation(
  searchTerm: string,
  signal: AbortSignal,
  need_summary?: 0 | 1
): Promise<ICitation[]> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/editor/citation/search?query=${searchTerm}&need_summary=${need_summary ?? '1'}`,
      {
        signal,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    if (data.code !== 0) {
      throw new Error(
        'Citation machine is not available for now, please try again later'
      );
    }
    let result: ICitation[] = data.data;
    let filter_result: ICitation[] = result.map((article) => {
      const { authors = [], ...rest } = article;
      return { ...rest, contributors: authors };
    });
    return filter_result;
  } catch (error) {
    throw new Error(
      'Citation machine is not available for now, please try again later'
    );
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
// CHAT
// ----------------------------------------------------------------
export async function chat(params: {
  session_id: string | null;
  query: string;
}): Promise<ReadableStream> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}v1/chat/`, {
      method: 'POST',
      body: JSON.stringify({
        session_id: params.session_id,
        query: params.query,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok || !res.body) throw new Error('Opps something went wrong');
    return res.body;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function pdfSummary() {}
