import React, { useState, useEffect } from 'react';
import CoinItem from './CoinItem';
import Coin from '../routes/Coin';
import { Link } from 'react-router-dom';
import './Coins.css';

const Coins = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [displayedCoins, setDisplayedCoins] = useState([]);
  const [coinsPerPage, setCoinsPerPage] = useState(10);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);

  useEffect(() => {
    // Filtriranje na coins
    const filtered = props.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCoins(filtered);

    // Updejtiranje na coins koga search query se menuva
    setDisplayedCoins(filtered.slice(0, coinsPerPage));
    setLoadMoreVisible(filtered.length > coinsPerPage);
  }, [searchQuery, props.coins, coinsPerPage]);

  const handleLoadMore = () => {
    const newCoinsPerPage = coinsPerPage + 10;
    setDisplayedCoins(filteredCoins.slice(0, newCoinsPerPage));
    setCoinsPerPage(newCoinsPerPage);
    setLoadMoreVisible(filteredCoins.length > newCoinsPerPage);
  };

  return (
    <div className='container'>
      <div>
        <input
          type='text'
          placeholder='Search coins...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className='heading'>
          <p>#</p>
          <p className='coin-name'>Coin</p>
          <p>Price</p>
          <p>24h</p>
          <p className='hide-mobile'>Volume</p>
          <p className='hide-mobile'>Mkt Cap</p>
        </div>

        {displayedCoins.map((coin) => (
          <Link to={`/coin/${coin.id}`} element={<Coin />} key={coin.id}>
            <CoinItem coins={coin} />
          </Link>
        ))}

        {loadMoreVisible ? (
          <button onClick={handleLoadMore} className='load-more-button'>
            Load More
          </button>
        ) : (
          <p className='no-more-coins'>No more coins.</p>
        )}
      </div>
    </div>
  );
};

export default Coins;
