import React from "react";
import {
  ImageGalleryItemContainer,
  ImageGalleryItemImage,
} from "./ImageGalleryItem.styled";

export default function ImageGalleryItem({ image, handleImg, index }) {
  return (
    <ImageGalleryItemContainer>
      <ImageGalleryItemImage
        src={image}
        alt="image"
        onClick={() => handleImg(index)}
      />
    </ImageGalleryItemContainer>
  );
}
