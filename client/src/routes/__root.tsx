import { createRootRoute, Outlet, redirect } from '@tanstack/react-router';
import Layout from '../components/Layout';

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    const token = localStorage.getItem('token');

    if (!token && location.pathname !== '/login') {
      throw redirect({ to: '/login' });
    }
  },
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});
