import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Item } from './types/item';
import FileUpload from './components/FileUpload';

function App() {
  const [items, setItems] = useState<Item[]>([]);

  const API_URL = 'http://localhost:3000/api';

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API_URL}/items`);
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching items: ', err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <FileUpload />
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
