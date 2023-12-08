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
  console.log('hostEvent', input);
  const response = await fetch(`${apiUrl}/watch-party/v1/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    console.log(response.status);
    if (response.status === 400) {
      const data = await response.json();
      return data.message;
    }
    return 'An error occurred on our end! Please try again later.';
  }
};
