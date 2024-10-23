import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

import { useAuth } from "../../../contexts/AuthContext";

import backendInstance from "../../../utils/backendInstance";

interface ApiTokenResponse {
  apiToken: string;
}

function ApiPage() {
  const { token } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["apiToken"],
    queryFn: async () => {
      try {
        const response = await backendInstance.get<ApiTokenResponse>(
          "/user/apiToken",
          {
            headers: { Authorization: token },
          }
        );

        return response.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response?.data;
      }
    },
    enabled: token !== "",
  });

  const copyToClipboard = () => {
    if (!data?.apiToken) {
      return;
    }

    navigator.clipboard.writeText(data.apiToken).then(() => {
      alert("API key copied to clipboard");
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">API Key</h2>
        <div className="flex items-center space-x-2">
          <input
            type="password"
            value={data?.apiToken}
            readOnly
            className="flex-grow px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApiPage;
