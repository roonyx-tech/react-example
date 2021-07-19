import React, { useEffect, useState } from 'react';
import { Prompt } from 'react-router-dom';
import { Location } from 'history';

import { ConfirmDialog } from '..';

interface Props {
  when?: boolean;
  navigate: (path: string) => void;
  shouldBlockNavigation: (location: Location) => boolean;
  text: { title: string; onOk: string; onCancel: string };
  nativeBeforeUnloadEvent?: boolean;
}
export const RouteLeavePrompt = ({
  when,
  navigate,
  shouldBlockNavigation,
  text,
  nativeBeforeUnloadEvent = true,
}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [lastLocation, setLastLocation] = useState<Location | null>(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);
  const closeModal = () => {
    setModalVisible(false);
  };

  const handleBlockedNavigation = (nextLocation: Location): boolean => {
    if (!confirmedNavigation && shouldBlockNavigation(nextLocation)) {
      setModalVisible(true);
      setLastLocation(nextLocation);
      return false;
    }
    return true;
  };

  const handleConfirmNavigationClick = () => {
    setModalVisible(false);
    setConfirmedNavigation(true);
  };

  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      // Navigate to the previous blocked location
      navigate(lastLocation.pathname);
    }
  }, [confirmedNavigation, lastLocation]);

  const onConfirmationModalClose = (confirmed: boolean) => {
    if (confirmed) handleConfirmNavigationClick();
    else closeModal();
  };

  useEffect(() => {
    const originalHandler = window.onbeforeunload;
    window.onbeforeunload = () => (nativeBeforeUnloadEvent ? true : undefined);
    return () => {
      window.onbeforeunload = originalHandler;
    };
  }, []);

  return (
    <>
      <Prompt when={when} message={handleBlockedNavigation} />
      <ConfirmDialog
        open={modalVisible}
        onClose={onConfirmationModalClose}
        title={text.title}
        cancelButtonText={text.onCancel}
        confirmButtonText={text.onOk}
        alignTitle="left"
        contentStyle={{ padding: '3rem', maxWidth: '33rem', boxSizing: 'border-box' }}
      >
        <p style={{ color: '#798599' }}>
          Несохраненные изменения будут утеряны. Проверьте и сохраните нужные изменения
        </p>
      </ConfirmDialog>
    </>
  );
};
