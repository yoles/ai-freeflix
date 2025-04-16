import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import classNames from 'classnames';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'medium',
  children,
  className,
  id = 'modal',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      // Store the previously focused element
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
      
      // Focus the modal container
      setTimeout(() => {
        if (modalRef.current) {
          const focusableElement = modalRef.current.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') as HTMLElement;
          if (focusableElement) {
            focusableElement.focus();
          } else {
            modalRef.current.focus();
          }
        }
      }, 10);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
      
      // Restore focus when the modal is closed
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-2xl',
    large: 'max-w-4xl',
  };

  const modalClasses = classNames(
    'relative bg-gray-900 rounded-lg shadow-xl',
    sizeClasses[size],
    'w-full mx-4 md:mx-auto',
    'transform transition-all',
    className
  );

  const modalId = `${id}-content`;
  const labelId = `${id}-title`;
  const descriptionId = `${id}-description`;

  return createPortal(
    <div 
      className="fixed inset-0 z-50 overflow-y-auto" 
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? labelId : undefined}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/75 transition-opacity" />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div
          ref={modalRef}
          className={modalClasses}
          id={modalId}
          tabIndex={-1}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <FaTimes size={20} />
          </button>

          {/* Title */}
          {title && (
            <div className="px-6 py-4 border-b border-gray-800">
              <h3 id={labelId} className="text-lg font-medium text-white">{title}</h3>
            </div>
          )}

          {/* Content */}
          <div id={descriptionId} className="px-6 py-4 text-gray-300">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal; 