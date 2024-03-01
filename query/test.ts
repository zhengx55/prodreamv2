// AB test API

import Cookies from 'js-cookie';

export async function postABTestByToken(variance: string) {
  try {
    if (!variance || variance === 'undefined') return;
    const params = JSON.stringify({
      variance: variance,
    });

    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/log/experiment/${process.env.NEXT_PUBLIC_POSTHOG_EXPERIMENT}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: params,
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

export async function postABTest(variance: string) {
  try {
    if (!variance || variance === 'undefined') return;
    const params = JSON.stringify({
      variance: variance,
    });
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/log/experiment/${process.env.NEXT_PUBLIC_POSTHOG_EXPERIMENT}/anonymous`,
      {
        method: 'POST',
        body: params,
        headers: {
          'Content-Type': 'application/json',
        },
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

export async function postABTestPagePoint(params: {
  page: string;
  duration?: number;
}) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/log/page/${params.page}/anonymous?duration=${params.duration}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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

export async function postABTestPagePointByToken(params: {
  page: string;
  duration?: number;
}) {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/log/page/${params.page}/anonymous?duration=${params.duration}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
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
