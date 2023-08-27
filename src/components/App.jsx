import { Button } from './Button/Button';
import { Container, GlobalStyle } from './GlobalStyle';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { pixabayAPI } from './API/API';
import { Loader } from './Loader/Loader';
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getImg() {
      try {
        setIsLoading(true);
        const resp = await pixabayAPI(query, page, perPage);
        if (resp.status !== 200) {
          throw new Error();
        }
        setItems(prevItems => [...prevItems, ...resp.data.hits]);
        setTotalHits(resp.data.totalHits);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    }
    if (query !== '') {
      getImg();
    }
  }, [page, perPage, query]);

  const handleSearch = evt => {
    evt.preventDefault();
    const query = evt.target.elements.query.value.trim();

    setQuery(query);
    setItems([]);
    setPage(1);
    evt.target.reset();
  };

  const handleLoadMoreBtn = () => {
    setPage(prevState => prevState + 1);
  };

  const totalPage = Math.round(totalHits / perPage);

  return (
    <Container>
      <Searchbar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      <ImageGallery images={items} />
      {items.length > 0 && page <= totalPage && (
        <Button click={handleLoadMoreBtn} />
      )}

      <GlobalStyle />
    </Container>
  );
};
