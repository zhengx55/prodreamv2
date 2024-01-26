import { ICitationType, IUsage } from '@/types';
import Cookies from 'js-cookie';
import {
  ICitation,
  IDocDetail,
  IEssayAssessData,
  IEssayAssessRequest,
  INotificationData,
  IPlagiarismData,
  IPolishParams,
  IPolishResultA,
  IResetParams,
  ISigunUpRequest,
  IVerifyEmail,
  LoginData,
  SupportDetailData,
} from './type';

// ----------------------------------------------------------------
// Info
// ----------------------------------------------------------------

export async function getUserInfo(email: string): Promise<IUsage> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/info?email=${email}`,
      {
        headers: { Authorization: `Bearer ${token}` },
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

export async function updateUserInfo(
  email: string,
  params: IUsage
): Promise<void> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/info?email=${email}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...params,
        }),
        method: 'POST',
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

// ----------------------------------------------------------------
// Authentication
// ----------------------------------------------------------------

export async function googleLogin(loginParam: {
  access_token: string;
  from?: string;
  refferal?: string;
}): Promise<{ access_token: string }> {
  try {
    const formData = new FormData();
    formData.append('google_access_token', loginParam.access_token);
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
    let flag:boolean = false 
    flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    const formdata = new FormData();
    formdata.append('first_name', signUpParam.first_name);
    formdata.append('last_name', signUpParam.last_name);
    formdata.append('email', signUpParam.email);
    formdata.append('password', signUpParam.password);
    formdata.append('is_mobile', flag ? 1 : 0);
    formdata.append('from', signUpParam.from ? signUpParam.from : '');
    formdata.append(
      'referral',
      signUpParam.referral ? signUpParam.referral : ''
    );

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}register`, {
      method: 'POST',
      body: formdata,
    });
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
    formData.append('new_password1', params.password);
    formData.append('new_password2', params.confirm);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}set_pass`, {
      method: 'PATCH',
      body: formData,
    });
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
      `${process.env.NEXT_PUBLIC_API_BASE_URL}verification_code`,
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
// Referral
// ----------------------------------------------------------------
export async function getReferralCount() {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/referral_count`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const count_data = await res.json();
    return count_data.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function uploadPaper() {}

export async function redeem() {}

export async function checkRedeemStatus() {}

// ----------------------------------------------------------------
// Essay Polish
// ----------------------------------------------------------------
export async function copilot(params: {
  tool: string;
  text: string;
}): Promise<ReadableStream> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/editor/tool/${params.tool}`,
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
      `${process.env.NEXT_PUBLIC_API_URL}plagiarism_check/submit`,
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
    throw new Error(error as string);
  }
}

export async function plagiarismQuery(
  scan_id: string
): Promise<IPlagiarismData> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}plagiarism_check/query`,
      {
        method: 'POST',
        body: JSON.stringify({
          scan_id,
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

export async function submitPolish(params: IPolishParams) {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}essay_polish_submit`,
      {
        method: 'POST',
        body: JSON.stringify({
          text: params.text,
          granularity: params.granularity,
          tone: params.tone,
          volume_control: params.volume_control,
          volume_target: params.volume_target,
          scenario: params.scenario,
          instruction: params.instruction,
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

export async function queryPolish(params: {
  task_id: string;
}): Promise<IPolishResultA> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}essay_polish_query`,
      {
        method: 'POST',
        body: JSON.stringify({
          task_id: params.task_id,
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

export async function essayAssess(
  params: IEssayAssessRequest
): Promise<IEssayAssessData> {
  try {
    const body = JSON.stringify({
      text: params.text,
      language: params.language,
      institution_id: params.institution_id,
      prompt_id: params.prompt_id,
      direct: params.direct,
    });
    const token = Cookies.get('token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}essay_assess`, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (data.code !== 0) {
      throw new Error(data.msg as string);
    }
    return data.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function feedBackReport(params: {
  feedback: 0 | 1 | 2;
  id: string;
}) {
  ///ai/report_feedback
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}report_feedback`,
      {
        method: 'POST',
        body: JSON.stringify({
          feedback: params.feedback,
          id: params.id,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error();
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function downloadReport(report_id: string) {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}report_pdf/${report_id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error('Failed to Download PDF report');
    }
    return res;
  } catch (error) {
    throw new Error('Failed to Download PDF report');
  }
}

export async function getInstitutionOptions(): Promise<SupportDetailData[]> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}essay_assess/support_detail`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    if (data.code !== 0) {
      throw new Error(data as string);
    }
    return data.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function uploadEssay(params: { file: File }) {
  try {
    const formData = new FormData();
    formData.append('file', params.file);
    const token = Cookies.get('token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}file2text`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
// 通知
// ----------------------------------------------------------------

export async function fetchNotice(): Promise<INotificationData> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}notice`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (data.code !== 0) {
      throw new Error(data.msg as string);
    }
    return data.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function checkNotice() {}

// ----------------------------------------------------------------
// Profile
// ----------------------------------------------------------------
export async function profileResetEmail(params: {
  new_email: string;
  password: string;
}) {
  try {
    const formData = new FormData();
    formData.append('new_email', params.new_email);
    formData.append('password', params.password);
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}reset_email`,
      {
        method: 'PATCH',
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
    formData.append('new_password', params.new_password);
    formData.append('old_password', params.old_password);
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}reset_pass`,
      {
        method: 'PATCH',
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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/name?last_name=${params.last_name}&first_name=${params.first_name}`,
      {
        method: 'PATCH',
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
    formData.append('file', params.file);
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/avatar`,
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

export async function createDoc(text?: string, file?: File) {
  const formData = new FormData();
  formData.append('text', text ?? ' ');
  if (file) {
    formData.append('file', file);
    formData.delete('text');
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
}) {
  try {
    let body: {
      title?: string;
      content?: string;
      citation_candidate_ids?: string[];
      citation_ids?: string[];
    } = {};
    if (params.content !== undefined) body.content = params.content;
    if (params.title !== undefined) body.title = params.title;
    if (params.citation_ids !== undefined)
      body.citation_ids = params.citation_ids;
    if (params.citation_candidate_ids !== undefined)
      body.citation_candidate_ids = params.citation_candidate_ids;

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
      }v0/editor/documents?page=${page}&page_size=${pageSize}${keyword ? `&keyword=${keyword}` : ''}`,
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

export async function updateCitation() {}

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
      throw data.msg;
    }
    return data.data;
  } catch (error) {
    throw new Error(error as string);
  }
}
