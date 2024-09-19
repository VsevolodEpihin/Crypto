import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { CryptoData } from '../../types';
import { RootState } from '../../redux/store';
import { setCryptoData, toggleCryptoSelection } from '../../redux/reducer/cryptoSlice';
import style from './CryptoList.module.css'

interface CryptoListProps {
  cryptos: CryptoData[]
}

const CryptoList = ({ cryptos }: CryptoListProps) => {
  const dispatch = useDispatch();
  const selectedCryptos = useSelector((state: RootState) => state.crypto.selectedCryptos)
  console.log(selectedCryptos)

  useEffect(()=>{
    dispatch(setCryptoData(cryptos))
  }, [dispatch, cryptos])

  useEffect(()=>{

  },[dispatch, selectedCryptos])

  const handleToggle = (id: string) => {
    dispatch(toggleCryptoSelection(id))
  }

  return (
    <div className={style.container}>
      {Array.isArray(cryptos) && cryptos.length > 0 ? (
        cryptos.map((crypto) => (
          <div key={crypto.id}>
            <input
              type="checkbox"
              checked={selectedCryptos.includes(crypto.id)}
              onChange={() => handleToggle(crypto.id)}
            />
            {crypto.name}
          </div>
        ))
      ) : (
        <p>No cryptos available</p>
      )}
    </div>
  );
  
}

export default CryptoList;
