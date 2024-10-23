import { AxiosError } from "axios";
import { useAuth } from "../../contexts/AuthContext";
import backendInstance from "../../utils/backendInstance";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

interface Record {
  humidity: number;
  temperature: number;
  deviceTime: string;
}

interface RecordResponse {
  records: Record[];
  page: number;
  limit: number;
  totalPages: number;
  totalRecords: number;
}

function AdminPage() {
  const { token } = useAuth();
  const [page, setPage] = useState(1);
  const limit = 100;

  const { data, isLoading } = useQuery({
    queryKey: ["records", page],
    queryFn: async () => {
      try {
        const response = await backendInstance.get<RecordResponse>("/records", {
          headers: { Authorization: token },
          params: { page, limit },
        });

        return response.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response?.data;
      }
    },
    enabled: token !== "",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (data && page < data.totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Records</h1>

      {data && data.totalRecords > 10 && (
        <div className="flex justify-between mb-4">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {data?.page} of {data?.totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={data && page >= data.totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Humidity</th>
            <th className="py-2 px-4 border-b">Temperature</th>
            <th className="py-2 px-4 border-b">Device Time</th>
          </tr>
        </thead>
        <tbody>
          {data && data.records.length > 0 ? (
            data.records.map((record, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">
                  {record.humidity.toFixed(2)}
                </td>
                <td className="py-2 px-4 border-b">
                  {record.temperature.toFixed(2)}
                </td>
                <td className="py-2 px-4 border-b">
                  {new Date(record.deviceTime).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="py-2 px-4 border-b text-center">
                No records available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {data?.page} of {data?.totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={data && page >= data.totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AdminPage;
