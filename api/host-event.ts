import Constants from 'expo-constants';

type HostEventInput = {
  name: string;
  startDateTime: number;
  placeId: string;
  amenities: string[];
  price: number;
};

const { apiUrl } = Constants.expoConfig?.extra || {};

if (!apiUrl) {
  throw new Error(`Missing apiUrl. Make sure you have added it to your app.json file.`);
}

export const hostEvent = async (
  input: HostEventInput,
  authToken: string
): Promise<string | undefined> => {
  const response = await fetch(`${apiUrl}/watch-party/v1/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const error = await response.json();
    return error.message;
  }
};
