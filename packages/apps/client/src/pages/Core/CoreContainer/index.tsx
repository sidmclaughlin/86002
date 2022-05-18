import { Container, Header } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { CoreMenu } from './components/CoreMenu';

const CoreContainer = () => {
  return (
    <>
      <Header height={50}>
        <CoreMenu />
      </Header>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default CoreContainer;
