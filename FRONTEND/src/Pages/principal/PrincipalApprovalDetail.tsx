import React from "react";

const PrincipalApprovalDetail: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumbs & Heading */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-[#4c669a]">
          <span className="hover:underline cursor-pointer"></span>
          <span className="material-symbols-outlined text-[16px]"></span>
        </div>
        <div className="flex justify-between items-end flex-wrap gap-4 mt-2">
          <div>
            <h1 className="text-[#0d121b] text-3xl font-black tracking-tight">
              Phê duyệt Chiến lược
            </h1>
            <p className="text-[#4c669a] mt-1">
              Xem xét và đưa ra quyết định đối với các đề xuất chiến lược giáo
              trình mới.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white border border-[#e7ebf3] px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-50 transition">
              <span className="material-symbols-outlined text-[18px]">
                filter_list
              </span>{" "}
              Lọc
            </button>
            <button className="bg-white border border-[#e7ebf3] px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-50 transition">
              <span className="material-symbols-outlined text-[18px]">
                download
              </span>{" "}
              Xuất báo cáo
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatSummaryCard
          title="Chờ phê duyệt"
          value="12"
          sub="+2 yêu cầu mới"
          icon="hourglass_top"
          color="blue"
        />
        <StatSummaryCard
          title="Đã phê duyệt (Tháng này)"
          value="45"
          sub="+15% so với T trước"
          icon="check_circle"
          color="green"
        />
        <StatSummaryCard
          title="Đã từ chối (Tháng này)"
          value="3"
          sub="-5% so với T trước"
          icon="cancel"
          color="red"
        />
      </div>

      {/* Split Layout */}
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-320px)] min-h-[600px]">
        {/* Left Panel: List of Proposals */}
        <div className="w-full lg:w-4/12 flex flex-col bg-white rounded-xl shadow-sm border border-[#e7ebf3] overflow-hidden">
          <div className="p-4 border-b border-[#e7ebf3]">
            <div className="relative mb-3">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#4c669a]">
                search
              </span>
              <input
                className="w-full pl-10 pr-3 py-2.5 bg-[#f0f2f5] border-none rounded-lg text-sm focus:ring-2 focus:ring-[#135bec]"
                placeholder="Tìm theo tên hoặc mã số..."
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              <span className="whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium bg-[#135bec] text-white cursor-pointer">
                Tất cả
              </span>
              <span className="whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium bg-[#f0f2f5] text-[#4c669a] cursor-pointer">
                Chờ duyệt
              </span>
              <span className="whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium bg-[#f0f2f5] text-[#4c669a] cursor-pointer">
                Ưu tiên cao
              </span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
            <ProposalItem
              active
              title="Đổi mới khung chương trình Trí tuệ nhân tạo (AI) 2024"
              code="STR-2024-056"
              dept="CNTT"
              time="2 giờ trước"
              user="TS. Nguyễn Văn B"
            />
            <ProposalItem
              title="Đề xuất tích hợp môn Khởi nghiệp vào các ngành Kinh tế"
              code="STR-2024-052"
              dept="Kinh tế"
              time="1 ngày trước"
              user="ThS. Trần Thị Lan"
              color="orange"
            />
            <ProposalItem
              title="Cập nhật chuẩn đầu ra tiếng Anh theo khung năng lực mới"
              code="STR-2024-048"
              dept="Ngoại ngữ"
              time="3 ngày trước"
              user="TS. Mai Hữu"
              color="purple"
            />
          </div>
        </div>

        {/* Right Panel: Detailed View with History Column */}
        <div className="w-full lg:w-8/12 bg-white rounded-xl shadow-sm border border-[#e7ebf3] flex flex-col overflow-hidden relative">
          <div className="px-6 py-5 border-b border-[#e7ebf3] flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    hourglass_top
                  </span>{" "}
                  Chờ phê duyệt
                </span>
                <span className="text-sm text-[#4c669a]">Mã: STR-2024-056</span>
                <span className="text-sm text-red-500 font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">
                    priority_high
                  </span>{" "}
                  Ưu tiên cao
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold">
                Đổi mới khung chương trình Trí tuệ nhân tạo (AI) 2024
              </h2>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-[#4c669a] hover:bg-gray-100 rounded-lg">
                <span className="material-symbols-outlined">print</span>
              </button>
              <button className="p-2 text-[#4c669a] hover:bg-gray-100 rounded-lg">
                <span className="material-symbols-outlined">share</span>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content Col */}
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <h3 className="font-bold mb-3 flex items-center gap-2 text-[#0d121b]">
                    <span className="material-symbols-outlined text-[#135bec]">
                      description
                    </span>{" "}
                    Nội dung tóm tắt
                  </h3>
                  <p className="text-[#4c669a] text-sm leading-relaxed mb-4">
                    Chiến lược này đề xuất việc tái cấu trúc chương trình đào
                    tạo ngành Khoa học máy tính, chuyên ngành AI, nhằm đáp ứng
                    nhu cầu thị trường hiện tại. Nội dung bao gồm việc cập nhật
                    30% môn học cốt lõi, bổ sung các học phần về Generative AI,
                    Đạo đức AI...
                  </p>
                </section>

                <section>
                  <h3 className="font-bold mb-3 flex items-center gap-2 text-[#0d121b]">
                    <span className="material-symbols-outlined text-[#135bec]">
                      target
                    </span>{" "}
                    Mục tiêu chính
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-[#4c669a]">
                    <li>
                      Nâng cao tỷ lệ sinh viên có việc làm đúng chuyên ngành AI
                      lên 95%.
                    </li>
                    <li>
                      Cập nhật công nghệ mới nhất (LLMs, Computer Vision) vào
                      giảng dạy.
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-bold mb-3 flex items-center gap-2 text-[#0d121b]">
                    <span className="material-symbols-outlined text-[#135bec]">
                      attach_file
                    </span>{" "}
                    Tài liệu đính kèm
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <AttachmentItem
                      name="Chi_tiet_de_xuat_v1.pdf"
                      size="2.4 MB"
                      type="pdf"
                    />
                    <AttachmentItem
                      name="Phu_luc_ngan_sach.docx"
                      size="1.1 MB"
                      type="doc"
                    />
                  </div>
                </section>
              </div>

              {/* Sidebar Info Col (History & Sender) */}
              <div className="lg:col-span-1 border-l border-[#e7ebf3] pl-6 space-y-8">
                <div>
                  <h3 className="font-bold mb-4 flex items-center gap-2 text-sm text-gray-500">
                    <span className="material-symbols-outlined text-sm">
                      history
                    </span>{" "}
                    Lịch sử xử lý
                  </h3>
                  <div className="relative pl-4 space-y-6 before:absolute before:inset-y-0 before:left-[5px] before:w-0.5 before:bg-[#e7ebf3]">
                    <TimelineEvent
                      time="Hôm nay, 08:30"
                      title="Gửi lên Hiệu trưởng"
                      sub="Bởi: Phòng Hành chính"
                      active
                    />
                    <TimelineEvent
                      time="Hôm qua, 14:20"
                      title="Hội đồng Khoa học thông qua"
                      sub="Trạng thái: Đã duyệt"
                      color="bg-green-500"
                    />
                    <TimelineEvent
                      time="20 Th5, 09:00"
                      title="Khởi tạo đề xuất"
                      sub="Bởi: TS. Nguyễn Văn B"
                    />
                  </div>
                </div>

                <div className="bg-[#f8f9fc] rounded-lg p-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-3 tracking-wider">
                    Thông tin người gửi
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-gray-300"></div>
                    <div>
                      <p className="text-sm font-bold text-[#0d121b]">
                        TS. Nguyễn Văn B
                      </p>
                      <p className="text-xs text-[#4c669a]">Trưởng Khoa CNTT</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer Area */}
          <div className="p-6 border-t border-[#e7ebf3] bg-white">
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                  Ghi chú / Nhận xét
                </label>
                <textarea
                  className="w-full rounded-lg border-[#e7ebf3] bg-[#f8f9fc] px-3 py-2 text-sm focus:ring-1 focus:ring-[#135bec]"
                  placeholder="Nhập lý do phê duyệt hoặc từ chối..."
                  rows={2}
                ></textarea>
              </div>
              <div className="flex justify-end gap-3">
                <button className="px-5 py-2.5 rounded-lg border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 text-sm font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">
                    block
                  </span>{" "}
                  Từ chối
                </button>
                <button className="px-5 py-2.5 rounded-lg border border-[#e7ebf3] text-[#0d121b] hover:bg-gray-100 text-sm font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">
                    edit_note
                  </span>{" "}
                  Yêu cầu chỉnh sửa
                </button>
                <button className="px-6 py-2.5 rounded-lg bg-[#135bec] text-white hover:bg-blue-700 text-sm font-bold shadow-md flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">
                    check_circle
                  </span>{" "}
                  Phê duyệt Cuối
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-components ---

const StatSummaryCard = ({ title, value, sub, icon, color }: any) => {
  const colors: any = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600",
  };
  return (
    <div className="bg-white rounded-xl p-5 border border-[#e7ebf3] shadow-sm flex items-center justify-between hover:border-[#135bec]/50 transition-colors cursor-pointer group">
      <div>
        <p className="text-[#4c669a] text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold mt-1 text-[#0d121b]">{value}</p>
        <p
          className={`text-xs font-medium mt-1 flex items-center gap-1 ${
            color === "red" ? "text-red-500" : "text-green-600"
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">
            trending_up
          </span>{" "}
          {sub}
        </p>
      </div>
      <div
        className={`size-12 rounded-full ${colors[color]} flex items-center justify-center group-hover:scale-110 transition-transform`}
      >
        <span className="material-symbols-outlined text-2xl">{icon}</span>
      </div>
    </div>
  );
};

const ProposalItem = ({
  title,
  code,
  dept,
  time,
  user,
  active,
  color = "blue",
}: any) => {
  const badgeColors: any = {
    blue: "bg-blue-100 text-blue-700",
    orange: "bg-orange-100 text-orange-700",
    purple: "bg-purple-100 text-purple-700",
  };
  return (
    <div
      className={`p-4 rounded-lg cursor-pointer transition-all ${
        active
          ? "bg-blue-50 border-l-4 border-[#135bec]"
          : "bg-white border border-transparent hover:bg-gray-50"
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <span
          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${badgeColors[color]}`}
        >
          {dept}
        </span>
        <span className="text-[10px] text-[#4c669a]">{time}</span>
      </div>
      <h3
        className={`text-sm leading-tight mb-1 font-semibold ${
          active ? "text-[#135bec]" : "text-[#0d121b]"
        }`}
      >
        {title}
      </h3>
      <p className="text-[11px] text-[#4c669a] mb-2">Mã: {code}</p>
      <div className="flex items-center gap-2">
        <div className="size-5 rounded-full bg-gray-200"></div>
        <p className="text-[11px] font-medium text-[#0d121b]">{user}</p>
      </div>
    </div>
  );
};

const TimelineEvent = ({
  time,
  title,
  sub,
  active,
  color = "bg-gray-300",
}: any) => (
  <div className="relative pl-4">
    <div
      className={`absolute -left-[5px] mt-1.5 w-2.5 h-2.5 rounded-full ${
        active ? "bg-[#135bec]" : color
      } ring-4 ring-white`}
    ></div>
    <p className="text-[10px] text-[#4c669a] mb-0.5">{time}</p>
    <p className="text-xs font-bold text-[#0d121b]">{title}</p>
    <p className="text-[11px] text-[#4c669a]">{sub}</p>
  </div>
);

const AttachmentItem = ({ name, size, type }: any) => (
  <div className="flex items-center gap-3 p-3 rounded-lg border border-[#e7ebf3] hover:bg-gray-50 transition-colors cursor-pointer group">
    <div
      className={`size-10 rounded flex items-center justify-center shrink-0 ${
        type === "pdf" ? "bg-red-50 text-red-500" : "bg-blue-50 text-blue-500"
      }`}
    >
      <span className="material-symbols-outlined">
        {type === "pdf" ? "picture_as_pdf" : "description"}
      </span>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium truncate group-hover:text-[#135bec] text-[#0d121b]">
        {name}
      </p>
      <p className="text-xs text-[#4c669a]">{size}</p>
    </div>
    <span className="material-symbols-outlined text-[#4c669a] group-hover:text-[#135bec]">
      download
    </span>
  </div>
);

export default PrincipalApprovalDetail;
