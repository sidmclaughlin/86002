import { Button, Container, Divider, Group, Menu, Text } from '@mantine/core';
import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { Brush, Paint as PaintIcon, Power, Settings, UserCircle } from 'tabler-icons-react';
import { logout } from '../../../../../authentication/authentication.slice';
import { Role } from '../../../../../authentication/dtos/user.dto';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { useLogoutMutation } from '../../../../../store/services/api.service';

interface MenuButtonProps {
  handleLogout: MouseEventHandler<HTMLButtonElement>;
}

const AdminMenuButtons = (props: MenuButtonProps) => {
  return (
    <Group>
      <Button variant="subtle" component={Link} to={'/'} leftIcon={<Brush size={16} />}>
        Paints
      </Button>
      <Menu
        control={
          <Button leftIcon={<UserCircle size={18} />} variant="subtle">
            My Menu
          </Button>
        }
      >
        <Menu.Item component={Link} to={'/settings'} icon={<Settings size={16} />}>
          Settings
        </Menu.Item>
        <Divider />
        <Menu.Item icon={<Power size={16} />} onClick={props.handleLogout}>
          Logout
        </Menu.Item>
      </Menu>
    </Group>
  );
};

const MenuButtons = (props: MenuButtonProps) => {
  return (
    <Group>
      <Menu control={<Button leftIcon={<UserCircle size={18} />}>My Menu</Button>}>
        <Menu.Item icon={<Power size={16} />} onClick={props.handleLogout}>
          Logout
        </Menu.Item>
      </Menu>
    </Group>
  );
};

export const CoreMenu = () => {
  const dispatch = useAppDispatch();

  const { role } = useAppSelector(state => state.authentication.user!);

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
      {role === Role.ADMIN ? (
        <AdminMenuButtons handleLogout={handleLogout} />
      ) : (
        <MenuButtons handleLogout={handleLogout} />
      )}
    </Container>
  );
};
