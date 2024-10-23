interface Record {
  humidity: number;
  temperature: number;
  deviceTime: string;
}

function AdminPage() {
  // Generate some random records
  const records: Record[] = [
    {
      humidity: Math.random() * 100,
      temperature: Math.random() * 30,
      deviceTime: new Date().toISOString(),
    },
    {
      humidity: Math.random() * 100,
      temperature: Math.random() * 30,
      deviceTime: new Date().toISOString(),
    },
    {
      humidity: Math.random() * 100,
      temperature: Math.random() * 30,
      deviceTime: new Date().toISOString(),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Records</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Humidity</th>
            <th className="py-2 px-4 border-b">Temperature</th>
            <th className="py-2 px-4 border-b">Device Time</th>
          </tr>
        </thead>
        <tbody>
          {records.length > 0 ? (
            records.map((record, index) => (
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
    </div>
  );
}

export default AdminPage;
