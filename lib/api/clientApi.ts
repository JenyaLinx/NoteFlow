import { api } from './api';
import { User } from '@/types/user';
import { Note } from '@/types/note';

type RegisterRequest = {
  email: string;
  password: string;
};

type LoginRequest = {
  email: string;
  password: string;
};

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}


export const register = async (data: RegisterRequest): Promise<User> => {
  const res = await api.post<User>('/auth/sign-up', data);
  return res.data;
};


export const login = async (data: LoginRequest): Promise<User> => {
  const res = await api.post<User>('/auth/sign-in', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};


export const checkSession = async (): Promise<boolean> => {
  try {
    const res = await api.post<{ token: string }>('/auth/refresh');
    return !!res.data;
  } catch {
    return false;
  }
};

export const getMe = async (): Promise<User> => {
  const res = await api.get<User>('/users/me');
  return res.data;
};

export const updateMe = async (data: { username: string }): Promise<User> => {
  const res = await api.patch<User>('/users/me', data);
  return res.data;
};

export const fetchNotes = async (
  page: number,
  search: string,
  tag: string
): Promise<FetchNotesResponse> => {
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

  const res = await api.get<FetchNotesResponse>('/notes', {
    params,
  });

  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (data: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {
  const res = await api.post<Note>('/notes', data);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
};