import { Button, Modal } from 'native-base';
import React, { useState } from 'react';
import { ButtonNativeBase } from './Button';
import {StyleSheet, View} from "react-native";

export function ModalNativeBase() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const styles = StyleSheet.create({
    flex: {
      gap:10
    }
  })

  const ViewModal: JSX.Element = (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth='400px'>
        <Modal.CloseButton />
        <Modal.Header>Filtrar por</Modal.Header>
        <Modal.Body>
         <View style={styles.flex}>
           <ButtonNativeBase borderRadius={20} onPress={(e) => {
             alert(e.target)
             console.log(e.target)
           }}>
             Tag da badge
           </ButtonNativeBase>

           <ButtonNativeBase borderRadius={20} onPress={(e) => alert(e.target.value)}>
             Nível da badge
           </ButtonNativeBase>

           <ButtonNativeBase borderRadius={20} onPress={(e) => alert(e.target.value)}>
             Tipo da badge
           </ButtonNativeBase>
         </View>
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
