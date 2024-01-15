import { AnswerRequestParam, FormQuestionResponse, IUsage } from '@/types';
import Cookies from 'js-cookie';
import {
  IActListResData,
  IBrainStormSection,
  IBrainstormHistory,
  IBriansotrmReq,
  IChatHistoryData,
  IChatRequest,
  IChatSessionData,
  IDocDetail,
  IEssayAssessData,
  IEssayAssessRequest,
  IGenerateActListParams,
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
// BrainStorm
// ----------------------------------------------------------------

export async function getBrainstormDetails(
  template_id: string
): Promise<IBrainStormSection> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}get_template?lang=en`,
      {
        method: 'POST',
        body: JSON.stringify({
          template_id,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
    const token = Cookies.get('token');

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
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    if (data.code !== 0) {
      throw new Error(data.msg as string);
    }
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
    const token = Cookies.get('token');

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
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function queryEssayResult(
  task_id: string
): Promise<{ status: 'doing' | 'done'; text: string }> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}essay_write_query`,
      {
        method: 'POST',
        body: JSON.stringify({
          task_id,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function SubmitEssayWritting(
  params: IBriansotrmReq
): Promise<string> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}essay_write_submit`,
      {
        method: 'POST',
        body: JSON.stringify({
          pro_mode: params.pro_mode,
          template_id: params.template_id,
          word_nums: params.word_nums,
          texts: params.texts,
          types: params.types,
          user_id: params.user_id.toString(),
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
}): Promise<LoginData> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}login_google`,
      {
        method: 'POST',
        body: JSON.stringify({
          access_token: loginParam.access_token,
          from: loginParam.from ?? '',
          refferal: loginParam.refferal ?? '',
        }),
        headers: {
          'Content-Type': 'application/json',
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

export async function userLogin(loginParam: {
  username: string;
  password: string;
}): Promise<LoginData> {
  try {
    const formData = new FormData();
    formData.append('email', loginParam.username);
    formData.append('password', loginParam.password);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}login`, {
      method: 'POST',
      body: formData,
    });
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

export async function userLogOut() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}logout`, {
      method: 'DELETE',
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
export async function getReferralLink() {}

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
export async function copilot(params: { tool: string; text: string }) {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `http://127.0.0.1:8080/api/v1/editor/tool/${params.tool}`,
      {
        method: 'POST',
        body: JSON.stringify({
          text: params.text,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijp7InVzZXJfaWQiOiJiYjk3NDgzZjZkNTI0MGYxOWFiMTA1OTNhMzYwYTAyOSJ9LCJ0eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA1OTMxNDc0LCJpYXQiOjE3MDUzMjY2NzQsImp0aSI6ImJmNWMwNWY5LWJkZjYtNDU1NC1hYTk1LTMwNDM0ZDIyMWZjNCJ9.nuVLZtOTjKlGYixRc_0ETdy8lcINSaeKn6lRFArQGxc`,
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

export async function synonym(params: { word: string }) {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `http://127.0.0.1:8080/api/v1/editor/synonyms/${params.word}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijp7InVzZXJfaWQiOiJiYjk3NDgzZjZkNTI0MGYxOWFiMTA1OTNhMzYwYTAyOSJ9LCJ0eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA1OTMxNDc0LCJpYXQiOjE3MDUzMjY2NzQsImp0aSI6ImJmNWMwNWY5LWJkZjYtNDU1NC1hYTk1LTMwNDM0ZDIyMWZjNCJ9.nuVLZtOTjKlGYixRc_0ETdy8lcINSaeKn6lRFArQGxc`,
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

export async function downloadEassy() {}

export async function getPreDefinedOptions() {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}essay_polish/preset_prompt`,
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
// Activity List
// ----------------------------------------------------------------

export async function generateActivityList(
  params: IGenerateActListParams
): Promise<IActListResData> {
  try {
    const body = JSON.stringify({
      texts: params.texts,
      lengths: params.lengths,
      power_up: params.power_up,
      mode: params.mode,
    });
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}activity_magic`,
      {
        method: 'POST',
        body,
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

export async function deleteActivityList(item_id: string) {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}activity_list/${item_id}`,
      {
        method: 'DELETE',
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

export async function clonectivityListItem(item_id: string) {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}activity_list/${item_id}`,
      {
        method: 'POST',
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

export async function deleteActivityListItem(item_id: string) {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}activity/${item_id}`,
      {
        method: 'DELETE',
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

export async function updateActivityListItem(params: {
  id: string;
  title?: string;
  text?: string;
}) {
  try {
    const body = JSON.stringify({
      data: {
        ...(params.title !== undefined ? { title: params.title } : {}),
        ...(params.text !== undefined ? { text: params.text } : {}),
      },
    });
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}activity/${params.id}`,
      {
        method: 'PATCH',
        body,
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

export async function uploadActivityFile(params: { file: File }) {
  try {
    const formData = new FormData();
    formData.append('file', params.file);
    const token = Cookies.get('token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}file`, {
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

export async function getDecodedData(params: {
  file_urls: string[];
}): Promise<{ extracurricular_activities: string[] }> {
  try {
    const body = JSON.stringify({
      file_urls: params.file_urls,
    });
    const token = Cookies.get('token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}activity_list`, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
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
// Resume
// ----------------------------------------------------------------
export async function saveResume() {}

// ----------------------------------------------------------------
// Chat
// ----------------------------------------------------------------
export async function fetchChatGuideQas(
  template_id: string
): Promise<FormQuestionResponse> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}answer_guide/questions/${template_id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    if (data.msg) {
      throw new Error(data.msg as string);
    }
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function sendChatMessage(params: AnswerRequestParam) {
  try {
    const token = Cookies.get('token');
    const body = JSON.stringify({
      session_id: params.sessionid,
      template_id: params.templateid,
      question_id: params.questionid,
      message: params.message,
      previous_session_ids: params.previousSessionids,
      form_question_answer: params.formQuestionAnswer,
    });
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}answer_guide/`, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function fetchFinalAs(session_id: string): Promise<any> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}answer_guide/${session_id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res;
  } catch (error) {
    throw new Error(error as string);
  }
}

// ----------------------------------------------------------------
// Chat With Max
// ----------------------------------------------------------------
export async function fetchChatHistory(): Promise<IChatHistoryData[]> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}chat?page=1&page_size=999`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    if (data.code !== 0) {
      throw new Error(data.msg as string);
    }
    return data.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function fetchSessionHistory(
  session_id: string
): Promise<IChatSessionData[]> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}chat/${session_id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    if (data.code !== 0) {
      throw new Error(data.msg as string);
    }
    return data.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function sendMessage(params: IChatRequest) {
  try {
    const token = Cookies.get('token');
    const body = JSON.stringify({
      func_type: params.func_type,
      query: params.query,
      session_id: params.session_id,
    });
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}chat`, {
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

export async function deleteSession(session_id: string) {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}chat/${session_id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    if (data.code !== 0) {
      throw new Error(data.msg as string);
    }
    return data.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function fetchResponse(session_id: string) {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}chat/${session_id}/latest`,
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}refresh`, {
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

// ----------------------------------------------------------------
// 打点
// ----------------------------------------------------------------

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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}document`, {
      method: 'POST',
      body: formData,
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

export async function saveDoc(params: {
  id: string;
  title?: string;
  text?: string;
}) {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}document/${params.id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: params.text ?? null,
          title: params.title ?? null,
        }),
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
      `${process.env.NEXT_PUBLIC_API_URL}document/${doc_id}`,
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
        process.env.NEXT_PUBLIC_API_URL
      }document?page=${page}&page_size=${pageSize}&keyword=${keyword ?? ''}`,
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
    return { hasMore: data.data.n_remaining_page > 0, list: data.data.docs };
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function getDocDetail(doc_id: string): Promise<IDocDetail> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}document/${doc_id}`,
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
