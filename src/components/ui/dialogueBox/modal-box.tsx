import React from 'react';
import { X } from 'lucide-react';
import ClickButton from '@/components/ui/button/click-button';

export interface ModalBoxProps {
  className?: string;
  title: string;
  subtitle?: string;
  isOpen: boolean;
  onClose: () => void;
  mainContainerStyle_mb?: string;
  backDropStyle_mb?: string;
  dialogContentStyle_mb?: string;
  closeButtonStyle_mb?: string;
  titleStyle_mb?: string;
  subTitleStyle_mb?: string;
  children?: React.ReactNode;
}

export const ModalBox: React.FC<ModalBoxProps> = ({
  title,
  subtitle,
  isOpen,
  onClose,
  children,
  mainContainerStyle_mb,
  dialogContentStyle_mb,
  closeButtonStyle_mb,
  titleStyle_mb,
  subTitleStyle_mb,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <button
        id="backdrop"
        className={'bg-opacity-40 fixed inset-0 z-50 backdrop-blur-lg'}
        onClick={onClose}
      />
      <dialog
        id="main-container"
        className={`shadow-primary-500 fixed top-1/2 left-1/2 z-50 flex w-10/12 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-lg border border-neutral-400 p-2 shadow-xl sm:w-4/6 md:w-3/5 md:p-4 lg:w-2/4 xl:w-2/5 ${mainContainerStyle_mb}`}
      >
        <ClickButton
          id="close-button"
          variant="none"
          size="none"
          onClick={onClose}
          className={`absolute top-3 right-3 text-gray-500 hover:text-red-700 focus:outline-none ${closeButtonStyle_mb}`}
        >
          <X />
        </ClickButton>
        <div className={`w-full ${dialogContentStyle_mb}`}>
          <h2
            id="dialog-title"
            className={`mb-1 border-b border-gray-200 text-xl font-semibold ${titleStyle_mb}`}
          >
            {title}
          </h2>
          <p
            id="dialog-subtitle"
            className={`mb-1 text-sm text-gray-600 ${subTitleStyle_mb}`}
          >
            {subtitle}
          </p>
        </div>
        {children}
      </dialog>
    </>
  );
};
