export const ShimmerRow = () => (
    <tr className="animate-pulse bg-gray-800">
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <td key={index} className="px-6 py-4">
            <div className="h-4 bg-gray-700 rounded w-full"></div>
          </td>
        ))}
    </tr>
  );
  