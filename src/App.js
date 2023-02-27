import React, { useEffect, useState } from "react";
import ImageGallery from "./ImageGallery/ImageGallery";
import Searchbar from "./Searchbar/Searchbar";
import { ProgressBar } from "react-loader-spinner";
import Modal from "./Modal/Modal";

export default function App() {
  const [images, setImages] = useState([]);
  const [input, setInput] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(-1);

  const handleSubmit = (e, input) => {
    e.preventDefault();
    input = input.trim();
    if (input) {
      setInput(input);
      setImages([]);
      setPageNumber(1);
    }
  };

  const handleButton = (e) => {
    e.preventDefault();
    e.target.disabled = true;
    setTimeout(() => {
      e.target.disabled = false;
    }, 2000);
    setPageNumber((pageNumber) => pageNumber + 1);
  };

  const handleImg = (index) => {
    setModal(index);
    console.log("modal", modal);
    console.log("index", index);
  };

  const onEsc = (e) => {
    if (e.key === "Escape") {
      setModal(-1);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onEsc, false);
    return () => {
      document.removeEventListener("keydown", onEsc, false);
    };
  }, []);

  useEffect(() => {
    if (input) {
      setStatus("pending");
    }
  }, [input]);

  useEffect(() => {
    if (pageNumber === 0) {
      return;
    }

    setTimeout(() => {
      fetch(
        `https://pixabay.com/api/?q=${input}&page=${pageNumber}&key=24559894-a9126184585885c934fb0d5f1&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.total === 0) {
            return Promise.reject(new Error("Nothing found"));
          }
          setImages((images) => images.concat(res.hits));
          setStatus("resolved");
        })
        .catch((error) => {
          setError(error);
          setStatus("rejected");
        });
    }, 2000);
  }, [pageNumber, input]);

  return (
    <>
      <Searchbar handleSubmit={handleSubmit} />
      {status === "resolved" && (
        <ImageGallery
          images={images}
          handleButton={handleButton}
          handleImg={handleImg}
        />
      )}
      {status === "rejected" && <>{error.message}</>}
      {status === "pending" && (
        <ProgressBar
          height="80"
          width="80"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
          borderColor="#3f51b5"
          barColor="#3f51b5"
        />
      )}
      {modal >= 0 && (
        <Modal
          img={images[modal].largeImageURL}
          handleModal={() => setModal(-1)}
        />
      )}
    </>
  );
}
