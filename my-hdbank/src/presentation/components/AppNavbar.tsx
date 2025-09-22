// src/presentation/components/AppNavbar.tsx
import React from 'react';
import { Header, Button, Icon } from 'zmp-ui';
import { useNavigate } from 'react-router-dom'; // hoặc whatever router bạn dùng

interface AppNavbarProps {
  title: string;
  showBack?: boolean;
}

const AppNavbar: React.FC<AppNavbarProps> = ({ title, showBack = false }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Header
      title={title}
      backIcon={
        showBack ? (
          <Button onClick={handleBack} className="header-back-btn">
            <Icon icon="zi-chevron-left" />
          </Button>
        ) : undefined
      }
    />
  );
};

export default AppNavbar;
