import React, { useState } from "react";

const QuanLyPhanBien: React.FC = () => {
  const [activeReview, setActiveReview] = useState(1);

  // Dữ liệu mẫu danh sách phản biện
  const reviews = [
    {
      id: 1,
      name: "TS. Lê Thị C",
      role: "Giảng viên Toán học",
      time: "10:30 AM",
      status: "pending",
      chapter: "Chương 3",
      content:
        "Về phần định nghĩa giới hạn dãy số, tôi thấy cách diễn đạt hiện tại hơi khó hiểu đối với sinh viên năm nhất...",
      fullContent: `Kính gửi Ban chủ nhiệm và tác giả,\n\nVề phần định nghĩa giới hạn dãy số ở trang 45, tôi thấy cách diễn đạt hiện tại: "Dãy số (un) có giới hạn là 0 nếu |un| có thể nhỏ hơn một số dương bé tuỳ ý..." hơi khó hiểu và chưa đủ tính chặt chẽ toán học đối với sinh viên năm nhất.\n\nTôi đề xuất chúng ta nên sử dụng định nghĩa epsilon-N chuẩn ngay từ đầu, sau đó mới giải thích bằng ngôn ngữ trực quan. Cụ thể:\n"Với mọi số dương ε, tồn tại số tự nhiên N sao cho với mọi n > N thì |un - L| < ε."\n\nĐiều này sẽ giúp sinh viên làm quen tốt hơn với các chứng minh sau này. Mong tác giả xem xét lại.`,
    },
    {
      id: 2,
      name: "ThS. Phạm Văn D",
      role: "Giảng viên Thống kê",
      time: "Hôm qua",
      status: "completed",
      chapter: "Chương 1",
      content:
        "Có một lỗi chính tả ở trang 15, công thức 1.2. Cần sửa lại dấu + thành dấu -.",
    },
    {
      id: 3,
      name: "TS. Nguyễn Thị E",
      role: "Giảng viên Đại số",
      time: "20 Th10",
      status: "responded",
      chapter: "Bài tập",
      content:
        "Các bài tập phần đạo hàm quá ít, đề nghị bổ sung thêm các bài tập vận dụng cao.",
    },
  ];

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#f6f6f8] dark:bg-[#101622]">
      {/* Top Header Area */}
      <header className="flex-shrink-0 p-6 pb-2">
        <div className="flex flex-wrap justify-between items-end gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Quản lý Phản biện
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Giáo trình:{" "}
              <span className="font-medium text-slate-700 dark:text-slate-300">
                Giải tích 1 (MATH101)
              </span>
            </p>
          </div>
          <button className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2.5 rounded-lg text-sm font-bold shadow-sm">
            <span className="material-symbols-outlined text-[20px]">
              summarize
            </span>
            Tổng hợp báo cáo
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard
            title="Tổng số góp ý"
            value="45"
            icon="rate_review"
            trend="+5%"
          />
          <StatCard
            title="Chưa xử lý"
            value="12"
            icon="pending_actions"
            color="text-orange-500"
            bgColor="bg-orange-500/10"
          />
          <StatCard
            title="Đã phản hồi"
            value="33"
            icon="mark_chat_read"
            color="text-emerald-500"
            bgColor="bg-emerald-500/10"
          />
        </div>
      </header>

      {/* Main Content: Master-Detail */}
      <div className="flex-1 flex overflow-hidden border-t border-slate-200 dark:border-slate-800">
        {/* Left Side: Review List */}
        <div className="w-full md:w-[400px] lg:w-[450px] flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto custom-scrollbar">
          {reviews.map((review) => (
            <div
              key={review.id}
              onClick={() => setActiveReview(review.id)}
              className={`cursor-pointer border-b border-slate-100 dark:border-slate-800 p-4 transition-all border-l-4 ${
                activeReview === review.id
                  ? "bg-primary/5 border-l-primary"
                  : "border-l-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-slate-200" />
                  <div>
                    <h4 className="text-sm font-bold dark:text-white">
                      {review.name}
                    </h4>
                    <p className="text-xs text-slate-500">{review.role}</p>
                  </div>
                </div>
                <span className="text-xs text-slate-400">{review.time}</span>
              </div>
              <div className="flex gap-2 mb-2">
                <StatusBadge status={review.status} />
                <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-medium">
                  {review.chapter}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                {review.content}
              </p>
            </div>
          ))}
        </div>

        {/* Right Side: Detailed View */}
        <div className="flex-1 flex flex-col bg-background-light dark:bg-[#101622] overflow-y-auto custom-scrollbar">
          <div className="p-8 max-w-4xl mx-auto w-full">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-500">
                  pending
                </span>
                <span className="text-sm font-bold text-orange-600 uppercase">
                  Chưa xử lý
                </span>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors">
                  Chuyển tác giả
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 shadow-sm">
                  Đánh dấu đã xong
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 mb-6">
              <div className="flex items-center gap-4 mb-6 border-b border-slate-100 dark:border-slate-800 pb-6">
                <div className="size-16 rounded-full bg-slate-200" />
                <div>
                  <h3 className="text-xl font-bold dark:text-white">
                    TS. Lê Thị C
                  </h3>
                  <p className="text-sm text-slate-500">
                    Giảng viên Toán học - Khoa Toán Tin
                  </p>
                </div>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                  Nội dung phản biện
                </h4>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700 mb-4">
                  <p className="text-primary font-medium text-sm">
                    Tham chiếu: Chương 3 Mục 3.1: Định nghĩa
                  </p>
                </div>
                <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                  {reviews.find((r) => r.id === activeReview)?.fullContent ||
                    reviews.find((r) => r.id === activeReview)?.content}
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="bg-slate-50 dark:bg-slate-800 px-6 py-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h4 className="text-sm font-bold dark:text-slate-300">
                  Phản hồi của bạn
                </h4>
              </div>
              <div className="p-6">
                <textarea
                  className="w-full h-32 p-3 bg-transparent border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm dark:text-white"
                  placeholder="Nhập nội dung phản hồi..."
                />
                <div className="flex justify-end gap-3 mt-4">
                  <button className="px-4 py-2 text-slate-500 text-sm font-medium">
                    Hủy
                  </button>
                  <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm shadow-md flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">
                      send
                    </span>{" "}
                    Gửi phản hồi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-components ---

const StatCard = ({
  title,
  value,
  icon,
  trend,
  color = "text-primary",
  bgColor = "bg-primary/10",
}: any) => (
  <div className="flex flex-col gap-1 p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
    <div className="flex justify-between items-start">
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <span
        className={`material-symbols-outlined ${color} ${bgColor} p-1.5 rounded-lg`}
      >
        {icon}
      </span>
    </div>
    <div className="flex items-baseline gap-2">
      <p className="text-3xl font-bold dark:text-white">{value}</p>
      {trend && <p className="text-emerald-600 text-sm font-medium">{trend}</p>}
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const config: any = {
    pending: {
      label: "Chưa xử lý",
      class:
        "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
    },
    completed: {
      label: "Đã xong",
      class:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    },
    responded: {
      label: "Đã phản hồi",
      class: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    },
  };
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${config[status].class}`}
    >
      {config[status].label}
    </span>
  );
};

export default QuanLyPhanBien;
