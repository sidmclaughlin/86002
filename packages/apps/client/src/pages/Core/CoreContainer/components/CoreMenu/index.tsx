import { Button, Container, Group, Menu, Text } from '@mantine/core';
import { MouseEventHandler } from 'react';
import { Paint as PaintIcon, Power, UserCircle } from 'tabler-icons-react';
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
          <PaintIcon /> A Paint Company
        </Text>
      </div>

      <Group>
        <Menu control={<Button leftIcon={<UserCircle size={18} />}>My Menu</Button>}>
          <Menu.Label>{user ? `Welcome back, ${user.name}!` : ''}</Menu.Label>
          <Menu.Item icon={<Power size={16} />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </Group>
    </Container>
  );
};
