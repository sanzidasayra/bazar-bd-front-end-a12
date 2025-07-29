import { Outlet } from 'react-router-dom';

const NoLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <Outlet />
    </div>
  );
};

export default NoLayout;
