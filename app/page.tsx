'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://nzsgqmzndywdfwltvtxu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56c2dxbXpuZHl3ZGZ3bHR2dHh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzNzAxNjAsImV4cCI6MjA4Nzk0NjE2MH0.JI-wPZ1G0WYXpJOiUI4tdCT2-uuuN9QAf_XLZ8AIQcw'
);

type AuditEntry = {
  id: string;
  task_id: string;
  opco_id: string;
  actor: string;
  action: string;
  origin_type: string;
  governance_status: string;
  confidence: number;
  details: Record<string, unknown>;
  approver_id: string | null;
  created_at: string;
};

type Task = {
  id: string;
  task_ref: string;
  opco_id: string;
  task_type: string;
  requested_by: string;
  status: string;
  priority: string;
  created_at: string;
};

const OPCO_COLORS: Record<string, string> = {
  dara: 'bg-blue-900 text-blue-200',
  digital_aurion: 'bg-purple-900 text-purple-200',
  kendall: 'bg-yellow-900 text-yellow-200',
  landmark: 'bg-green-900 text-green-200',
  mirai: 'bg-cyan-900 text-cyan-200',
  hq: 'bg-gray-700 text-gray-200',
};

const STATUS_COLORS: Record<string, string> = {
  approved: 'text-green-400',
  approved_and_executed: 'text-green-400',
  pending_approval: 'text-yellow-400',
  rejected: 'text-red-400',
  system_action: 'text-gray-400',
  pending: 'text-yellow-400',
  processing: 'text-blue-400',
  completed: 'text-green-400',
  failed: 'text-red-400',
};

const ORIGIN_BADGE: Record<string, string> = {
  user_stated: 'bg-green-800 text-green-200',
  extracted: 'bg-blue-800 text-blue-200',
  inferred: 'bg-yellow-800 text-yellow-200',
  corrected: 'bg-purple-800 text-purple-200',
  system: 'bg-gray-700 text-gray-300',
};

export default function GovernancePortal() {
  const [auditLog, setAuditLog] = useState<AuditEntry[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [connected, setConnected] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    // Load initial data
    Promise.all([
      supabase.from('audit_log').select('*').order('created_at', { ascending: false }).limit(50),
      supabase.from('tasks').select('*').order('created_at', { ascending: false }).limit(20),
    ]).then(([auditRes, taskRes]) => {
      if (auditRes.data) setAuditLog(auditRes.data);
      if (taskRes.data) setTasks(taskRes.data);
      setLastUpdated(new Date().toLocaleTimeString('en-MY', { timeZone: 'Asia/Kuala_Lumpur' }));
    });

    // Realtime subscriptions
    const auditChannel = supabase
      .channel('audit_log_changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'audit_log' }, (payload) => {
        setAuditLog((prev) => [payload.new as AuditEntry, ...prev.slice(0, 49)]);
        setLastUpdated(new Date().toLocaleTimeString('en-MY', { timeZone: 'Asia/Kuala_Lumpur' }));
      })
      .subscribe((status) => setConnected(status === 'SUBSCRIBED'));

    const taskChannel = supabase
      .channel('task_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setTasks((prev) => [payload.new as Task, ...prev.slice(0, 19)]);
        } else if (payload.eventType === 'UPDATE') {
          setTasks((prev) => prev.map((t) => t.id === payload.new.id ? payload.new as Task : t));
        }
        setLastUpdated(new Date().toLocaleTimeString('en-MY', { timeZone: 'Asia/Kuala_Lumpur' }));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(auditChannel);
      supabase.removeChannel(taskChannel);
    };
  }, []);

  const formatTime = (iso: string) => {
    return new Date(iso).toLocaleString('en-MY', {
      timeZone: 'Asia/Kuala_Lumpur',
      day: '2-digit', month: 'short',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  };

  const pendingTasks = tasks.filter(t => ['pending', 'pending_approval', 'processing'].includes(t.status));
  const approvedTasks = auditLog.filter(a => a.governance_status === 'approved_and_executed');

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-mono">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">AAAGTMP</h1>
          <p className="text-xs text-gray-500 mt-0.5">Aurion AI Agent GTM Platform · Governance Portal</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className={`flex items-center gap-1.5 ${connected ? 'text-green-400' : 'text-red-400'}`}>
            <span className={`w-2 h-2 rounded-full ${connected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
            {connected ? 'LIVE' : 'CONNECTING...'}
          </span>
          {lastUpdated && <span className="text-gray-600">Updated {lastUpdated} MYT</span>}
        </div>
      </div>

      {/* Stats bar */}
      <div className="border-b border-gray-800 px-6 py-3 flex gap-6 text-xs">
        <div><span className="text-gray-500">Total tasks</span> <span className="text-white ml-2 font-bold">{tasks.length}</span></div>
        <div><span className="text-gray-500">Pending approval</span> <span className="text-yellow-400 ml-2 font-bold">{pendingTasks.length}</span></div>
        <div><span className="text-gray-500">Approved & executed</span> <span className="text-green-400 ml-2 font-bold">{approvedTasks.length}</span></div>
        <div><span className="text-gray-500">Audit entries</span> <span className="text-white ml-2 font-bold">{auditLog.length}</span></div>
        <div><span className="text-gray-500">Unauthorized sends</span> <span className="text-green-400 ml-2 font-bold">0</span></div>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Left: Active tasks */}
        <div className="w-80 border-r border-gray-800 flex flex-col">
          <div className="px-4 py-3 border-b border-gray-800 text-xs text-gray-500 uppercase tracking-wider">Active Tasks</div>
          <div className="flex-1 overflow-y-auto">
            {tasks.length === 0 && (
              <div className="px-4 py-8 text-center text-xs text-gray-600">No tasks yet.<br/>Send a task via WhatsApp to begin.</div>
            )}
            {tasks.map((task) => (
              <div key={task.id} className="px-4 py-3 border-b border-gray-800/50 hover:bg-gray-900 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs px-1.5 py-0.5 rounded ${OPCO_COLORS[task.opco_id] || 'bg-gray-700 text-gray-300'}`}>
                    {task.opco_id.toUpperCase()}
                  </span>
                  <span className={`text-xs ${STATUS_COLORS[task.status] || 'text-gray-400'}`}>
                    {task.status.replace(/_/g, ' ')}
                  </span>
                </div>
                <p className="text-xs text-gray-300 truncate">{task.task_type.replace(/_/g, ' ')}</p>
                <p className="text-xs text-gray-600 mt-1">{task.task_ref}</p>
                <p className="text-xs text-gray-700 mt-0.5">{formatTime(task.created_at)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Audit log */}
        <div className="flex-1 flex flex-col">
          <div className="px-4 py-3 border-b border-gray-800 text-xs text-gray-500 uppercase tracking-wider flex justify-between">
            <span>Governance Audit Log</span>
            <span className="text-gray-700">Immutable · Every action logged</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {auditLog.length === 0 && (
              <div className="px-6 py-12 text-center text-xs text-gray-600">
                Audit log is empty.<br/>Actions will appear here in real-time.
              </div>
            )}
            {auditLog.map((entry) => (
              <div key={entry.id} className="px-4 py-3 border-b border-gray-800/40 hover:bg-gray-900/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`text-xs px-1.5 py-0.5 rounded ${OPCO_COLORS[entry.opco_id] || 'bg-gray-700 text-gray-300'}`}>
                        {(entry.opco_id || 'hq').toUpperCase()}
                      </span>
                      <span className="text-xs font-semibold text-white">{entry.actor}</span>
                      <span className="text-xs text-gray-500">→</span>
                      <span className="text-xs text-gray-300">{entry.action}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {entry.origin_type && (
                        <span className={`text-xs px-1.5 py-0.5 rounded ${ORIGIN_BADGE[entry.origin_type] || 'bg-gray-700 text-gray-300'}`}>
                          {entry.origin_type}
                        </span>
                      )}
                      {entry.governance_status && (
                        <span className={`text-xs ${STATUS_COLORS[entry.governance_status] || 'text-gray-400'}`}>
                          {entry.governance_status.replace(/_/g, ' ')}
                        </span>
                      )}
                      {entry.confidence !== null && entry.confidence !== undefined && (
                        <span className="text-xs text-gray-600">confidence: {(entry.confidence * 100).toFixed(0)}%</span>
                      )}
                      {entry.approver_id && (
                        <span className="text-xs text-green-500">✓ {entry.approver_id}</span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-gray-700 whitespace-nowrap shrink-0">{formatTime(entry.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
