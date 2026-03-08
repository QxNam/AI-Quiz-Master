
import React, { useState, useEffect, useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import { Question } from '../types';

interface QuizResultsProps {
  questions: Question[];
  userAnswers: number[];
  subject: string;
  lesson: string;
  grade: string;
  studentName: string;
  startTime: Date | null;
  endTime: Date | null;
  onRestart: () => void;
  onReview: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ 
  questions, 
  userAnswers, 
  subject, 
  lesson,
  grade, 
  studentName, 
  startTime,
  endTime,
  onRestart, 
  onReview 
}) => {
  const [showReview, setShowReview] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const performMathJax = useCallback(() => {
    const mj = (window as any).MathJax;
    if (mj && mj.typesetPromise && containerRef.current) {
      mj.typesetClear([containerRef.current]);
      mj.typesetPromise([containerRef.current]).catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (showReview) {
      const timer = setTimeout(performMathJax, 150);
      return () => clearTimeout(timer);
    }
  }, [showReview, performMathJax]);

  const correctCount = userAnswers.reduce((count, answer, index) => {
    return answer === questions[index].correctAnswerIndex ? count + 1 : count;
  }, 0);

  const scorePercentage = Math.round((correctCount / questions.length) * 100);
  const getLabel = (idx: number) => String.fromCharCode(65 + idx);

  const getEncouragement = () => {
    if (scorePercentage >= 95) {
      return {
        title: `Xuất sắc quá, ${studentName}!`,
        message: "Con đã hoàn thành bài thi một cách hoàn hảo!",
        icon: "fa-solid fa-trophy text-yellow-500"
      };
    } else if (scorePercentage >= 80) {
      return {
        title: `Rất giỏi, ${studentName}!`,
        message: "Con đã làm rất tốt, hãy tiếp tục phát huy nhé!",
        icon: "fa-solid fa-star text-emerald-500"
      };
    } else if (scorePercentage >= 50) {
      return {
        title: `Cố lên nhé, ${studentName}!`,
        message: "Con đã rất cố gắng, ôn tập thêm một chút là sẽ đạt điểm cao thôi!",
        icon: "fa-solid fa-thumbs-up text-indigo-500"
      };
    } else {
      return {
        title: `Đừng buồn nhé, ${studentName}!`,
        message: "Thất bại là mẹ thành công, hãy xem lại bài và thử lại lần nữa nhé!",
        icon: "fa-solid fa-seedling text-rose-500"
      };
    }
  };

  const encouragement = getEncouragement();

  // Tạo link chia sẻ ở định dạng Full màn hình
  const getFullScrenLink = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}?mode=fullscreen`;
  };

  const formatDuration = (start: Date | null, end: Date | null) => {
    if (!start || !end) return 'Không xác định';
    const diffInSeconds = Math.floor((end.getTime() - start.getTime()) / 1000);
    const minutes = Math.floor(diffInSeconds / 60);
    const seconds = diffInSeconds % 60;
    return `${minutes} phút ${seconds} giây`;
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Không xác định';
    return date.toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getReportText = () => {
    return `BÁO CÁO KẾT QUẢ HỌC TẬP (AI QUIZ)
Học sinh: ${studentName}
Lớp: ${grade}
Môn học: ${subject}
Chủ đề: ${lesson}
Thời gian nộp bài: ${formatDate(endTime)}
Thời gian làm bài: ${formatDuration(startTime, endTime)}
Kết quả: ${scorePercentage}/100 điểm (${correctCount}/${questions.length} câu)
---------------------------
Thử sức ngay tại đây (Full màn hình):
${getFullScrenLink()}
---------------------------
(Gửi từ ứng dụng AI Quiz Master)`;
  };

  const handleSendEmail = () => {
    const mailtoLink = `mailto:?subject=Kết quả bài làm AI Quiz - ${studentName}&body=${encodeURIComponent(getReportText())}`;
    window.location.href = mailtoLink;
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Kết quả AI Quiz - ' + studentName,
      text: getReportText(),
      url: getFullScrenLink()
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share failed', err);
      }
    }
  };

  const handleCapture = async () => {
    if (!reportRef.current) return;
    setIsCapturing(true);
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        backgroundColor: document.documentElement.classList.contains('dark') ? '#0f172a' : '#ffffff',
        useCORS: true,
      });
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `Ket_qua_AI_Quiz_${studentName.replace(/\s+/g, '_')}.png`;
      link.click();
    } catch (err) {
      console.error('Lỗi khi chụp ảnh:', err);
      alert('Có lỗi xảy ra khi chụp ảnh báo cáo.');
    } finally {
      setIsCapturing(false);
    }
  };

  const renderSGKContent = (text: string) => {
    if (!text) return { __html: '' };
    const mathBlocks: string[] = [];
    const protectedText = text.replace(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g, (match) => {
      mathBlocks.push(match);
      return `MATHVNTOKEN${mathBlocks.length - 1}ENDTOKEN`;
    });
    let html = '';
    try {
      if ((window as any).marked) {
        const parsed = (window as any).marked.parse(protectedText);
        html = typeof parsed === 'string' ? parsed : parsed.content || '';
      } else { html = protectedText; }
    } catch (e) { html = protectedText; }
    html = html.replace(/MATHVNTOKEN(\d+)ENDTOKEN/g, (_: any, index: string) => mathBlocks[parseInt(index)]);
    return { __html: html };
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fadeIn tex2jax_process" ref={containerRef}>
      <div ref={reportRef} className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl p-8 md:p-12 text-center border border-slate-100 dark:border-slate-800">
        <div className="mb-6">
          <i className={`${encouragement.icon} text-6xl mb-4 drop-shadow-lg animate-bounce`}></i>
          <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">{encouragement.title}</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">{encouragement.message}</p>
        </div>
        <p className="text-indigo-600 dark:text-indigo-400 mb-10 uppercase tracking-[0.3em] text-sm font-black">{subject} - {lesson} - Lớp {grade}</p>
        
        <div className="flex justify-center mb-10">
          <div className="relative flex items-center justify-center w-48 h-48 shrink-0">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round"
                className="text-slate-100 dark:text-slate-800"
              />
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 45} strokeDashoffset={2 * Math.PI * 45 * (1 - scorePercentage / 100)}
                className="text-indigo-600 dark:text-indigo-500 transition-all duration-[1.5s]"
              />
            </svg>
            <div className="relative z-10 text-5xl font-black text-slate-800 dark:text-white">{scorePercentage}%</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-6">
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
            <div className="text-slate-400 font-bold uppercase text-[10px] mb-1">Câu đúng</div>
            <div className="text-2xl font-black text-emerald-500">{correctCount}</div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
            <div className="text-slate-400 font-bold uppercase text-[10px] mb-1">Câu sai</div>
            <div className="text-2xl font-black text-rose-500">{questions.length - correctCount}</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10 text-sm font-medium text-slate-600 dark:text-slate-400">
          <div className="flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-100 dark:border-slate-700/50">
            <i className="fa-regular fa-clock text-indigo-500"></i>
            <span>Thời gian: <strong className="text-slate-800 dark:text-slate-200">{formatDuration(startTime, endTime)}</strong></span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-100 dark:border-slate-700/50">
            <i className="fa-regular fa-calendar-check text-indigo-500"></i>
            <span>Nộp lúc: <strong className="text-slate-800 dark:text-slate-200">{formatDate(endTime)}</strong></span>
          </div>
        </div>

        <div className="mb-10 p-6 bg-indigo-50 dark:bg-indigo-900/10 rounded-3xl border border-indigo-100 dark:border-indigo-900/20">
          <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-300 mb-4 flex items-center justify-center gap-2">
            <i className="fa-solid fa-share-nodes"></i> Chia sẻ đề thi (Full màn hình)
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            <button 
              onClick={handleShare} 
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
            >
              <i className="fa-solid fa-link"></i> Chia sẻ link Full Screen
            </button>
            <button 
              onClick={handleCapture} 
              disabled={isCapturing}
              className={`flex items-center gap-2 px-6 py-3 border rounded-xl text-sm font-bold transition-all ${isCapturing ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
            >
              {isCapturing ? (
                <><i className="fa-solid fa-circle-notch animate-spin"></i> Đang chụp...</>
              ) : (
                <><i className="fa-solid fa-camera"></i> Chụp ảnh báo cáo</>
              )}
            </button>
          </div>
          <p className="mt-3 text-[10px] text-slate-400 italic">Ảnh chụp báo cáo giúp đảm bảo kết quả không bị chỉnh sửa</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={onRestart} className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/30">Làm đề mới</button>
          <button onClick={onReview} className="px-10 py-5 bg-slate-800 dark:bg-slate-700 text-white rounded-2xl font-black hover:bg-slate-900 transition-all">Review chi tiết</button>
          <button onClick={() => setShowReview(!showReview)} className="px-10 py-5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-black">
            {showReview ? 'Ẩn đáp án nhanh' : 'Xem đáp án nhanh'}
          </button>
        </div>
      </div>

      {showReview && (
        <div className="space-y-8 animate-slideUp pb-20">
          {questions.map((q, idx) => {
            const isRight = userAnswers[idx] === q.correctAnswerIndex;
            return (
              <div key={q.id} className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-2 h-full ${isRight ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                <div className="font-bold text-xl text-slate-800 dark:text-slate-100 mb-6 markdown-content quiz-text-content" 
                     dangerouslySetInnerHTML={renderSGKContent(`**Câu ${idx + 1}:** ${q.question}`)} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className={`p-4 rounded-xl border ${isRight ? 'border-emerald-200 bg-emerald-50 dark:bg-emerald-900/10' : 'border-rose-200 bg-rose-50 dark:bg-rose-900/10'}`}>
                    <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Lựa chọn của bạn:</span>
                    <span className={`text-lg font-bold ${isRight ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
                      {userAnswers[idx] !== -1 ? `${getLabel(userAnswers[idx])}. ${q.options[userAnswers[idx]]}` : "(Chưa chọn)"}
                    </span>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                    <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Đáp án đúng:</span>
                    <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                      {getLabel(q.correctAnswerIndex)}. {q.options[q.correctAnswerIndex]}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-base border-t border-slate-100 dark:border-slate-700/50 italic markdown-content quiz-text-content"
                     dangerouslySetInnerHTML={renderSGKContent(`**Hướng dẫn giải:** ${q.explanation}`)} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuizResults;
