import React from "react";
import { ModalContainer, Overlay } from "./Modal.styled";

export default function Modal({ img, handleModal }) {
  return (
    <Overlay onClick={handleModal}>
      <ModalContainer>
        <img src={img} alt="" />
      </ModalContainer>
    </Overlay>
  );
}
