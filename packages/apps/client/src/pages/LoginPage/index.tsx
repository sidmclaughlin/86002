/* eslint-disable @typescript-eslint/no-misused-promises */
import { getErrorMessage, LoginDto } from '@86002/core-kit';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Button, Card, Center, LoadingOverlay, PasswordInput, Space, TextInput, Title, Tooltip } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Paint } from 'tabler-icons-react';
import { setUser } from '../../authentication/authentication.slice';
import { useAppDispatch } from '../../store/hooks';
import { useGetProfileQuery, useLoginMutation } from '../../store/services/api.service';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const mountedRef = useRef(true);

  const { data, isLoading: getProfileIsLoading } = useGetProfileQuery();

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
      navigate('/');
    }

    return () => {
      mountedRef.current = false;
    };
  }, [data]);

  const [login, { isLoading: loginIsLoading }] = useLoginMutation();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: classValidatorResolver(LoginDto),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: Record<string, any>) => {
    try {
      const response = await login(values as LoginDto).unwrap();
      // Prevents memory leak
      if (mountedRef.current) {
        dispatch(setUser(response));
        navigate('/', { replace: true });
      }
    } catch (error) {
      showNotification({ title: 'Error', message: getErrorMessage((error as FetchBaseQueryError).data), color: 'red' });
    }
  };

  return (
    <>
      <Helmet title="Login" />
      <Center style={{ width: '100vw', height: '100vh' }}>
        <div>
          <Title order={1}>
            <Paint /> A Paint Company
          </Title>
          <Card p="xs" shadow="md" withBorder={true}>
            <LoadingOverlay visible={getProfileIsLoading || loginIsLoading} />
            <div>
              <div style={{ textAlign: 'center' }}>
                <Title order={3}>Login</Title>
              </div>
              <Space h="xs" />
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      size="sm"
                      placeholder="Email Address"
                      rightSection={
                        errors.email && (
                          <Tooltip label={errors.email.message} position="top" placement="end">
                            <AlertCircle size={16} style={{ color: '#F00', display: 'block' }} />
                          </Tooltip>
                        )
                      }
                    />
                  )}
                />
                <Space h="xs" />
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <PasswordInput
                      {...field}
                      size="sm"
                      placeholder="Password"
                      rightSection={
                        errors.password && (
                          <Tooltip label={errors.password.message} position="top" placement="end">
                            <AlertCircle size={16} style={{ color: '#F00', display: 'block' }} />
                          </Tooltip>
                        )
                      }
                    />
                  )}
                />
                <Space h="xs" />
                <Button fullWidth size="xs" type="submit">
                  Login
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </Center>
    </>
  );
};

export default LoginPage;
