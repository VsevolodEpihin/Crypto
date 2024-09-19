import { Line } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { CategoryScale, Chart, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';

import { RootState } from '../../redux/store'
import { BASE_URL } from '../../constants/api';
import { CryptoTimeData } from '../../types';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = () => {
  const { selectedCryptos, cryptoData } = useSelector((state: RootState) => state.crypto)
  const [cryptoHistories, setCryptoHistories] = useState<CryptoTimeData>({})

  useEffect(()=>{
      const fetchCryptoHistory = async() => {
        const histories: CryptoTimeData = {}
        
        for(const id of selectedCryptos) {
          const response = await fetch(`${BASE_URL}/assets/${id}/history?interval=d1&limit=7`)
          const data = await response.json();
          histories[id] = data.data
        }

        setCryptoHistories(histories)
      }

      if(selectedCryptos.length > 0) {
        fetchCryptoHistory()
      }
  },[selectedCryptos])

  const getDataForChart = () => {
    const labels = cryptoHistories[selectedCryptos[0]]?.map(point => new Date(point.time).toLocaleDateString()) || [];

    const datasets = selectedCryptos.map(id => {
      const crypto = cryptoData.find(c => c.id === id);
      const history = cryptoHistories[id]
  
      if (history && crypto) {
        return {
          label: crypto.name,
          data: history.map(point => parseFloat(point.priceUsd)),
          borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          tension: 0.1,
        };
      }
      return null;
    }).filter((dataset): dataset is NonNullable<typeof dataset> => dataset !== null);

    return {
      labels,
      datasets,
    }
  }

  return (
    <Line
      data={getDataForChart()}
      options={{
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          tooltip: {
            callbacks: {
              label: (context) => `${context.dataset?.label}: ${context.raw}`
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time'
            },
          },
          y: {
            title: {
              display: true,
              text: 'Price (USD)'
            },
          },
        },
      }}
    />
  );
}

export default ChartComponent;
