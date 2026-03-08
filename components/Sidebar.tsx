import React from 'react';
import { QuizSession } from '../types';

interface SidebarProps {
  sessions: QuizSession[];
  onNewTest: () => void;
  onLoadSession: (session: QuizSession) => void;
  onDeleteSession?: (id: string) => void;
   collapsed?: boolean;
   onToggleCollapse?: () => void;
  isDark: boolean;
  visible?: boolean;
}

const STORAGE_KEY = 'ai-quiz-sessions';
const MAX_SESSIONS = 50;

export function loadSessions(): QuizSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveSession(session: Omit<QuizSession, 'id' | 'scorePercent'>): void {
  const sessions = loadSessions();
  const scorePercent = Math.round(
    (session.userAnswers.filter((a, i) => a === session.questions[i].correctAnswerIndex).length /
      session.questions.length) *
      100
  );
  const newSession: QuizSession = {
    ...session,
    id: Date.now().toString(),
    scorePercent,
  };
  const updated = [newSession, ...sessions].slice(0, MAX_SESSIONS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function deleteSession(id: string): void {
  const sessions = loadSessions().filter((s) => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

const formatDate = (iso: string) => {
  try {
    const d = new Date(iso);
    return d.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
};

const Sidebar: React.FC<SidebarProps> = ({
  sessions,
  onNewTest,
  onLoadSession,
  onDeleteSession,
  collapsed = false,
  onToggleCollapse,
  isDark,
  visible = true,
}) => {
  if (!visible) return null;

  return (
    <aside
      className={`relative shrink-0 flex flex-col border-r border-slate-200 dark:border-slate-800 ${
        collapsed ? 'w-10' : 'w-64'
      } ${isDark ? 'bg-slate-900/50' : 'bg-slate-50/80'}`}
    >
      {onToggleCollapse && (
        <button
          type="button"
          onClick={onToggleCollapse}
          className="absolute -right-3 top-4 w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-300 shadow-md"
        >
          <i className={`fa-solid ${collapsed ? 'fa-chevron-right' : 'fa-chevron-left'} text-xs`}></i>
        </button>
      )}

      {!collapsed && (
        <>
          <div className="p-4 border-b border-slate-200 dark:border-slate-800">
            <button
              onClick={onNewTest}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
            >
              <i className="fa-solid fa-plus"></i>
              New Test
            </button>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
              Lịch sử bài thi
            </div>
            {sessions.length === 0 ? (
              <p className="text-sm text-slate-500 dark:text-slate-400 italic">Chưa có bài nào</p>
            ) : (
              <ul className="space-y-2">
                {sessions.map((s) => (
                  <li key={s.id} className="group relative">
                    <button
                      onClick={() => onLoadSession(s)}
                      className={`w-full text-left p-3 pr-10 rounded-xl border transition-all hover:shadow-md ${
                        isDark
                          ? 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                          : 'bg-white border-slate-200 hover:border-indigo-200'
                      }`}
                    >
                      <div className="font-semibold text-slate-800 dark:text-slate-100 text-sm truncate">
                        {s.subject} – {s.scope}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                        {s.studentName} · Lớp {s.grade}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[10px] text-slate-400">{formatDate(s.endTime)}</span>
                        <span
                          className={`text-xs font-bold ${
                            s.scorePercent >= 80
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : s.scorePercent >= 50
                                ? 'text-amber-600 dark:text-amber-400'
                                : 'text-rose-600 dark:text-rose-400'
                          }`}
                        >
                          {s.scorePercent}%
                        </span>
                      </div>
                    </button>
                    {onDeleteSession && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteSession(s.id);
                        }}
                        title="Xóa"
                        className="absolute top-3 right-2 w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                      >
                        <i className="fa-solid fa-xmark text-sm"></i>
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
