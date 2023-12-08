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

const { apiUrl } = Constants.expoConfig?.extra || {};

export const login = async (input: LoginFormInput): Promise<[LoginFormResponse?, string?]> => {
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
    return [data];
  } else if (response.status === 401) {
    return [undefined, 'Invalid email or password. Please try again.'];
  }

  return [undefined, `An error occurred on our end!. ${data.message}`];
};
