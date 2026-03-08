import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { Question } from '../types';

interface QuizCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswer: number;
  onSelect?: (index: number) => void;
  reviewMode?: boolean;
}

const getSGKHtml = (text: string) => {
  if (!text) return { __html: '' };

  // Tự động bọc các phép tính cơ bản nếu AI quên dấu $ $
  // Tìm các cụm số và ký hiệu toán học phổ biến để bọc lại
  let processedText = text;
  if (!processedText.includes('$')) {
    // Bọc các phép tính số học: 3 \times 4, 10 \div 2, 5 = 5, 3 < 4, 5 > 2
    processedText = processedText.replace(/(\d+)\s*(\\times|\\div|\\pm|\\mp|=|<|>)\s*(\d+)/g, '$$$1 $2 $3$$');
    // Bọc các phân số: \dfrac{1}{2}
    processedText = processedText.replace(/(\\dfrac\{[^{}]*\}\{[^{}]*\})/g, '$$$1$$');
    // Bọc riêng lẻ các ký hiệu nếu vẫn còn sót (đảm bảo có khoảng trắng xung quanh hoặc ở biên)
    processedText = processedText.replace(/(^|\s)(\\times|\\div|\\pm|\\mp)(\s|$)/g, '$1$$$2$$$3');
  }

  const mathBlocks: string[] = [];
  const protectedText = processedText.replace(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g, (match) => {
    mathBlocks.push(match);
    return `MATHVNTOKEN${mathBlocks.length - 1}ENDTOKEN`;
  });

  // Thoát các ký tự < và > để tránh bị marked hiểu nhầm là thẻ HTML
  const escapedText = protectedText.replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Bảo vệ các dấu gạch chéo ngược khỏi marked
  const finalProtectedText = escapedText.replace(/\\/g, 'MATHVNSLASH');

  let html = '';
  try {
    if ((window as any).marked) {
      const parsed = (window as any).marked.parse(finalProtectedText);
      html = typeof parsed === 'string' ? parsed : parsed.content || '';
    } else {
      html = finalProtectedText;
    }
  } catch (e) { html = finalProtectedText; }

  // Khôi phục dấu gạch chéo và math blocks
  html = html.replace(/MATHVNSLASH/g, '\\');
  html = html.replace(/MATHVNTOKEN(\d+)ENDTOKEN/g, (_: string, index: string) => mathBlocks[parseInt(index)]);
  return { __html: html };
};

const MathContent = React.memo(({ content, className = "" }: { content: string, className?: string }) => {
  const html = useMemo(() => getSGKHtml(content), [content]);
  return <div className={`quiz-text-content ${className}`} dangerouslySetInnerHTML={html} />;
});

const QuizCard: React.FC<QuizCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onSelect,
  reviewMode = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const performMathJax = useCallback(() => {
    const mj = (window as any).MathJax;
    if (mj && mj.typesetPromise && containerRef.current) {
      mj.typesetClear([containerRef.current]);
      mj.typesetPromise([containerRef.current]).catch(() => {});
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(performMathJax, 50);
    return () => clearTimeout(timer);
  }, [question.id, reviewMode, performMathJax]);

  const getOptionLabel = (idx: number) => String.fromCharCode(65 + idx);

  const getOptionStyles = (idx: number) => {
    if (!reviewMode) {
      return selectedAnswer === idx
        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 shadow-lg scale-[1.02]'
        : 'border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 hover:bg-slate-50 dark:hover:bg-slate-800/40';
    }
    const isCorrect = idx === question.correctAnswerIndex;
    const isUserChoice = idx === selectedAnswer;
    if (isCorrect) return 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 ring-2 ring-emerald-500/20';
    if (isUserChoice && !isCorrect) return 'border-rose-500 bg-rose-50 dark:bg-rose-900/20';
    return 'border-slate-100 dark:border-slate-800 opacity-60';
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fadeIn tex2jax_process" ref={containerRef}>
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="bg-slate-50 dark:bg-slate-800/50 px-8 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Trắc nghiệm trần minh</span>
            <span className="text-xl font-black text-slate-800 dark:text-slate-100">
              {currentIndex + 1} <span className="text-slate-400 text-sm font-normal">/ {totalQuestions}</span>
            </span>
          </div>
          <div className="flex gap-1.5">
            {[...Array(totalQuestions)].map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === currentIndex ? 'bg-indigo-600 w-8' : i < currentIndex ? 'bg-indigo-300 w-2' : 'bg-slate-200 w-2'}`} />
            ))}
          </div>
        </div>

        <div className="p-8 md:p-10">
          <MathContent content={question.question} className="text-xl md:text-2xl font-medium text-slate-800 dark:text-slate-100 mb-10 leading-relaxed markdown-content" />

          <div className="grid grid-cols-1 gap-4">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                disabled={reviewMode}
                onClick={() => onSelect && onSelect(idx)}
                className={`flex items-center w-full p-5 rounded-2xl border-2 transition-all duration-300 text-left group ${getOptionStyles(idx)}`}
              >
                <span className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center font-black text-lg mr-5 bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                  {getOptionLabel(idx)}
                </span>
                <MathContent content={option} className="text-lg md:text-xl flex-grow markdown-content" />
              </button>
            ))}
          </div>

          {reviewMode && (
            <div className="mt-10 bg-indigo-50/50 dark:bg-indigo-900/10 p-8 rounded-[1.5rem] border border-indigo-100 dark:border-indigo-900/20 animate-slideUp">
              <div className="flex items-center gap-2 text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase mb-4 tracking-widest">
                <i className="fa-solid fa-wand-magic-sparkles"></i> Lời giải chi tiết
              </div>
              <MathContent content={question.explanation} className="text-slate-700 dark:text-slate-300 leading-relaxed italic markdown-content text-lg" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizCard;