import { useEffect } from 'react';
import { useUserContext } from '../hooks';
import { router } from 'expo-router';
import Constants from 'expo-constants';

const { apiUrl } = Constants.expoConfig?.extra || {};

if (!apiUrl) {
  throw new Error(`Missing apiUrl. Make sure you have added it to your app.json file.`);
}

export type ChooseInterestApiParams = {
  interests: string[];
  authToken: string;
};

export const chooseInterests = async ({
  interests,
  authToken,
}: ChooseInterestApiParams): Promise<string | undefined> => {
  const response = await fetch(`${apiUrl}/auth/v1/choose-interests`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({ interests }),
  });

  if (!response.ok) {
    const error = await response.json();
    return error.message;
  }
};
