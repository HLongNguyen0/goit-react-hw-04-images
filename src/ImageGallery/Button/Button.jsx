import React from "react";
import { ButtonContainer } from "./Button.styled";

export default function Button({ handleButton }) {
  return <ButtonContainer onClick={handleButton}>Load more</ButtonContainer>;
}
