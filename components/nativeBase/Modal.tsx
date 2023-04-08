import { Badge, Button, Modal, ScrollView, Stack } from 'native-base';
import React, { useState } from 'react';
import { getAllBadges } from '../../common/services/badge/BadgeService';
import { ButtonNativeBase } from './Button';

export function ModalNativeBase() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { badges } = getAllBadges();

  const ViewModal: JSX.Element = (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth='400px'>
        <Modal.CloseButton />
        <Modal.Header>Filtrar por</Modal.Header>
        <Modal.Body>
          <ScrollView>
            <Stack direction='row' mb='2' mt='1' space={3} flexWrap={'wrap'}>
              {badges.map((badge) => {
                return (
                  <ButtonNativeBase onPress={(e) => alert(badge.descricao)} colorScheme='none'>
                    <Badge colorScheme='success' alignSelf='center' key={badge.id}>
                      {badge.descricao}
                    </Badge>
                  </ButtonNativeBase>
                );
              })}
            </Stack>
          </ScrollView>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant='ghost'
              colorScheme='blueGray'
              onPress={() => {
                setShowModal(false);
              }}
            >
              Cancelar
            </Button>
            <Button
              onPress={() => {
                setShowModal(false);
              }}
            >
              Filtrar
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );

  return { ViewModal, setShowModal };
}
