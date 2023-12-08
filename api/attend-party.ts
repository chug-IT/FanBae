import Constants from 'expo-constants';

const { apiUrl } = Constants.expoConfig?.extra || {};

export const attendParty = async (
  eventId: string,
  authToken: string
): Promise<string | undefined> => {
  const response = await fetch(`${apiUrl}/attendence/v1`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({ eventId }),
  });

  if (!response.ok) {
    const data = await response.json();
    if (response.status === 409) {
      return 'You are already attending this event!';
    }
    return 'There was an error on our end! Please try again later.';
  }
};
