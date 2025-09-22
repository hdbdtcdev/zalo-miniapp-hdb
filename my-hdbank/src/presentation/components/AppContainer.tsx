// src/presentation/components/AppContainer.tsx
import React from 'react';
import AppNavbar from './AppNavbar';

interface AppContainerProps {
  title: string;
  showBack?: boolean;
  children: React.ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({
  title,
  showBack = false,
  children,
}) => {
  return (
    <div className="app-container flex flex-col h-full">
      <AppNavbar title={title} showBack={showBack} />
      <div className="content flex-1 overflow-auto">{children}</div>
    </div>
  );
};

export default AppContainer;
