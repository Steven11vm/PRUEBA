'use client';

import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}: ModalProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (isOpen && document.body) {
      document.body.style.overflow = 'hidden';
    } else if (document.body) {
      document.body.style.overflow = '';
    }

    return () => {
      if (typeof window !== 'undefined' && document.body) {
        document.body.style.overflow = '';
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      if (typeof window !== 'undefined') {
        document.removeEventListener('keydown', handleEscape);
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.modal} ${styles[size]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <button
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Cerrar modal"
            >
              <IoClose size={24} />
            </button>
          </div>
        )}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );

  if (typeof window !== 'undefined' && document.body) {
    try {
      return createPortal(modalContent, document.body);
    } catch (error) {
      // Fallback si hay problemas con el portal
      console.error('Error creating portal:', error);
      return null;
    }
  }

  return null;
}

