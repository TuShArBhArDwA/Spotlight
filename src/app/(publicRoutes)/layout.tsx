import React from 'react';

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return <div className="w-full container mx-auto min-h-screen">{children}</div>;
};

export default layout;