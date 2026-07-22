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

type SessionResponse = {
  success: boolean;
};

type NoteRequest = {
  title: string;
  content: string;
  tag: string;
};

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const CURRENT_USER_KEY = 'noteFlowCurrentUser';
const MY_NOTES_KEY_PREFIX = 'noteFlowMyNotes';

const getStorageKey = () => {
  if (typeof window === 'undefined') return '';

  const currentUser = localStorage.getItem(CURRENT_USER_KEY);

  return currentUser
    ? `${MY_NOTES_KEY_PREFIX}:${currentUser}`
    : MY_NOTES_KEY_PREFIX;
};

export const setCurrentUserForNotes = (email: string) => {
  if (typeof window === 'undefined') return;

  localStorage.setItem(CURRENT_USER_KEY, email);
};

export const resetMyNoteIds = () => {
  if (typeof window === 'undefined') return;

  localStorage.setItem(getStorageKey(), JSON.stringify([]));
};

export const getMyNoteIds = (): string[] => {
  if (typeof window === 'undefined') return [];

  const savedIds = localStorage.getItem(getStorageKey());

  return savedIds ? JSON.parse(savedIds) : [];
};

const saveMyNoteId = (id: string) => {
  if (typeof window === 'undefined') return;

  const ids = getMyNoteIds();

  if (!ids.includes(id)) {
    localStorage.setItem(getStorageKey(), JSON.stringify([...ids, id]));
  }
};

const removeMyNoteId = (id: string) => {
  if (typeof window === 'undefined') return;

  const ids = getMyNoteIds().filter((noteId) => noteId !== id);

  localStorage.setItem(getStorageKey(), JSON.stringify(ids));
};

export const register = async (data: RegisterRequest): Promise<User> => {
  const res = await api.post<User>('/auth/register', data);

  setCurrentUserForNotes(res.data.email);

  return res.data;
};

export const login = async (data: LoginRequest): Promise<User> => {
  const res = await api.post<User>('/auth/login', data);

  setCurrentUserForNotes(res.data.email);

  return res.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const checkSession = async (): Promise<boolean> => {
  const res = await api.get<SessionResponse>('/auth/session');

  return res.data.success;
};

export const getMe = async (): Promise<User> => {
  const res = await api.get<User>('/users/me');

  setCurrentUserForNotes(res.data.email);

  return res.data;
};

export const updateMe = async (data: {
  username: string;
}): Promise<User> => {
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

export const createNote = async (data: NoteRequest): Promise<Note> => {
  const res = await api.post<Note>('/notes', data);

  saveMyNoteId(res.data.id);

  return res.data;
};

export const updateNote = async (
  id: string,
  data: NoteRequest
): Promise<Note> => {
  const res = await api.patch<Note>(`/notes/${id}`, data);

  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await api.delete<Note>(`/notes/${id}`);

  removeMyNoteId(id);

  return res.data;
};