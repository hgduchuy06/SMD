import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:9999/syllabus/search";

const TimKiemGiaoTrinh: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [keyword, setKeyword] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchSyllabus = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        keyword,
        subjectCode,
        page: page.toString(),
        limit: "8",
      });

      const res = await fetch(`${API_URL}?${params.toString()}`);
      const data = await res.json();

      setBooks(data.items || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("Fetch syllabus error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSyllabus();
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center w-full bg-[#f6f6f8] dark:bg-[#101622]">
      {/* SEARCH SECTION */}
      <section className="w-full bg-white dark:bg-[#1a2332] pb-16 pt-10 px-4 flex flex-col items-center border-b">
        <div className="max-w-[960px] w-full text-center mb-8">
          <h1 className="text-3xl md:text-[35px] font-bold">
            Thư viện Giáo trình Số
          </h1>
          <p className="text-gray-500">
            Tìm kiếm giáo trình, tài liệu học tập chính thức
          </p>
        </div>

        <div className="max-w-[1024px] w-full bg-[#f6f6f8] dark:bg-[#232e42] p-6 rounded-2xl">
          {/* KEYWORD */}
          <div className="flex mb-4">
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="flex-1 p-4 rounded-l-xl border outline-none"
              placeholder="Tên giáo trình hoặc mã môn học..."
            />
            <button
              onClick={fetchSyllabus}
              className="px-6 bg-primary text-white rounded-r-xl font-bold"
            >
              Tìm
            </button>
          </div>

          {/* SUBJECT CODE */}
          <input
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
            className="w-full p-3 rounded-lg border outline-none mb-4"
            placeholder="Mã môn học (VD: IT3040)"
          />
        </div>
      </section>

      {/* RESULT SECTION */}
      <section className="w-full max-w-[1280px] px-4 py-12">
        <h3 className="text-xl font-bold mb-6">Kết quả ({total})</h3>

        {loading && <p>⏳ Đang tải dữ liệu...</p>}

        {!loading && books.length === 0 && (
          <p className="text-gray-500">Không tìm thấy giáo trình phù hợp</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      </section>
    </div>
  );
};

/* ---------- BOOK CARD ---------- */

const BookCard = ({ title, author, dept, year, views }: any) => (
  <div className="bg-white dark:bg-[#1a2332] rounded-2xl border p-4 hover:shadow-lg transition">
    <div className="aspect-[3/4] bg-gray-200 rounded-xl mb-4 flex items-center justify-center">
      <span className="material-symbols-outlined text-6xl opacity-20">
        menu_book
      </span>
    </div>

    <span className="text-xs font-bold text-primary uppercase">{dept}</span>
    <h4 className="font-bold mt-2 line-clamp-2">{title}</h4>
    <p className="text-sm text-gray-500 mt-1">{author}</p>

    <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
      <span>{year}</span>
      <span className="flex items-center gap-1">
        <span className="material-symbols-outlined text-sm">visibility</span>
        {views}
      </span>
    </div>
  </div>
);

export default TimKiemGiaoTrinh;
