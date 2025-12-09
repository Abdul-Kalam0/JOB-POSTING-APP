import { useState } from "react";
import axios from "axios";

export const useDelete = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = async (id) => {
    if (!id) return;

    try {
      setLoading(true);
      const response = await axios.delete(
        `http://localhost:3000/api/job/${id}`
      );
      setData(response.data);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, deleteData };
};
