import { GoogleGenAI, Type } from "@google/genai";
import { Question } from "./types";

const LOCAL_STORAGE_KEY = 'GEMINI_API_KEY';

export function getGeminiApiKey(): string {
  if (typeof window !== 'undefined') {
    try {
      const v = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (v && v.trim()) return v.trim();
    } catch {}
  }
  return (process.env.GEMINI_API_KEY || process.env.API_KEY || "").trim();
}

export const generateQuizQuestions = async (subject: string, scope: string, grade: string, forbiddenContent: string = ""): Promise<Question[]> => {
  // Load API KEY
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error("Chưa có GEMINI_API_KEY. Hãy bấm nút hình chìa khóa để nhập API key.");
  }
  const ai = new GoogleGenAI({ apiKey });
  
  // Generate prompt
  let prompt = `Bạn là chuyên gia toán học hàng đầu, chuyên biên soạn đề thi trắc nghiệm môn Toán chuẩn Chương trình Giáo dục phổ thông 2018 (GDPT 2018) của Việt Nam cấp Trung học phổ thông (Lớp ${grade}), phạm vi kiến thức: "${scope}".\n`;
  
  if (forbiddenContent.trim() !== "") {
    prompt += `\n  YÊU CẦU ĐẶC BIỆT TỪ GIÁO VIÊN (TUYỆT ĐỐI TUÂN THỦ): KHÔNG ĐƯỢC PHÉP ra các câu hỏi liên quan đến nội dung sau: "${forbiddenContent}".\n\n`;
  }

  prompt += `  Hãy tạo đúng 20 câu hỏi trắc nghiệm khách quan với 4 lựa chọn (A, B, C, D) theo cấu trúc ma trận sau:

  PHÂN BỔ ĐỘ KHÓ (BẮT BUỘC):
  1. 5 câu NHẬN BIẾT (Mức độ 1).
  2. 7 câu THÔNG HIỂU (Mức độ 2).
  3. 5 câu VẬN DỤNG (Mức độ 3).
  4. 3 câu VẬN DỤNG CAO (Mức độ 4).

  YÊU CẦU TUÂN THỦ NGHIÊM NGẶT GDPT 2018 & TRIẾT LÝ MỚI:
  - TƯ TƯỞNG CHỦ ĐẠO: Tập trung vào kiến thức CƠ BẢN, TRỌNG TÂM. Tránh các bài toán biến đổi đại số phức tạp, lắt léo hoặc mang tính đánh đố thuần túy.
  - TUÂN THỦ THỨ TỰ CHƯƠNG TRÌNH: Chú ý thứ tự các bài, các chương theo hệ thống chương trình của 3 khối để KHÔNG ra câu hỏi vượt chương trình (chưa học). Ví dụ: Lớp 11 chương Hàm số mũ, lôgarit TUYỆT ĐỐI KHÔNG hỏi đạo hàm và tính đơn điệu của hàm số hợp. Lớp 12 chương Phương pháp tọa độ trong không gian, nếu phạm vi là phương trình mặt phẳng thì TUYỆT ĐỐI KHÔNG hỏi phương trình đường thẳng và mặt cầu.
  - ỨNG DỤNG THỰC TẾ: Ưu tiên lồng ghép các bài toán có bối cảnh thực tế, liên môn hoặc giải quyết vấn đề thực tiễn (đặc biệt ở mức độ Thông hiểu và Vận dụng).
  - CHI TIẾT THEO KHỐI LỚP:
    * Lớp 10: Bất phương trình bậc hai chỉ xét tam thức bậc hai, KHÔNG xét dấu tích hoặc thương của nhiều biểu thức.
    * Lớp 11:
      + Phương trình, bất phương trình lượng giác, mũ, lôgarit: Chỉ hỏi các dạng CƠ BẢN (ví dụ: $a^x = b$, $\log_a x = b$). TUYỆT ĐỐI KHÔNG dùng phương pháp đặt ẩn phụ phức tạp hay biến đổi sâu.
      + Thống kê: Chỉ hỏi các khái niệm cơ bản, giá trị trung bình, trung vị, tứ phân vị, mốt. KHÔNG hỏi khoảng biến thiên, khoảng tứ phân vị, phương sai, độ lệch chuẩn.
      + Thứ tự kiến thức: Mũ và Lôgarit học TRƯỚC Đạo hàm.
    * Lớp 12:
      + Khảo sát và vẽ đồ thị hàm số (Chương I): CHỈ nhận dạng và khảo sát đồ thị các hàm số: bậc 3 ($y=ax^3+bx^2+cx+d$), phân thức bậc 1 / bậc 1 ($y=\\frac{ax+b}{cx+d}$), và phân thức bậc 2 / bậc 1 ($y=\\frac{ax^2+bx+c}{mx+n}$). TUYỆT ĐỐI KHÔNG ra câu hỏi nhận dạng hoặc khảo sát đồ thị hàm số trùng phương ($y=ax^4+bx^2+c$).
      + Nguyên hàm, Tích phân: Chỉ dùng các công thức cơ bản và tính chất. KHÔNG dùng phương pháp đổi biến số hay tích phân từng phần.
      + Hình học Oxyz (Chương II): Chỉ học về Vectơ và tọa độ điểm/vectơ cơ bản. KHÔNG đưa phương trình mặt phẳng, đường thẳng, mặt cầu vào chương này.

  YÊU CẦU TRÌNH BÀY LATEX & KÝ HIỆU (BẮT BUỘC):
  - TẤT CẢ các biểu thức toán học, số đơn lẻ, ký hiệu, khoảng, đoạn (ví dụ: $x$, $2$, $(3; +\infty)$, $[1; 2]$, $\Delta$) PHẢI được bao bọc trong dấu $ $ (inline) hoặc $$ $$ (block). Ví dụ: thay vì viết "x = 2", phải viết "$x = 2$". Thay vì viết "(3; +inf)", phải viết "$(3; +\infty)$".
  - ĐỐI VỚI GIỚI HẠN (LIMIT): BẮT BUỘC sử dụng \`\\lim\\limits_{...}\` thay vì \`\\lim_{...}\` để chỉ số luôn nằm ngay bên dưới chữ lim (kể cả trong inline math). Ví dụ: \`$\\lim\\limits_{x \\to 0} f(x)$\`.
  - ĐỐI VỚI TÍCH PHÂN (INTEGRAL): BẮT BUỘC sử dụng \`\\displaystyle \\int\` thay vì \`\\int\` để dấu tích phân và các cận hiển thị to, rõ ràng và chuẩn xác (kể cả trong inline math). Ví dụ: \`$\\displaystyle \\int\\limits_0^1 f(x) dx$\`.
  - TUYỆT ĐỐI KHÔNG sử dụng môi trường \`tikzpicture\` hoặc các gói như \`tkz-tab\` vì trình duyệt không hỗ trợ vẽ trực tiếp.
  - Để vẽ BẢNG BIẾN THIÊN hoặc BẢNG XÉT DẤU: Hãy sử dụng môi trường \`\\begin{array}\` của LaTeX và BẮT BUỘC bao bọc trong dấu \`$$ $$\` (block math) để bảng luôn nằm riêng một dòng và căn giữa màn hình.
    * QUY TẮC KẺ BẢNG: Sử dụng một dấu gạch dọc \`|\` duy nhất sau cột đầu tiên để phân tách nhãn (x, f'(x), f(x)). Các cột giá trị KHÔNG dùng gạch dọc trừ trường hợp đặc biệt.
    * ĐỐI VỚI HÀM PHÂN THỨC (ĐIỂM KHÔNG XÁC ĐỊNH): Tại giá trị $x$ làm hàm số không xác định, BẮT BUỘC sử dụng dấu gạch dọc kép \`||\` trong định nghĩa cột của \`array\`.
    * Ví dụ mẫu hàm phân thức (không xác định tại $x=1$): \`$$\\begin{array}{c|cc||cc} x & -\\infty & & 1 & & +\\infty \\\\ \\hline f'(x) & & - & || & - & \\\\ \\hline f(x) & 2 & \\searrow & -\\infty || +\\infty & \\searrow & 2 \\end{array}$$\`.
    * Lưu ý: Dấu \`||\` trong hàng $f'(x)$ và $f(x)$ giúp thể hiện sự không xác định một cách trực quan.
    * QUY TẮC \`\\hline\`: \`\\hline\` CHỈ được phép nằm BÊN TRONG môi trường \`array\`. KHÔNG được đặt \`\\hline\` bên ngoài hoặc ngay trước \`\\begin{array}\`.
    * Cấu trúc mẫu hàm đa thức: \`$$\\begin{array}{c|cccc} x & -\\infty & & 1 & & +\\infty \\\\ \\hline f'(x) & & - & 0 & + & \\\\ \\hline f(x) & +\\infty & \\searrow & -1 & \\nearrow & +\\infty \\end{array}$$\`.
    * Đảm bảo các hàng $x$, $f'(x)$, $f(x)$ được căn chỉnh thẳng hàng. Sử dụng các khoảng trắng (khoảng trống trong LaTeX như \`\\quad\` hoặc đơn giản là các cột trống) để các mũi tên và giá trị cực trị nằm đúng vị trí tương ứng với giá trị $x$ bên trên.
    * KHÔNG lạm dụng dấu gạch dọc \`|\` giữa các cột giá trị $x$. Chỉ dùng một dấu \`|\` sau cột tiêu đề đầu tiên.
  - ĐỐI VỚI ĐỒ THỊ HÀM SỐ (BẮT BUỘC NẾU CÓ HÌNH VẼ):
    * KHÔNG trả về mã SVG trực tiếp. Thay vào đó, trả về đối tượng JSON \`graphData\` chứa thông tin hàm số để ứng dụng tự vẽ.
    * \`graphData\` phải có cấu trúc:
      {
        "type": "polynomial" | "exponential" | "logarithmic" | "rational",
        "expression": "chuỗi biểu thức toán học JavaScript hợp lệ theo biến x", // Dùng khi chỉ có 1 đồ thị
        "expressions": ["biểu thức 1", "biểu thức 2"], // Dùng khi có từ 2 đồ thị trở lên trên cùng 1 hệ trục
        "labels": ["y = a^x", "y = b^x"], // (Tùy chọn) Nhãn cho từng đồ thị tương ứng trong mảng expressions
        "points": [{"x": 1, "y": 2, "label": "A"}] // (Tùy chọn) Các điểm quan trọng cần đánh dấu trên đồ thị (cực trị, giao điểm, v.v.)
      }
    * Hướng dẫn viết \`expression\`:
      - Phải là biểu thức JavaScript hợp lệ.
      - Sử dụng \`Math.pow(x, 2)\` hoặc \`x**2\` cho lũy thừa.
      - Sử dụng \`Math.log(x)\` cho lôgarit tự nhiên (ln). Nếu là lôgarit cơ số a, dùng \`Math.log(x)/Math.log(a)\`.
      - Sử dụng \`Math.exp(x)\` cho $e^x$.
      - Ví dụ hàm bậc 2: \`"x**2 - 2*x + 1"\`
      - Ví dụ hàm phân thức: \`"(2*x + 1) / (x - 1)"\`
      - Ví dụ hàm mũ: \`"2**x"\` hoặc \`"Math.pow(2, x)"\`
      - Ví dụ hàm logarit: \`"Math.log(x) / Math.log(2)"\`
  - Luôn sử dụng \`\\ne\` cho dấu "khác" (ví dụ: $a \\ne 1$).
  - Phân số: \\dfrac{}{} cho công thức chính.
  - QUY TẮC ESCAPE TRONG JSON: Vì kết quả trả về là JSON, bạn PHẢI sử dụng hai dấu gạch chéo ngược \`\\\\\` để biểu diễn một dấu gạch chéo ngược trong LaTeX. Ví dụ: viết \`"\\\\dfrac{1}{2}"\` thay vì \`"\\dfrac{1}{2}"\`. Điều này cực kỳ quan trọng để không bị mất lệnh LaTeX khi parse JSON. Đặc biệt với \`\\hline\`, phải viết là \`\\\\hline\`. Đặc biệt với \`\\infty\`, phải viết là \`\\\\infty\`.

  QUY TẮC ĐÁP ÁN ĐÚNG (CỰC KỲ QUAN TRỌNG):
  1. PHÂN BỔ ĐỒNG ĐỀU: Trong 20 câu, số lượng đáp án đúng cho mỗi vị trí (0:A, 1:B, 2:C, 3:D) phải xấp xỉ nhau (mỗi loại khoảng 4-6 câu).
  2. TRÁNH TRÙNG LẶP LIÊN TIẾP: KHÔNG ĐƯỢC phép có quá 2 câu hỏi liên tiếp có cùng một chỉ số đáp án đúng.
  3. TÍNH NGẪU NHIÊN: Đảm bảo thứ tự đáp án đúng trông tự nhiên.

  CẤU TRÚC JSON (BẮT BUỘC):
  - id: integer (từ 1 đến 20)
  - question: string
  - options: string[] (mảng 4 phần tử, mỗi phần tử là một chuỗi chứa đáp án, KHÔNG ĐƯỢC để trống)
  - correctAnswerIndex: integer (0 đến 3)
  - explanation: string
  - graphData: object (đối tượng chứa thông tin đồ thị, để null nếu không cần đồ thị)
    + type: string ("polynomial", "exponential", "logarithmic", "rational")
    + expression: string (nếu có 1 đồ thị)
    + expressions: string[] (nếu có nhiều đồ thị)
    + labels: string[] (nếu có nhiều đồ thị, cung cấp tên/nhãn cho từng đồ thị tương ứng, ví dụ: ["y = a^x", "y = b^x"])

  QUY TẮC ĐÁP ÁN:
  - Mỗi phần tử trong mảng "options" phải chứa nội dung đáp án cụ thể (ví dụ: "$1$", "$2$", "Hàm số đồng biến",...). TUYỆT ĐỐI KHÔNG để trống hoặc chỉ để dấu cách.

  QUY TẮC ÉP BUỘC ĐỒ THỊ & MÔ TẢ:
  - BẮT BUỘC: Ít nhất 30% số câu hỏi trong bộ đề (khoảng 6 câu) phải có đồ thị nếu phạm vi kiến thức cho phép (ví dụ: khảo sát hàm số, hình học).
  - Nếu trường "graphData" có nội dung, thì trong trường "question" PHẢI có câu dẫn "Cho đồ thị như hình vẽ:" và trong trường "explanation" PHẢI có đoạn mô tả đặc điểm đồ thị để giải thích đáp án.
  - TUYỆT ĐỐI KHÔNG được để trường "graphData" trống nếu câu hỏi có nhắc đến "hình vẽ" hoặc "đồ thị".
  - Mô tả đồ thị trong phần giải thích phải chi tiết: tọa độ điểm, tiệm cận, tính đơn điệu thể hiện trên hình.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.INTEGER },
              question: { type: Type.STRING },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                minItems: 4,
                maxItems: 4
              },
              correctAnswerIndex: { type: Type.INTEGER },
              explanation: { type: Type.STRING }
            },
            required: ["id", "question", "options", "correctAnswerIndex", "explanation"]
          }
        }
      }
    });

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw new Error("Có lỗi khi tạo bộ đề. Vui lòng thử lại sau.");
  }
};