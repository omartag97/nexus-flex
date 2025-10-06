import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function BaseLayout({ children }: Props) {
  return (
    <div className="min-h-screen container mx-auto px-12 md:px-28 py-12">
      {children}
    </div>
  );
}
