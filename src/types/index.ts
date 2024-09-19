export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceUsd: string;
}

export interface CryptoTimeData {
  [key: string]: {
    priceUsd: string;
    time: number;
  }[]
}
