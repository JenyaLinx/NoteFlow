import { cookies } from 'next/headers';
import axios, { AxiosResponse } from 'axios';
import { User } from '@/types/user';
import { Note } from '@/types/note';
import { FetchNotesResponse } from './clientApi';

const serverApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  withCredentials: true,
});

export const checkSession = async (): Promise<
  AxiosResponse<{ success: boolean }>
> => {
  const cookieStore = await cookies();

  return serverApi.get<{ success: boolean }>('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
};

export const getMe = async (): Promise<User | null> => {
  const cookieStore = await cookies();

  try {
    const res = await serverApi.get<User>('/users/me', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return res.data;
  } catch {
    return null;
  }
};

export const fetchNotes = async (
  page: number,
  search: string,
  tag: string
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();

  const params: {
    page: number;
    search: string;
    perPage: number;
    tag?: string;
  } = {
    page,
    search,
    perPage: 12,
  };

  if (tag !== 'all') {
    params.tag = tag;
  }

  const res = await serverApi.get<FetchNotesResponse>('/notes', {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();

  const res = await serverApi.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};