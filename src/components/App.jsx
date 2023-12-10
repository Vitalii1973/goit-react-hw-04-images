import React, { useState, useEffect, useRef } from 'react';
import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import { fetchImages } from '../api';
import './styles/App.css';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const API_KEY = '39826341-72b32bf5f28bdbe6242a5fe09';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 12;

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [message, setMessage] = useState('');
  const modalRef = useRef(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  useEffect(() => {
    const fetchData = async (query, page) => {
      setLoading(true);

      try {
        const data = await fetchImages(query, page, PER_PAGE);

        if (data.hits.length === 0) {
          displayMessage('No images found.');
          return;
        }

        const totalPages = Math.ceil(data.totalHits / PER_PAGE);

        setImages(prevImages => [...prevImages, ...data.hits]);
        setLoading(false);
        setTotalHits(data.totalHits);
        setHasMore(page < totalPages);

        const remainingImages = data.totalHits - page * PER_PAGE;
        displayMessage(`Remaining images: ${remainingImages}`);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    if (searchQuery.trim() !== '') {
      fetchData(searchQuery, page);
    }
  }, [searchQuery, page]);

  const displayMessage = message => {
    setMessage(message);

    setTimeout(() => {
      setMessage('');
    }, 2000);
  };

  const handleSubmit = query => {
    setSearchQuery(query);
    setImages([]);
    setLoading(true);
    setPage(1);
    setHasMore(true);
  };

  const fetchMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleOpenModal = image => {
    if (!modalImage) {
      setModalImage(image);
    }
  };

  const handleCloseModal = () => {
    setModalImage(null);
  };

  const showNextImage = () => {
    if (selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(prevIndex => prevIndex + 1);
    } else {
      setSelectedImageIndex(0);
    }
  };

  const showPrevImage = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(prevIndex => prevIndex - 1);
    } else {
      setSelectedImageIndex(images.length - 1);
    }
  };

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery
        images={images}
        loading={loading}
        onOpenModal={handleOpenModal}
        totalHits={totalHits}
        hasMore={hasMore}
        onLoadMore={fetchMoreImages}
      />
      {loading && <Loader />}
      {!loading && hasMore && images.length > 0 && (
        <Button
          onLoadMore={fetchMoreImages}
          hasMore={hasMore}
          API_KEY={API_KEY}
          BASE_URL={BASE_URL}
          PER_PAGE={PER_PAGE}
        />
      )}
      {modalImage && (
        <Modal
          imageUrl={modalImage}
          alt="Large Image"
          onClose={handleCloseModal}
          showNextImage={showNextImage}
          showPrevImage={showPrevImage}
          modalRef={modalRef}
        />
      )}
      {message && (
        <div id="message-container" className="show">
          {message}
        </div>
      )}
    </div>
  );
};

export default App;
