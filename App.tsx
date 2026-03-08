
import React, { useState, useEffect, useRef } from 'react';
import QuizSetup from './components/QuizSetup';
import QuizCard from './components/QuizCard';
import QuizResults from './components/QuizResults';
import Sidebar, { loadSessions, saveSession, deleteSession } from './components/Sidebar';
import { generateQuizQuestions } from './geminiService';
import { Question, AppStatus, QuizSession } from './types';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.SETUP);
  const [subject, setSubject] = useState('');
  const [scope, setScope] = useState('');
  const [grade, setGrade] = useState('');
  const [studentName, setStudentName] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [sessions, setSessions] = useState<QuizSession[]>(() => loadSessions());
  
  const autoNextRef = useRef<number | null>(null);
  const prevStatusRef = useRef<AppStatus | null>(null);

  // Kiểm tra tham số fullscreen từ URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'fullscreen') {
      setIsFullScreen(true);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(`Error attempting to enable full-screen mode: ${e.message}`);
      });
    }
  };

  const startQuiz = async (sub: string, scp: string, gr: string, name: string) => {
    // Kích hoạt fullscreen ngay khi người dùng nhấn nút bắt đầu (cần user gesture)
    if (isFullScreen || status === AppStatus.SETUP) {
      toggleFullScreen();
    }
    
    setSubject(sub);
    setScope(scp);
    setGrade(gr);
    setStudentName(name);
    setIsLoading(true);
    setError(null);
    setStatus(AppStatus.LOADING);

    try {
      const generatedQuestions = await generateQuizQuestions(sub, scp, gr);
      setQuestions(generatedQuestions);
      setUserAnswers(new Array(generatedQuestions.length).fill(-1));
      setCurrentIdx(0);
      setStartTime(new Date());
      setStatus(AppStatus.QUIZ);
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra khi tạo đề.");
      setStatus(AppStatus.SETUP);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (autoNextRef.current) {
      window.clearTimeout(autoNextRef.current);
      autoNextRef.current = null;
    }
    
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setEndTime(new Date());
      setStatus(AppStatus.RESULTS);
    }
  };

  const handleSelectAnswer = (idx: number) => {
    const updated = [...userAnswers];
    updated[currentIdx] = idx;
    setUserAnswers(updated);

    if (autoNextRef.current) {
      window.clearTimeout(autoNextRef.current);
    }

    autoNextRef.current = window.setTimeout(() => {
      handleNext();
    }, 600);
  };

  const handleBack = () => {
    if (autoNextRef.current) {
      window.clearTimeout(autoNextRef.current);
      autoNextRef.current = null;
    }
    
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    }
  };

  const goToResults = () => {
    if (!endTime) setEndTime(new Date());
    setStatus(AppStatus.RESULTS);
  };

  const startReview = () => {
    setCurrentIdx(0);
    setStatus(AppStatus.REVIEW);
  };

  const reset = () => {
    setQuestions([]);
    setCurrentIdx(0);
    setUserAnswers([]);
    setStartTime(null);
    setEndTime(null);
    setStatus(AppStatus.SETUP);
    setError(null);
  };

  // Lưu phiên chỉ khi vừa hoàn thành bài (QUIZ → RESULTS), không lưu khi load từ history
  useEffect(() => {
    if (status === AppStatus.RESULTS && questions.length > 0 && startTime && endTime) {
      if (prevStatusRef.current === AppStatus.QUIZ) {
        saveSession({
          subject,
          scope,
          grade,
          studentName,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          questions,
          userAnswers,
        });
        setSessions(loadSessions());
      }
      prevStatusRef.current = status;
    } else {
      prevStatusRef.current = status;
    }
  }, [status, questions, userAnswers, subject, scope, grade, studentName, startTime, endTime]);

  const handleLoadSession = (session: QuizSession) => {
    setSubject(session.subject);
    setScope(session.scope);
    setGrade(session.grade);
    setStudentName(session.studentName);
    setQuestions(session.questions);
    setUserAnswers(session.userAnswers);
    setCurrentIdx(0);
    setStartTime(new Date(session.startTime));
    setEndTime(new Date(session.endTime));
    setStatus(AppStatus.RESULTS);
  };

  // Ẩn Header trong chế độ Quiz nếu là Fullscreen để tối đa không gian
  const shouldHideHeader = (status === AppStatus.QUIZ || status === AppStatus.LOADING) && document.fullscreenElement;

  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      {!shouldHideHeader && (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-4 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <i className="fa-solid fa-graduation-cap text-white text-lg"></i>
            </div>
            <div>
              <h1 className="font-bold text-slate-800 dark:text-slate-100 text-lg hidden sm:block">AI Quiz Master</h1>
              <p className="text-slate-400 dark:text-indigo-400 text-xs font-bold">{studentName || 'Phát triển bởi Trần Minh'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {(status === AppStatus.QUIZ || status === AppStatus.REVIEW) && (
              <div className="text-right mr-4">
                <div className="text-xs text-slate-400 uppercase font-bold">{status === AppStatus.REVIEW ? 'Xem lại' : 'Tiến độ'}</div>
                <div className="text-indigo-600 dark:text-indigo-400 font-black">
                  {Math.round(((currentIdx + 1) / (questions.length || 1)) * 100)}%
                </div>
              </div>
            )}
            <button onClick={toggleFullScreen} title="Toàn màn hình" className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              <i className="fa-solid fa-expand"></i>
            </button>
            <button onClick={() => setIsDark(!isDark)} className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              <i className={`fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
          </div>
        </header>
      )}

      <div className={`flex flex-1 min-h-0 ${shouldHideHeader ? '' : ''}`}>
        {!shouldHideHeader && (
          <Sidebar
            sessions={sessions}
            onNewTest={reset}
            onLoadSession={handleLoadSession}
            onDeleteSession={(id) => {
              deleteSession(id);
              setSessions(loadSessions());
            }}
            isDark={isDark}
            visible={true}
          />
        )}
        <main className={`flex-1 min-w-0 overflow-y-auto container mx-auto px-4 max-w-5xl py-4 ${shouldHideHeader ? 'mt-4' : 'mt-8'}`}>
        {error && (
          <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-400 rounded-xl flex items-center gap-3 animate-shake">
            <i className="fa-solid fa-triangle-exclamation"></i>
            {error}
          </div>
        )}

        {status === AppStatus.SETUP && <QuizSetup onStart={startQuiz} isLoading={isLoading} />}

        {status === AppStatus.LOADING && (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-fadeIn">
            <div className="relative">
              <div className="w-24 h-24 border-8 border-indigo-100 dark:border-slate-800 border-t-indigo-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fa-solid fa-wand-magic-sparkles text-2xl text-indigo-600 animate-pulse"></i>
              </div>
            </div>
            <h2 className="mt-8 text-2xl font-bold text-slate-800 dark:text-slate-100">Đang biên soạn đề cho {studentName}...</h2>
          </div>
        )}

        {status === AppStatus.QUIZ && questions.length > 0 && (
          <div className="space-y-8 pb-10">
            <QuizCard
              question={questions[currentIdx]}
              currentIndex={currentIdx}
              totalQuestions={questions.length}
              selectedAnswer={userAnswers[currentIdx]}
              onSelect={handleSelectAnswer}
            />
            <div className="flex justify-between items-center max-w-2xl mx-auto px-2">
              <button onClick={handleBack} disabled={currentIdx === 0} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold ${currentIdx === 0 ? 'text-slate-300 dark:text-slate-700' : 'text-slate-600 dark:text-slate-400'}`}>
                <i className="fa-solid fa-arrow-left"></i> Quay lại
              </button>
              <button 
                onClick={handleNext} 
                disabled={userAnswers[currentIdx] === -1}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all shadow-lg ${
                  userAnswers[currentIdx] === -1 
                  ? 'bg-slate-300 dark:bg-slate-800 text-white cursor-not-allowed' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 shadow-indigo-500/20'
                }`}
              >
                {currentIdx === questions.length - 1 ? 'Nộp bài' : 'Câu tiếp theo'} <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        )}

        {status === AppStatus.REVIEW && questions.length > 0 && (
          <div className="space-y-8 pb-10">
            <QuizCard
              question={questions[currentIdx]}
              currentIndex={currentIdx}
              totalQuestions={questions.length}
              selectedAnswer={userAnswers[currentIdx]}
              reviewMode={true}
            />
            <div className="flex justify-between items-center max-w-2xl mx-auto px-2">
              <button onClick={handleBack} disabled={currentIdx === 0} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-600 dark:text-slate-400">
                <i className="fa-solid fa-arrow-left"></i> Câu trước
              </button>
              <div className="flex gap-3">
                <button onClick={goToResults} className="px-6 py-3 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-bold">Điểm số</button>
                <button onClick={handleNext} className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold shadow-lg bg-indigo-600 text-white hover:bg-indigo-700">
                  {currentIdx === questions.length - 1 ? 'Xong' : 'Câu tiếp'} <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        )}

        {status === AppStatus.RESULTS && (
          <QuizResults 
            questions={questions} 
            userAnswers={userAnswers} 
            subject={subject} 
            lesson={scope}
            grade={grade}
            studentName={studentName}
            startTime={startTime}
            endTime={endTime}
            onRestart={reset} 
            onReview={startReview} 
          />
        )}
        </main>
      </div>

      {!shouldHideHeader && (
        <footer className="mt-12 py-8 border-t border-slate-100 dark:border-slate-800 text-center">
          <div className="text-slate-400 dark:text-slate-600 text-sm font-medium">
            &copy; 2026 AI Quiz Master. Thiết kế bởi <span className="text-indigo-600 dark:text-indigo-400 font-bold">Trần Minh</span>.
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
