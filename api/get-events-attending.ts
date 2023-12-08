import Constants from 'expo-constants';
import { WatchParty } from './types';

type GetEventsAttendingResponse =
  | { watchParties: WatchParty[]; error: undefined }
  | { watchParties: undefined; error: string };

const { apiUrl } = Constants.expoConfig?.extra || {};

export const getEventsAttending = async (
  authToken: string
): Promise<GetEventsAttendingResponse> => {
  const response = await fetch(
    `${apiUrl}/watch-party/v1?${new URLSearchParams({
      type: 'attendee',
    })}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  if (!response.ok) {
    console.log(response.status);
    return { watchParties: undefined, error: 'An error occurred on our end! Please try again.' };
  }

  const data = await response.json();
  return { watchParties: data.watchParties, error: undefined };
};
