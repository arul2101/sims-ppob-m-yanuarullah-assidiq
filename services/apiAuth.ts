import { axiosInstance } from "@/utils/lib/axiosInstance";

export type RequestSignUp = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};

export type RequestLogin = {
  email: string;
  password: string;
}

export type RequestUpdate = {
  first_name: string;
  last_name: string;
}

// adminganteng@gmail.com
// admin1234

export async function signup(request: RequestSignUp) {
  try {
    const response = await axiosInstance.post('/registration', request);

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function login(request: RequestLogin) {
  try {
    const response = await axiosInstance.post('/login', request);

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getUser(token: string) {
  try {
    const response = await axiosInstance.get('/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function updateUser(token: string, request: RequestUpdate) {
  try {
    const response = await axiosInstance.put('/profile/update', request, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getBanner(token: string) {
  try {
    const response = await axiosInstance.get('/banner', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getServices(token: string) {
  try {
    const response = await axiosInstance.get('/services', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getBalance(token: string) {
  try {
    const response = await axiosInstance.get('/balance', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function topup(token: string, request: { top_up_amount: number }) {
  try {
    const response = await axiosInstance.post('/topup', request, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getTransactionHistory({ token, limit, offset }: { token: string; limit: number; offset: number }) {
  try {
    const response = await axiosInstance.get(`/transaction/history?limit=${limit}&offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function transaction(token: string, type: string) {
  try {
    const response = await axiosInstance.post('/transaction', { service_code: type }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function uploadFile(token: string, file) {
  try {
    const response = await axiosInstance.put('/profile/image', file, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

