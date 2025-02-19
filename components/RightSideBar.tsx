import Link from "next/link";

const RightSidebar = () => {
  return (
    <aside className="w-64 bg-white p-4 border-l border-gray-200 h-full space-y-4">
      {/* Top Votes Contents 섹션 */}
      <div className="border border-gray-200 rounded p-3">
        <h3 className="font-bold mb-2 text-sm">Top Votes Contents</h3>
        <ul className="space-y-1 text-sm">
          <li className="hover:underline">
            <Link href="/post/1">1st. Post Title</Link>
          </li>
          <li className="hover:underline">
            <Link href="/post/2">2nd. Post Title</Link>
          </li>
          <li className="hover:underline">
            <Link href="/post/3">3rd. Post Title</Link>
          </li>
        </ul>
      </div>

      {/* Hot Communities 섹션 */}
      <div className="border border-gray-200 rounded p-3">
        <h3 className="font-bold mb-2 text-sm">Hot Communities</h3>
        <ul className="space-y-1 text-sm">
          <li className="hover:underline">
            <Link href="/community/1">1st. Community</Link>
          </li>
          <li className="hover:underline">
            <Link href="/community/2">2nd. Community</Link>
          </li>
          <li className="hover:underline">
            <Link href="/community/3">3rd. Community</Link>
          </li>
        </ul>
      </div>

      {/* Advertisement 섹션 */}
      <div className="border border-gray-200 rounded p-3 text-center">
        <h3 className="font-bold mb-2 text-sm">Advertisement</h3>
        <div className="bg-gray-100 h-32 flex items-center justify-center text-sm text-gray-600">
          Banner Ad Placeholder
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
