import React from 'react';
import Navigation from '../../Components/navigation.tsx';
import { Outlet } from 'react-router';

// style
import "./styles.scss";

const Dashboard: React.FC = () => {
  return (
    <section className='dashboard'> 
      <Navigation />
      <Outlet />
    </section>
  );
};

export default Dashboard;
