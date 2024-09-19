import { Line } from "react-chartjs-2"
import { RootState } from "../../redux/store"
import { useSelector } from "react-redux"
import { CategoryScale, Chart, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

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
  console.log(selectedCryptos, cryptoData)
  const getDataForChart = () => {
    const datasets = selectedCryptos.map(id => {
      const crypto = cryptoData.find(c => c.id === id);
      console.log(crypto)
      if (crypto) {
        return {
          label: crypto.name,
          data: [crypto.priceUsd],
          borderColor: 'rgb(75,192,192)',
          tension: 0.1,
        };
      }
      return null;
    }).filter((dataset): dataset is NonNullable<typeof dataset> => dataset !== null);

    return {
      labels: ['Initial'],
      datasets
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
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Price (USD)'
            }
          }
        }
      }}
    />
  );
}

export default ChartComponent;
