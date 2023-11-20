import { AnswerRequestParam, FormQuestionResponse } from '@/types';
import {
  IBrainStormSection,
  IBrainstormHistory,
  IEssayAssessRequest,
  IOptRequest,
  ISigunUpRequest,
  IessayAssessData,
  LoginData,
  SupportDetailData,
} from './type';
import Cookies from 'js-cookie';

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
  pro_mode: boolean,
  template_id: string,
  word_nums: string,
  texts: string[],
  types: string[],
  user_id: number
): Promise<string> {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}essay_write_submit`,
      {
        method: 'POST',
        body: JSON.stringify({
          pro_mode,
          template_id,
          word_nums,
          texts,
          types,
          user_id,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error as string);
    }
    return data.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

// ----------------------------------------------------------------
// Authentication
// ----------------------------------------------------------------

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
      credentials: 'include',
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
    formdata.append('first_name', signUpParam.first_name);
    formdata.append(
      'last_name',
      signUpParam.last_name ? signUpParam.last_name : ''
    );
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
    console.log('🚀 ~ file: api.ts:209 ~ userSignUp ~ data:', data);
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

export async function userGoogleLogin() {}

// ----------------------------------------------------------------
// Essay Polish
// ----------------------------------------------------------------
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
    if (data.error) {
      throw new Error(data.error as string);
    }
    return data.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function submitPolish() {
  //https://test.quickapply.app/api/ai/essay_polish_submit
}

export async function queryPolish() {
  // https://test.quickapply.app/api/ai/essay_polish_query
}

export async function essayAssess(
  params: IEssayAssessRequest
): Promise<IessayAssessData> {
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
      throw new Error(data.error as string);
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

export async function downloadReport() {
  ///ai/report_pdf/{report_id}
}

export async function getSupportDetails(): Promise<SupportDetailData> {
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
      throw new Error(data.error as string);
    }
    return data.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

// ----------------------------------------------------------------
// Activity List
// ----------------------------------------------------------------
export async function optmize_activity() {}

// ----------------------------------------------------------------
// Resume
// ----------------------------------------------------------------
export async function fetchResume(params: IOptRequest) {
  try {
    const body = JSON.stringify({
      text: params.text,
      lengths: params.lengths,
    });
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}activity_optimize`,
      {
        method: 'POST',
        body,
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
    if (data.error) {
      throw new Error(data.error as string);
    }
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
}

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
    if (data.error) {
      throw new Error(data.error as string);
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
        credentials: 'include',
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
// 通知
// ----------------------------------------------------------------

export async function fetchNotice() {}

export async function checkNotice() {}

// ----------------------------------------------------------------
// 打点
// ----------------------------------------------------------------
