import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { store } from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
<Provider store={store}>
  <App />
</Provider>
)