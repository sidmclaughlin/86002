import { LoginDto, UpdatePaintDto, UpdateSettingsDto } from '@86002/core-kit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../../authentication/dtos/user.dto';
import { Paint } from '../../paint/dtos/paint.dto';
import { Settings } from '../../settings/dtos/settings.dto';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://86002.sdny.dev/api/v1',
    credentials: 'include',
  }),
  tagTypes: ['Paints'],
  endpoints: builder => ({
    login: builder.mutation<User, LoginDto>({
      query: (data: LoginDto) => ({
        method: 'POST',
        url: '/auth/login',
        body: data,
      }),
    }),
    getProfile: builder.query<User, void>({
      query: () => ({ url: '/auth/profile' }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        method: 'POST',
        url: '/auth/logout',
      }),
    }),
    getPaints: builder.query<Paint[], void>({
      query: () => ({ url: '/paints' }),
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Paints' as const, id })), { type: 'Paints', id: 'LIST' }]
          : [{ type: 'Paints', id: 'LIST' }],
    }),
    getPaint: builder.query<Paint, number>({
      query: (id: number) => ({ url: `/paints/${id}` }),
    }),
    updatePaint: builder.mutation<Paint, UpdatePaintDto & { id: number }>({
      query: ({ id, ...rest }: UpdatePaintDto & { id: number }) => ({
        method: 'PATCH',
        url: `/paints/${id}`,
        body: { ...rest },
      }),
      invalidatesTags: [{ type: 'Paints', id: 'LIST' }],
    }),
    getSettings: builder.query<Settings, void>({
      query: () => ({ url: '/settings' }),
    }),
    updateSettings: builder.mutation<Settings, UpdateSettingsDto>({
      query: (data: UpdateSettingsDto) => ({
        method: 'PATCH',
        url: '/settings',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProfileQuery,
  useLogoutMutation,
  useGetPaintsQuery,
  useGetPaintQuery,
  useUpdatePaintMutation,
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} = api;
