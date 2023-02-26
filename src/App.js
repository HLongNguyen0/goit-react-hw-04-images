import React, { Component } from "react";
import ImageGallery from "./ImageGallery/ImageGallery";
import Searchbar from "./Searchbar/Searchbar";
import { ProgressBar } from "react-loader-spinner";
import Modal from "./Modal/Modal";

export default class App extends Component {
  state = {
    images: [],
    input: "",
    pageNumber: 1,
    status: "idle",
    error: null,
    modal: -1,
  };

  componentDidMount() {
    document.addEventListener("keydown", this.onEsc, false);
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.input !== this.state.input && this.state.input) {
      this.setState({ status: "pending" });
      this.fetchImg();
      return;
    }
    if (prevState.pageNumber !== this.state.pageNumber) {
      this.fetchImg();
    }
  };

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onEsc, false);
  }

  fetchImg = () => {
    setTimeout(() => {
      fetch(
        `https://pixabay.com/api/?q=${this.state.input}&page=${this.state.pageNumber}&key=24559894-a9126184585885c934fb0d5f1&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.total === 0) {
            return Promise.reject(new Error("Nothing found"));
          }
          this.setState((prevState) => {
            return {
              images: prevState.images.concat(res.hits),
              status: "resolved",
            };
          });
        })
        .catch((error) => {
          this.setState({ error, status: "rejected" });
        });
    }, 2000);
  };

  handleSubmit = (e, input) => {
    e.preventDefault();
    if (this.state.input !== input) {
      this.setState({ input: input, images: [], pageNumber: 1 });
    }
  };

  handleButton = (e) => {
    e.preventDefault();
    e.target.disabled = true;
    setTimeout(() => {
      e.target.disabled = false;
    }, 2000);
    this.setState((prevState) => {
      return { pageNumber: prevState.pageNumber + 1 };
    });
  };

  handleImg = (index) => {
    this.setState({ modal: index });
  };

  handleModal = () => {
    this.setState({ modal: -1 });
  };

  onEsc = (e) => {
    if (e.key === "Escape") {
      this.handleModal();
    }
  };

  render() {
    return (
      <>
        <Searchbar handleSubmit={this.handleSubmit} />
        {this.state.status === "resolved" && (
          <ImageGallery
            images={this.state.images}
            handleButton={this.handleButton}
            handleImg={this.handleImg}
          />
        )}
        {this.state.status === "rejected" && <>{this.state.error.message}</>}
        {this.state.status === "pending" && (
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
        {this.state.modal >= 0 && (
          <Modal
            img={this.state.images[this.state.modal].largeImageURL}
            handleModal={this.handleModal}
          />
        )}
      </>
    );
  }
}
