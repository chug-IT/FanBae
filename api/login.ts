import Constants from 'expo-constants';

type LoginFormInput = {
  email: string;
  password: string;
};

type LoginFormResponse = {
  authToken: string;
  user: {
    name: string;
    email: string;
    phone: string;
    birthday: number;
  };
};

type LoginResult =
  | { response: LoginFormResponse; error: undefined }
  | { response: undefined; error: string };

const { apiUrl } = Constants.expoConfig?.extra || {};

export const login = async (input: LoginFormInput): Promise<LoginResult> => {
  if (!apiUrl || typeof apiUrl !== 'string') {
    throw new Error(
      'No apiUrl provided. Please check app.json and ensure it is under extra.apiUrl'
    );
  }

  const response = await fetch(`${apiUrl}/auth/v1/login`, {
    method: 'POST',
    body: JSON.stringify(input),
  });
  const data = await response.json();

  if (response.status === 200) {
    return { response: data, error: undefined };
  } else if (response.status === 401) {
    return { response: undefined, error: 'Invalid email or password' };
  }

  return { response: undefined, error: `An error occurred on our end!. ${data.message}` };
};
