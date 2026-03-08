
import React, { useState, useEffect } from 'react';
import { KET_NOI_TRI_THUC, LessonData } from '../src/data/curriculum';

interface QuizSetupProps {
  onStart: (subject: string, scope: string, grade: string, studentName: string) => void;
  isLoading: boolean;
}

const QuizSetup: React.FC<QuizSetupProps> = ({ onStart, isLoading }) => {
  const [subject, setSubject] = useState('');
  const [mode, setMode] = useState<'topic' | 'lesson'>('topic');
  const [topic, setTopic] = useState('');
  const [chapter, setChapter] = useState('');
  const [lesson, setLesson] = useState('');
  const [grade, setGrade] = useState('');
  const [studentName, setStudentName] = useState('');

  // Tải tên học sinh từ localStorage khi component mount
  useEffect(() => {
    const savedName = localStorage.getItem('ai_quiz_student_name');
    if (savedName) {
      setStudentName(savedName);
    }
  }, []);

  // Lưu tên học sinh vào localStorage khi thay đổi
  useEffect(() => {
    if (studentName) {
      localStorage.setItem('ai_quiz_student_name', studentName);
    }
  }, [studentName]);

  const [availableChapters, setAvailableChapters] = useState<LessonData[]>([]);
  const [availableLessons, setAvailableLessons] = useState<string[]>([]);

  // Cập nhật danh sách chương khi môn học hoặc khối lớp thay đổi
  useEffect(() => {
    if (subject && grade && KET_NOI_TRI_THUC[subject] && KET_NOI_TRI_THUC[subject][grade]) {
      setAvailableChapters(KET_NOI_TRI_THUC[subject][grade]);
      setChapter('');
      setLesson('');
    } else {
      setAvailableChapters([]);
    }
  }, [subject, grade]);

  // Cập nhật danh sách bài học khi chương thay đổi
  useEffect(() => {
    const selectedChapterData = availableChapters.find(c => c.chapter === chapter);
    if (selectedChapterData) {
      setAvailableLessons(selectedChapterData.lessons);
      setLesson('');
    } else {
      setAvailableLessons([]);
    }
  }, [chapter, availableChapters]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subject && grade && studentName) {
      let scope = '';
      if (mode === 'topic' && topic) {
        scope = `Chủ đề: ${topic}`;
      } else if (mode === 'lesson' && chapter && lesson) {
        scope = `${chapter} - ${lesson}`;
      }

      if (scope) {
        onStart(subject, scope, grade, studentName);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 border border-slate-100 dark:border-slate-800 transition-all">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl mb-4 transition-colors">
          <i className="fa-solid fa-brain text-3xl text-indigo-600 dark:text-indigo-400"></i>
        </div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">AI Quiz Master - Cấp 1</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Dành riêng cho học sinh Tiểu học (Lớp 1 - 5)</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Họ và tên học sinh</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Nhập tên của bạn..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Môn học</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all appearance-none"
            required
            disabled={isLoading}
          >
            <option value="" className="dark:bg-slate-900">Chọn môn học...</option>
            <option value="Toán học" className="dark:bg-slate-900">Toán học</option>
            <option value="Tiếng Việt" className="dark:bg-slate-900">Tiếng Việt</option>
            <option value="Tự nhiên và Xã hội" className="dark:bg-slate-900">Tự nhiên và Xã hội (Lớp 1-3)</option>
            <option value="Khoa học" className="dark:bg-slate-900">Khoa học (Lớp 4-5)</option>
            <option value="Lịch sử và Địa lý" className="dark:bg-slate-900">Lịch sử và Địa lý (Lớp 4-5)</option>
            <option value="Đạo đức" className="dark:bg-slate-900">Đạo đức</option>
            <option value="Tin học" className="dark:bg-slate-900">Tin học (Lớp 3-5)</option>
            <option value="Công nghệ" className="dark:bg-slate-900">Công nghệ (Lớp 3-5)</option>
            <option value="Tiếng Anh" className="dark:bg-slate-900">Tiếng Anh</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Lớp / Khối</label>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all appearance-none"
            required
            disabled={isLoading}
          >
            <option value="" className="dark:bg-slate-900">Chọn khối lớp...</option>
            {[...Array(5)].map((_, i) => (
              <option key={i + 1} value={`${i + 1}`} className="dark:bg-slate-900">Lớp {i + 1}</option>
            ))}
          </select>
        </div>

        <div className="pt-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Chế độ ra đề</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMode('topic')}
              className={`py-3 rounded-xl border-2 font-bold transition-all ${
                mode === 'topic'
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                  : 'border-slate-100 dark:border-slate-800 text-slate-400'
              }`}
            >
              Theo chủ đề
            </button>
            <button
              type="button"
              onClick={() => setMode('lesson')}
              className={`py-3 rounded-xl border-2 font-bold transition-all ${
                mode === 'lesson'
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                  : 'border-slate-100 dark:border-slate-800 text-slate-400'
              }`}
            >
              Theo bài học
            </button>
          </div>
        </div>

        {mode === 'topic' ? (
          <div className="animate-fadeIn">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Tên chủ đề</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ví dụ: Hình học không gian, Hóa vô cơ..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              required
              disabled={isLoading}
            />
          </div>
        ) : (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Chương</label>
              {availableChapters.length > 0 ? (
                <select
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all appearance-none"
                  required
                  disabled={isLoading}
                >
                  <option value="" className="dark:bg-slate-900">Chọn chương...</option>
                  {availableChapters.map((c, i) => (
                    <option key={i} value={c.chapter} className="dark:bg-slate-900">{c.chapter}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                  placeholder="Ví dụ: Chương 1: Đạo hàm"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  required
                  disabled={isLoading}
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Bài học</label>
              {availableLessons.length > 0 ? (
                <select
                  value={lesson}
                  onChange={(e) => setLesson(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all appearance-none"
                  required
                  disabled={isLoading}
                >
                  <option value="" className="dark:bg-slate-900">Chọn bài học...</option>
                  {availableLessons.map((l, i) => (
                    <option key={i} value={l} className="dark:bg-slate-900">{l}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={lesson}
                  onChange={(e) => setLesson(e.target.value)}
                  placeholder="Ví dụ: Bài 1: Định nghĩa đạo hàm"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  required
                  disabled={isLoading}
                />
              )}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
            isLoading 
              ? 'bg-slate-400 dark:bg-slate-700 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-indigo-500/20'
          }`}
        >
          {isLoading ? (
            <>
              <i className="fa-solid fa-circle-notch animate-spin"></i>
              Đang biên soạn...
            </>
          ) : (
            <>
              <i className="fa-solid fa-bolt"></i>
              Bắt đầu làm bài
            </>
          )}
        </button>
      </form>
      
      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs text-center text-slate-400 dark:text-slate-600 uppercase tracking-widest font-bold">
        Hệ thống hỗ trợ LaTeX chuẩn SGK
      </div>
    </div>
  );
};

export default QuizSetup;
