import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import ChartComponent from './components/ChartComponent/ChartComponent'
import CryptoList from './components/CryptoList/CryptoList'
import { CryptoData } from './types'
import { setCryptoData } from './redux/reducer/cryptoSlice'
import { BASE_URL } from './constants/api'

const App = () => {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCryptoData = async () => {
      const response = await fetch(`${BASE_URL}/assets`)
      const data = await response.json();
      setCryptos(data.data);
      dispatch(setCryptoData(data.data))
    }

    fetchCryptoData();
  }, [dispatch])

  return (
    <div style={{display: 'flex'}}>
      <div style={{ width: '70%' }}>
        <ChartComponent />
      </div>
     <CryptoList cryptos={cryptos} />
    </div>
  )
}

export default App;
