import Constants from 'expo-constants';
import { WatchParty } from './types';

type GetEventsResponse =
  | { watchParties: WatchParty[]; error: undefined }
  | { watchParties: undefined; error: string };

const { apiUrl } = Constants.expoConfig?.extra || {};

export const getEvents = async (
  lat: number,
  lng: number,
  authToken: string
): Promise<GetEventsResponse> => {
  const response = await fetch(
    `${apiUrl}/watch-party/v1/list?${new URLSearchParams({
      lat: lat.toString(),
      lng: lng.toString(),
    }).toString()}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    return {
      watchParties: undefined,
      error: 'There was an error on our end! Please try again later.',
    };
  }

  return { watchParties: data.watchParties, error: undefined };
};
