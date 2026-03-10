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

export const generateQuizQuestions = async (subject: string, scope: string, grade: string): Promise<Question[]> => {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error("Chưa có GEMINI_API_KEY. Hãy bấm nút hình chìa khóa để nhập API key.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const prompt = `Bạn là chuyên gia biên soạn đề thi trắc nghiệm chuẩn SGK Việt Nam cho môn "${subject}" lớp ${grade}, phạm vi kiến thức: "${scope}".
  Hãy tạo đúng 20 câu hỏi trắc nghiệm khách quan với 4 lựa chọn (A, B, C, D) theo cấu trúc ma trận sau:

  PHÂN BỔ ĐỘ KHÓ (BẮT BUỘC):
  1. 5 câu NHẬN BIẾT.
  2. 7 câu THÔNG HIỂU.
  3. 5 câu VẬN DỤNG.
  4. 3 câu VẬN DỤNG CAO.

  QUY TẮC ĐÁP ÁN ĐÚNG (CỰC KỲ QUAN TRỌNG):
  1. PHÂN BỔ ĐỒNG ĐỀU: Trong 20 câu, số lượng đáp án đúng cho mỗi vị trí (0:A, 1:B, 2:C, 3:D) phải xấp xỉ nhau (mỗi loại khoảng 4-6 câu). KHÔNG ĐƯỢC tập trung quá nhiều vào một đáp án.
  2. TRÁNH TRÙNG LẶP LIÊN TIẾP: KHÔNG ĐƯỢC phép có quá 2 câu hỏi liên tiếp có cùng một chỉ số đáp án đúng. Ví dụ: Nếu câu 1 và câu 2 là đáp án A (index 0), thì câu 3 BẮT BUỘC phải là đáp án khác (B, C hoặc D).
  3. TÍNH NGẪU NHIÊN: Đảm bảo thứ tự đáp án đúng trông tự nhiên và khó đoán như một đề thi chính thức.

  YÊU CẦU VỀ ĐÁP ÁN NHIỄU (DISTRACTORS):
  - Các đáp án nhiễu phải logic, dựa trên các lỗi sai thường gặp của học sinh.

  YÊU CẦU VỀ NỘI DUNG TOÁN HỌC:
  - Với các câu hỏi SO SÁNH (ví dụ: so sánh hai số, hai biểu thức), các lựa chọn BẮT BUỘC phải bao gồm đầy đủ các dấu: ">", "<", "=".
  - Các ký hiệu so sánh này PHẢI được đặt trong cặp dấu $ $ (ví dụ: "$ > $", "$ < $", "$ = $").
  - Với các câu hỏi yêu cầu điền vào chỗ chấm (dấu ba chấm ...), hãy viết đề bài rõ ràng là: "Điền số hoặc dấu thích hợp vào chỗ chấm:" (ví dụ: "Điền số hoặc dấu thích hợp vào chỗ chấm: $45 + ... = 49$").

  YÊU CẦU TRÌNH BÀY LATEX (BẮT BUỘC - QUAN TRỌNG NHẤT):
  - MỌI biểu thức toán học, ký hiệu toán học (như +, -, \times, \div, =, <, >, \dfrac, \sqrt, ...), và các con số nằm trong phép tính BẮT BUỘC phải được bọc trong cặp dấu $ $.
  - Ví dụ SAI: 3 \times 4 = 12 hoặc 5 > 3.
  - Ví dụ ĐÚNG: $3 \times 4 = 12$ hoặc $5 > 3$.
  - Với phân số, luôn dùng \dfrac{}{} và bọc trong $ $. Ví dụ: $\dfrac{1}{2}$.
  - Đảm bảo thoát dấu gạch chéo ngược trong chuỗi JSON: Sử dụng "\\" cho mỗi dấu gạch chéo (ví dụ: "\\times", "\\dfrac").
  - Nếu không có dấu $ $, các ký hiệu như \times sẽ bị hiển thị lỗi hoặc dính chữ.
  - Sử dụng $$ $$ cho các công thức cần hiển thị ở dòng riêng biệt (nếu cần).

  CẤU TRÚC JSON (BẮT BUỘC):
  - id: integer (từ 1 đến 20)
  - question: string
  - options: string[] (mảng 4 phần tử)
  - correctAnswerIndex: integer (0 đến 3)
  - explanation: string`;

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