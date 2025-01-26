"use client";

import React, { ReactNode } from "react";

interface IfProps {
  condition: boolean;
  then: ReactNode | string;
  else?: ReactNode | string;
}

const If: React.FC<IfProps> = ({ condition, then, else: elseComponent }) => {
  return <>{condition ? then : elseComponent}</>;
};

export default If;
