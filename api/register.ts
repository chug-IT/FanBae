import Constants from "expo-constants";

type RegisterFormInput = {
  email: string;
  password: string;
  name: string;
  phone: string;
  birthday: number;
};

type RegisterFormResponse = {
  authToken: string;
  user: {
    name: string;
    email: string;
    phone: string;
    birthday: number;
  };
};

const { apiUrl } = Constants.expoConfig?.extra || {};

export const register = async (
  input: RegisterFormInput
): Promise<[RegisterFormResponse?, string?]> => {
  if (!apiUrl || typeof apiUrl !== "string") {
    throw new Error(
      "No apiUrl provided. Please check app.json and ensure it is under extra.apiUrl"
    );
  }

  const response = await fetch(`${apiUrl}/auth/v1/register`, {
    method: "POST",
    body: JSON.stringify(input),
  });
  const data = await response.json();

  if (response.status === 201) {
    return [data];
  } else if (response.status === 409) {
    return [undefined, "Email already exists. Please try logging in."];
  }

  return [undefined, `An error occurred on our end!. ${data.message}`];
};
