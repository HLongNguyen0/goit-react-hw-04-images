import React from "react";
import { nanoid } from "nanoid";
import { ImageGalleryContainer } from "./ImageGallery.styled";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import Button from "./Button/Button";

export default function ImageGallery({ images, handleButton, handleImg }) {
  return (
    <>
      <ImageGalleryContainer>
        {images.map((image, index) => (
          <ImageGalleryItem
            key={nanoid()}
            image={image.largeImageURL}
            handleImg={handleImg}
            index={index}
          />
        ))}
      </ImageGalleryContainer>
      <Button handleButton={handleButton} />
    </>
  );
}
