import { Link, Outlet } from 'react-router';

export const AppLayout = () => {
  return (
    <main style={{ padding: '20px', background: '#fafafa', minHeight: '100vh' }}>
      <nav style={{ marginBottom: '16px' }}>
        <Link to="/">Home</Link> | <Link to="/devices">Devices</Link>
      </nav>
      <Outlet />
    </main>
  );
};
