import { useState, useEffect } from 'react';

// Fetch a single item
export const useFetchItem = (_id: string) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/speaking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id }),
    })
      .then((res) => res.json())
      .then(setData)
      .catch(setError);
  }, [_id]);

  return { data, error };
};

// Update a single item
export const useUpdateItem = (_id: string, updatedData: any) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/speaking', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id, ...updatedData }),
    })
      .then((res) => res.json())
      .then(setData)
      .catch(setError);
  }, [_id, updatedData]);

  return { data, error };
};

// Add a single item
export const useAddItem = (newData: any) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/speaking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then(setData)
      .catch(setError);
  }, [newData]);

  return { data, error };
};

// Delete a single item
export const useDeleteItem = (_id: string) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/speaking', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id }),
    })
      .then((res) => res.json())
      .then(setData)
      .catch(setError);
  }, [_id]);

  return { data, error };
};