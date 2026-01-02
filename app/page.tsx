'use client';

import { useState, useEffect } from 'react';
import { Assistant } from '@/types/assistant';
import { getAssistants, saveAssistant, deleteAssistant } from '@/lib/storage';
import AssistantCard from '@/components/AssistantCard';
import CreateEditModal from '@/components/CreateEditModal';
import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import { FiPlus } from 'react-icons/fi';
import styles from './page.module.css';

export default function Home() {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAssistant, setEditingAssistant] = useState<Assistant | null>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    loadAssistants();
  }, []);

  const loadAssistants = () => {
    const loadedAssistants = getAssistants();
    setAssistants(loadedAssistants);
  };

  const handleCreate = () => {
    setEditingAssistant(null);
    setIsModalOpen(true);
  };

  const handleEdit = (assistant: Assistant) => {
    setEditingAssistant(assistant);
    setIsModalOpen(true);
  };

  const handleSave = (assistant: Assistant) => {
    saveAssistant(assistant);
    loadAssistants();
    setAlert({
      type: 'success',
      message: editingAssistant
        ? 'Asistente actualizado correctamente'
        : 'Asistente creado correctamente',
    });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteConfirm(id);
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirm) {
      deleteAssistant(deleteConfirm);
      loadAssistants();
      setAlert({
        type: 'success',
        message: 'Asistente eliminado correctamente',
      });
      setDeleteConfirm(null);
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm(null);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>Asistentes IA</h1>
            {assistants.length > 0 && (
              <span className={styles.count} aria-label={`${assistants.length} asistente${assistants.length !== 1 ? 's' : ''} creado${assistants.length !== 1 ? 's' : ''}`}>
                {assistants.length} {assistants.length === 1 ? 'asistente' : 'asistentes'}
              </span>
            )}
          </div>
          <Button variant="primary" onClick={handleCreate} size="lg" aria-label="Crear nuevo asistente">
            <FiPlus size={20} aria-hidden="true" />
            Crear Asistente
          </Button>
        </div>
      </header>

      <main className={styles.main}>
        {alert && (
          <div className={styles.alertContainer}>
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          </div>
        )}

        {deleteConfirm && (
          <div className={styles.confirmOverlay}>
            <div className={styles.confirmModal}>
              <h3>Confirmar eliminación</h3>
              <p>¿Estás seguro de que deseas eliminar este asistente? Esta acción no se puede deshacer.</p>
              <div className={styles.confirmActions}>
                <Button variant="secondary" onClick={handleDeleteCancel}>
                  Cancelar
                </Button>
                <Button variant="danger" onClick={handleDeleteConfirm}>
                  Eliminar
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className={styles.heroSection}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span>IA Avanzada</span>
            </div>
            <h1 className={styles.heroTitle}>
              Automatiza tus Interacciones con
              <span className={styles.heroHighlight}> Asistentes IA</span>
            </h1>
            <p className={styles.heroDescription}>
              Crea asistentes inteligentes personalizados que gestionan conversaciones, responden preguntas y generan leads las 24 horas del día. Potencia tu negocio con tecnología de vanguardia.
            </p>
            <div className={styles.heroFeatures}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>⚡</div>
                <span>Respuestas instantáneas</span>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>🎯</div>
                <span>Personalización total</span>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>📈</div>
                <span>Escalable y eficiente</span>
              </div>
            </div>
            {assistants.length === 0 && (
              <Button variant="primary" onClick={handleCreate} size="lg" className={styles.heroButton}>
                <FiPlus size={20} />
                Crear tu Primer Asistente
              </Button>
            )}
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.floatingCard}>
              <div className={styles.cardPreview}>
                <div className={styles.previewHeader}>
                  <div className={styles.previewDot}></div>
                  <div className={styles.previewDot}></div>
                  <div className={styles.previewDot}></div>
                </div>
                <div className={styles.previewContent}>
                  <div className={styles.previewMessage}>
                    <div className={styles.previewBubble}></div>
                    <div className={styles.previewBubble}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {assistants.length > 0 && (
          <>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>Tus Asistentes</h2>
                <p className={styles.sectionSubtitle}>
                  Gestiona y personaliza tus asistentes IA para automatizar interacciones y generar más oportunidades de negocio.
                </p>
              </div>
            </div>
            <div className={styles.grid}>
              {assistants.map((assistant, index) => (
                <div
                  key={assistant.id}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  className={styles.cardWrapper}
                >
                  <AssistantCard
                    assistant={assistant}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <CreateEditModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingAssistant(null);
        }}
        onSave={handleSave}
        assistant={editingAssistant}
      />
    </div>
  );
}

