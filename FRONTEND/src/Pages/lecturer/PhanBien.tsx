import React, { useState } from "react";

const PhanBienCongTac: React.FC = () => {
  const [activeCommentId, setActiveCommentId] = useState<number | null>(1);

  // Dữ liệu mẫu cho danh sách bình luận
  const comments = [
    {
      id: 1,
      author: "TS. Lê Văn B",
      role: "Giảng viên Toán học",
      time: "10:30 AM",
      type: "feedback",
      reference: '"Tất cả các mức của cây đều được lấp đầy..."',
      content:
        "Định nghĩa này có vẻ hơi dài dòng. Chúng ta có thể rút gọn lại cho dễ hiểu hơn không?",
      status: "active",
      replies: [
        {
          author: "Bạn (Giảng viên)",
          content: "Đồng ý, tôi sẽ đề xuất lại câu chữ.",
          time: "Vừa xong",
        },
      ],
    },
    {
      id: 2,
      author: "Bạn",
      time: "14:15 PM",
      type: "error",
      reference: '"Cây nhị phân cân bằng (Degenerate Tree)"',
      content:
        'Thuật ngữ sai nghiêm trọng. "Degenerate Tree" là cây suy biến. Cân bằng phải là "Balanced Tree".',
      status: "new",
    },
    {
      id: 3,
      author: "TS. Trần C",
      time: "Hôm qua",
      type: "resolved",
      reference: "Hình 1.1 bị mờ",
      content: "Đã cập nhật lại hình vector chất lượng cao.",
      status: "resolved",
    },
  ];

  return (
    <div className="flex flex-1 overflow-hidden relative bg-[#f6f6f8] dark:bg-[#101622]">
      {/* Center Scrollable Content - Document Viewer */}
      <div className="flex-1 overflow-y-auto scroll-smooth relative custom-scrollbar">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col gap-6">
          {/* Breadcrumbs & Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex flex-col gap-2 max-w-2xl">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span>Trang chủ</span> / <span>Danh sách</span> /{" "}
                <span className="text-slate-900 dark:text-white font-medium">
                  Phản biện
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                Phản biện: Cấu trúc dữ liệu nâng cao - HK Xuân 2024
              </h1>
              <p className="text-slate-500 text-sm">
                Phiên bản 2.1 • Cập nhật lần cuối: 2 giờ trước bởi TS. Lê Văn B
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-white transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">
                  flag
                </span>{" "}
                Báo cáo lỗi
              </button>
              <button className="px-5 py-2 rounded-lg bg-primary hover:bg-blue-700 text-white font-bold text-sm shadow-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">
                  send
                </span>{" "}
                Gửi kết quả
              </button>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="bg-white dark:bg-[#1a2332] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-lg">
                <span className="material-symbols-outlined">timer</span>
              </div>
              <div>
                <p className="text-sm font-medium dark:text-white">
                  Thời hạn phản biện
                </p>
                <p className="text-xs text-slate-500">
                  Hoàn thành trước 17:00, 25/05/2024
                </p>
              </div>
            </div>
            <div className="flex gap-2 text-center">
              <TimeBox value="02" label="Ngày" active />
              <span className="text-xl font-bold text-slate-300 self-center">
                :
              </span>
              <TimeBox value="04" label="Giờ" />
              <span className="text-xl font-bold text-slate-300 self-center">
                :
              </span>
              <TimeBox value="15" label="Phút" />
            </div>
          </div>

          {/* Document Content Area */}
          <div className="flex flex-col bg-white dark:bg-[#1a2332] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 min-h-[800px] overflow-hidden">
            <div className="sticky top-0 z-10 bg-white dark:bg-[#1a2332] border-b border-slate-200 dark:border-slate-800 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
                  <span className="material-symbols-outlined text-[20px]">
                    toc
                  </span>
                </button>
                <span className="text-xs font-medium text-slate-400 px-2 border-l border-slate-200 ml-2">
                  Chương 1
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
                  <span className="material-symbols-outlined">add_comment</span>
                </button>
                <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
                  <span className="material-symbols-outlined">
                    ink_highlighter
                  </span>
                </button>
              </div>
            </div>

            <article className="p-8 md:p-12 leading-relaxed text-slate-800 dark:text-slate-200 text-lg">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                Chương 1: Giới thiệu về Cây Nhị Phân
              </h2>
              <p className="mb-6 text-justify">
                Cây nhị phân (Binary Tree) là một cấu trúc dữ liệu dạng cây mà
                mỗi nút có tối đa hai nút con, được gọi là{" "}
                <span className="font-semibold">con trái</span> và{" "}
                <span className="font-semibold">con phải</span>.
              </p>

              <div className="my-8 flex justify-center">
                <div className="w-full max-w-md aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center border border-dashed border-slate-300 text-slate-400">
                  [Hình 1.1: Minh họa cấu trúc Cây Nhị Phân]
                </div>
              </div>

              <ul className="list-disc pl-6 space-y-4">
                <li>
                  <span className="font-semibold">Cây nhị phân đầy đủ:</span>{" "}
                  Mỗi nút có 0 hoặc 2 nút con.
                </li>
                <li>
                  <span className="font-semibold">
                    Cây nhị phân hoàn chỉnh:{" "}
                  </span>
                  <span
                    className={`rounded px-1 cursor-pointer transition-colors ${
                      activeCommentId === 1
                        ? "bg-primary/20 border-b-2 border-primary"
                        : "bg-primary/5 border-b-2 border-transparent"
                    }`}
                    onClick={() => setActiveCommentId(1)}
                  >
                    Tất cả các mức của cây đều được lấp đầy hoàn toàn ngoại trừ
                    mức cuối cùng
                  </span>
                  , và các nút ở mức cuối cùng đều nằm về phía bên trái nhất có
                  thể.
                </li>
                <li>
                  <span
                    className="bg-red-500/10 border-b-2 border-red-500 rounded px-1 cursor-help"
                    title="Lỗi: Sai thuật ngữ"
                  >
                    Cây nhị phân cân bằng (Degenerate Tree):
                  </span>{" "}
                  Cao của hai cây con khác nhau không quá 1.
                </li>
              </ul>
            </article>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Feedback Panel */}
      <aside className="hidden xl:flex flex-col w-80 bg-white dark:bg-[#1a2332] border-l border-slate-200 dark:border-slate-800 z-20">
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 dark:text-white">
            Góp ý & Bình luận
          </h3>
          <button className="p-1 text-slate-500 hover:text-primary">
            <span className="material-symbols-outlined text-[20px]">
              filter_list
            </span>
          </button>
        </div>

        <div className="flex border-b border-slate-200 dark:border-slate-800">
          <button className="flex-1 py-3 text-sm font-bold text-primary border-b-2 border-primary">
            Tất cả (3)
          </button>
          <button className="flex-1 py-3 text-sm font-medium text-slate-500">
            Của tôi
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar">
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              isActive={activeCommentId === comment.id}
              onClick={() => setActiveCommentId(comment.id)}
            />
          ))}
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 text-slate-500 hover:text-primary hover:border-primary transition-all">
            <span className="material-symbols-outlined">add</span>
            <span className="text-sm font-medium">Thêm nhận xét chung</span>
          </button>
        </div>
      </aside>
    </div>
  );
};

// --- Sub-components ---

const TimeBox = ({
  value,
  label,
  active = false,
}: {
  value: string;
  label: string;
  active?: boolean;
}) => (
  <div className="flex flex-col bg-slate-100 dark:bg-slate-800 rounded px-3 py-1 min-w-[3.5rem]">
    <span
      className={`text-lg font-bold ${
        active ? "text-primary" : "dark:text-white"
      }`}
    >
      {value}
    </span>
    <span className="text-[10px] uppercase text-slate-500 font-semibold">
      {label}
    </span>
  </div>
);

const CommentCard = ({ comment, isActive, onClick }: any) => {
  const typeStyles: any = {
    feedback: "bg-yellow-100 text-yellow-700",
    error: "bg-red-100 text-red-700",
    resolved: "bg-green-100 text-green-700",
  };

  return (
    <div
      onClick={onClick}
      className={`flex flex-col gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
        isActive
          ? "border-primary bg-primary/5 ring-1 ring-primary/20"
          : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-slate-200 shrink-0" />
          <div className="flex flex-col">
            <span className="text-sm font-bold dark:text-white">
              {comment.author}
            </span>
            <span className="text-[10px] text-slate-500">{comment.time}</span>
          </div>
        </div>
        <span
          className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
            typeStyles[comment.type]
          }`}
        >
          {comment.type === "feedback"
            ? "Góp ý"
            : comment.type === "error"
            ? "Lỗi"
            : "Xong"}
        </span>
      </div>
      <div className="text-[11px] text-slate-500 pl-2 border-l-2 border-slate-200 italic line-clamp-1">
        {comment.reference}
      </div>
      <p className="text-sm text-slate-800 dark:text-slate-300 leading-snug">
        {comment.content}
      </p>

      {comment.replies && (
        <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
          {comment.replies.map((reply: any, i: number) => (
            <div key={i} className="flex gap-2">
              <div className="w-0.5 bg-slate-200 rounded-full" />
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-primary">
                  {reply.author}
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {reply.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhanBienCongTac;
