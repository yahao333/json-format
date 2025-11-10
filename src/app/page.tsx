'use client';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          JSON 格式化工具
        </h1>
        <p className="text-center text-gray-600 mb-8">
          一个现代化的 JSON 格式化工具，让数据处理更简单
        </p>

        {/* JSON 格式化器将在下一步实现 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center text-gray-500">
            JSON 格式化功能正在开发中...
          </div>
        </div>
      </div>
    </main>
  );
}
