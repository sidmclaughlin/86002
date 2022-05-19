import { FormatPainterOutlined, PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Container, Group, Menu, Text } from '@mantine/core';
import { MouseEventHandler } from 'react';
import { logout } from '../../../../../authentication/authentication.slice';
import { User } from '../../../../../authentication/dtos/user.dto';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { useLogoutMutation } from '../../../../../store/services/api.service';

interface MenuButtonProps {
  handleLogout: MouseEventHandler<HTMLButtonElement>;
  user: User | null;
}

export const CoreMenu = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.authentication.user);

  const [apiLogout] = useLogoutMutation();

  const handleLogout = async () => {
    await apiLogout();
    dispatch(logout());
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'space-between', height: '100%', alignItems: 'center' }}>
      <div>
        <Text weight={700} style={{ fontVariant: 'small-caps' }}>
          <FormatPainterOutlined /> A Paint Company
        </Text>
      </div>

      <Group>
        <Menu control={<Button leftIcon={<UserOutlined style={{ fontSize: '18px' }} />}>My Menu</Button>}>
          <Menu.Label>{user ? `Welcome back, ${user.name}!` : ''}</Menu.Label>
          <Menu.Item icon={<PoweroffOutlined style={{ fontSize: '16px' }} />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </Group>
    </Container>
  );
};
