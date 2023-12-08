import Constants from 'expo-constants';
import queryString from 'node:querystring';

type PlaceAutocompleteApiResult =
  | { predictions: { description: string; place_id: string }[]; error: undefined }
  | { predictions: undefined; error: string };

const { apiUrl } = Constants.expoConfig?.extra || {};

export const placeAutocomplete = async (
  input: string,
  authToken: string
): Promise<PlaceAutocompleteApiResult> => {
  const response = await fetch(
    `${apiUrl}/misc/v1/places?${new URLSearchParams({ query: input }).toString()}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    return { predictions: undefined, error: data.message };
  }

  return { predictions: data.predictions, error: undefined };
};
