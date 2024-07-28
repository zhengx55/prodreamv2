import React from 'react';

interface EmphasizeTextProps {
  children: React.ReactNode;
  className?: string;
}

const EmphasizeText: React.FC<EmphasizeTextProps> = ({
  children,
  className,
}) => {
  return (
    <span
      className={`font-poppins text-base font-semibold leading-7 text-[#57545E] ${className}`}
      style={{
        color: 'var(--color-text-2, #57545E)',
      }}
    >
      {children}
    </span>
  );
};

export default EmphasizeText;
