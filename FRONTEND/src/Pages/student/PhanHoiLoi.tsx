import React, { useState } from "react";

const PhanHoiLoi: React.FC = () => {
  const [formData, setFormData] = useState({
    section: "",
    page: "",
    errorType: "",
    description: "",
    email: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex-1 bg-[#f6f6f8] dark:bg-[#101622] min-h-screen">
      <main className="max-w-[1024px] mx-auto py-8 px-4 sm:px-8 flex flex-col gap-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-[#4c669a]">
          <a
            className="hover:text-primary flex items-center gap-1 transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined text-sm">
              arrow_back
            </span>
            Quay lại giáo trình
          </a>
        </div>

        {/* Page Heading */}
        <div className="flex flex-col gap-2">
          <h1 className="text-[#0d121b] dark:text-white tracking-tight text-3xl md:text-4xl font-bold leading-tight">
            Gửi Phản hồi Lỗi
          </h1>
          <p className="text-[#4c669a] dark:text-gray-400 text-base max-w-3xl">
            Gửi báo lỗi nhanh chóng nếu phát hiện sai sót trong nội dung giáo
            trình. Phản hồi của bạn giúp chúng tôi xử lý kịp thời và nâng cao
            chất lượng tài liệu.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
          {/* Main Form Section */}
          <div className="lg:col-span-2 flex flex-col gap-8 bg-white dark:bg-[#1a2233] p-6 md:p-8 rounded-2xl shadow-sm border border-[#e7ebf3] dark:border-slate-800">
            {/* Step 1: Location */}
            <div className="flex flex-col gap-4">
              <FormSectionTitle step="1" title="Vị trí lỗi" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InputField
                  label="Chương / Mục"
                  name="section"
                  placeholder="Ví dụ: Chương 3, Mục 3.2"
                  required
                  onChange={handleInputChange}
                />
                <InputField
                  label="Số trang (nếu có)"
                  name="page"
                  type="number"
                  placeholder="Ví dụ: 45"
                  required
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Step 2: Details */}
            <div className="flex flex-col gap-4">
              <FormSectionTitle step="2" title="Chi tiết lỗi" />
              <div className="flex flex-col gap-4">
                <label className="flex flex-col w-full">
                  <p className="text-[#0d121b] dark:text-white text-sm font-medium pb-2">
                    Loại lỗi <span className="text-red-500">*</span>
                  </p>
                  <div className="relative">
                    <select
                      name="errorType"
                      onChange={handleInputChange}
                      className="appearance-none flex w-full rounded-lg border border-[#cfd7e7] dark:border-slate-700 bg-white dark:bg-slate-800 h-11 px-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
                    >
                      <option value="">Chọn loại lỗi phù hợp</option>
                      <option value="typo">Lỗi chính tả / Ngữ pháp</option>
                      <option value="knowledge">
                        Lỗi kiến thức / Sai số liệu
                      </option>
                      <option value="image">
                        Lỗi hình ảnh / Biểu đồ mờ hoặc sai
                      </option>
                      <option value="format">Lỗi trình bày / Định dạng</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#4c669a]">
                      expand_more
                    </span>
                  </div>
                </label>

                <label className="flex flex-col w-full">
                  <p className="text-[#0d121b] dark:text-white text-sm font-medium pb-2">
                    Mô tả lỗi <span className="text-red-500">*</span>
                  </p>
                  <textarea
                    name="description"
                    onChange={handleInputChange}
                    className="flex w-full rounded-lg border border-[#cfd7e7] dark:border-slate-700 bg-white dark:bg-slate-800 min-h-[120px] p-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none resize-y"
                    placeholder="Mô tả cụ thể vấn đề để chúng tôi dễ dàng xác định..."
                  />
                </label>

                <div className="flex flex-col w-full">
                  <p className="text-[#0d121b] dark:text-white text-sm font-medium pb-2">
                    Hình ảnh minh chứng (Tùy chọn)
                  </p>
                  <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-[#cfd7e7] dark:border-slate-700 border-dashed rounded-lg cursor-pointer bg-[#f8f9fc] dark:bg-slate-800/50 hover:bg-[#eef2f6] dark:hover:bg-slate-800 hover:border-primary/50 transition-all group">
                    <div className="flex flex-col items-center justify-center pt-4 pb-5">
                      <span className="material-symbols-outlined text-[#4c669a] mb-1 text-2xl group-hover:text-primary transition-colors">
                        cloud_upload
                      </span>
                      <p className="text-sm text-[#4c669a] font-medium">
                        <span className="text-primary font-semibold">
                          Tải ảnh lên
                        </span>{" "}
                        hoặc kéo thả
                      </p>
                      <p className="text-xs text-[#9ca3af]">
                        PNG, JPG (Tối đa 5MB)
                      </p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" />
                  </label>
                </div>
              </div>
            </div>

            {/* Step 3: Contact */}
            <div className="flex flex-col gap-4">
              <FormSectionTitle step="3" title="Thông tin liên hệ" />
              <InputField
                label="Email của bạn (Tùy chọn)"
                name="email"
                type="email"
                placeholder="nhanvien@university.edu.vn"
                onChange={handleInputChange}
                subText="Để chúng tôi có thể gửi thông báo khi lỗi đã được xử lý."
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4 border-t border-[#f0f2f5] dark:border-slate-800">
              <button className="h-12 px-8 rounded-lg bg-primary text-white font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-md">
                Gửi Báo Cáo
              </button>
              <button className="h-12 px-8 rounded-lg bg-white dark:bg-slate-800 border border-[#cfd7e7] dark:border-slate-700 text-[#4c669a] font-medium hover:bg-[#f8f9fc] transition-colors">
                Hủy bỏ
              </button>
            </div>
          </div>

          {/* Sidebar - Context Information */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-[#1a2233] p-6 rounded-2xl shadow-sm border border-[#e7ebf3] dark:border-slate-800 sticky top-24">
              <h3 className="text-[#0d121b] dark:text-white text-lg font-bold mb-4 border-b border-[#f0f2f5] dark:border-slate-800 pb-3 text-center">
                Giáo trình đang báo cáo
              </h3>
              <div className="flex flex-col gap-4 items-center mb-6">
                <div
                  className="w-32 aspect-[2/3] rounded-lg shadow-md bg-cover bg-center border border-slate-100"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBlh6xizrTfC0grB605WmzfILDL2jMuERpTb2Q7ttSScWHV9jyNeJuLaMvhvbq6KGWMSE87l-Yh6vKTYOtaQeN2RNx4OMT3Gr8U5b2-P5bNsoicxI-virMV0_yUQPhwL7HnJ3klOuWUB4czjVvtB0iNUxNfBXB_5sdvq5xyNfpaWJ-GSUlFIFIcteKA6681rGaUveGOP79OmbD802T2eeITHDWWcIaGY_tFFINLGndMBgxzxwbhf8cBU4rOpwEg3lDqQ5W4CHPsaqQ')",
                  }}
                />
                <div className="text-center">
                  <h4 className="text-[#0d121b] dark:text-white text-lg font-bold leading-tight">
                    Đại số tuyến tính
                  </h4>
                  <span className="text-[#4c669a] text-xs font-medium bg-[#f0f2f5] dark:bg-slate-800 px-3 py-1 rounded-full inline-block mt-2">
                    Tập 1 - Tái bản lần 3
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <InfoItem
                  icon="person"
                  label="Tác giả"
                  value="TS. Nguyễn Văn A, ThS. Trần Thị B"
                />
                <InfoItem
                  icon="domain"
                  label="Khoa"
                  value="Khoa Toán - Tin học"
                />
                <InfoItem
                  icon="calendar_month"
                  label="Năm xuất bản"
                  value="2023"
                />
              </div>

              <div className="mt-6 pt-4 border-t border-[#f0f2f5] dark:border-slate-800">
                <div className="flex gap-3 p-3 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg">
                  <span className="material-symbols-outlined text-primary text-xl">
                    info
                  </span>
                  <p className="text-sm text-[#4c669a] dark:text-slate-400 leading-snug">
                    Cảm ơn đóng góp của bạn! Hệ thống sẽ ghi nhận và gửi đến Ban
                    biên soạn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Sub-components ---

const FormSectionTitle = ({ step, title }: { step: string; title: string }) => (
  <div className="flex items-center gap-3 border-b border-[#f0f2f5] dark:border-slate-800 pb-2">
    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/40 text-primary text-sm font-bold">
      {step}
    </span>
    <h3 className="text-[#0d121b] dark:text-white text-lg font-bold">
      {title}
    </h3>
  </div>
);

const InputField = ({ label, required, subText, ...props }: any) => (
  <label className="flex flex-col flex-1">
    <p className="text-[#0d121b] dark:text-white text-sm font-medium pb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </p>
    <input
      className="form-input w-full rounded-lg border border-[#cfd7e7] dark:border-slate-700 bg-white dark:bg-slate-800 h-11 px-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm dark:text-white"
      {...props}
    />
    {subText && <p className="text-xs text-[#4c669a] pt-1.5">{subText}</p>}
  </label>
);

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-3">
    <div className="size-8 rounded-full bg-gray-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
      <span className="material-symbols-outlined text-[#4c669a] text-lg">
        {icon}
      </span>
    </div>
    <div>
      <p className="text-[10px] text-[#4c669a] font-bold uppercase tracking-wider">
        {label}
      </p>
      <p className="text-[#0d121b] dark:text-slate-300 text-sm font-medium">
        {value}
      </p>
    </div>
  </div>
);

export default PhanHoiLoi;
