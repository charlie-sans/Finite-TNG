import React, { useEffect, useState } from 'react';

export const AdminDashboard = () => {
    const [admin, setAdmin] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                // Get admin info from localStorage
                const storedAdmin = localStorage.getItem('adminToken');
                if (!storedAdmin) {
                    window.location.href = '/admin-login';
                    return;
                }

                const adminData = JSON.parse(storedAdmin);
                setAdmin(adminData);

                // Verify with backend
                const response = await fetch('/api/auth', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'checkAdmin' })
                });

                const data = await response.json();
                setIsAdmin(data.isAdmin);
            } catch (error) {
                console.error('Failed to verify admin status:', error);
                window.location.href = '/admin-login';
            } finally {
                setLoading(false);
            }
        };

        checkAdminStatus();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        window.location.href = '/admin-login';
    };

    // File manager state
    const [fileList, setFileList] = useState([]);
    const [selected, setSelected] = useState('');
    const [content, setContent] = useState('');
    const [statusMsg, setStatusMsg] = useState('');

    async function loadList() {
        try {
            const res = await fetch('/api/content/list');
            const j = await res.json();
            if (j.ok) setFileList(j.entries || []);
            else setStatusMsg('Failed to list: ' + (j.error || 'unknown'));
        } catch (e) {
            setStatusMsg('Failed to list files');
        }
    }

    async function loadFile(path) {
        try {
            const res = await fetch('/api/content/read?path=' + encodeURIComponent(path));
            const j = await res.json();
            if (j.ok) {
                setSelected(path);
                setContent(j.content || '');
                setStatusMsg('Loaded ' + path);
            } else {
                setStatusMsg('Failed to load: ' + (j.error || 'unknown'));
            }
        } catch (e) {
            setStatusMsg('Failed to load file');
        }
    }

    async function saveFile() {
        if (!selected) {
            setStatusMsg('No file selected');
            return;
        }
        try {
            const res = await fetch('/api/content/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path: selected, content })
            });
            const j = await res.json();
            if (j.ok) {
                setStatusMsg('Saved ' + selected);
                loadList();
            } else {
                setStatusMsg('Save failed: ' + (j.error || 'unknown'));
            }
        } catch (e) {
            setStatusMsg('Save failed');
        }
    }

    // load file list once authenticated
    useEffect(() => {
        if (!loading && isAdmin) loadList();
    }, [loading, isAdmin]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="text-white text-2xl">Loading...</div>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="text-white text-2xl">Access Denied</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Navigation */}
            <nav className="bg-gray-800 border-b border-gray-700 p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-300">Welcome, {admin?.username}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Admin Info Card */}
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <h2 className="text-xl font-bold text-white mb-4">Admin Information</h2>
                        <div className="space-y-3">
                            <div>
                                <span className="text-gray-400">ID:</span>
                                <p className="text-white font-mono">{admin?.id}</p>
                            </div>
                            <div>
                                <span className="text-gray-400">Username:</span>
                                <p className="text-white">{admin?.username}</p>
                            </div>
                            <div>
                                <span className="text-gray-400">Email:</span>
                                <p className="text-white">{admin?.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <h2 className="text-xl font-bold text-white mb-4">Status</h2>
                        <div className="space-y-3">
                            <div>
                                <span className="text-gray-400">Admin Status:</span>
                                <p className="text-green-400 font-bold">✓ Active</p>
                            </div>
                            <div>
                                <span className="text-gray-400">Authentication:</span>
                                <p className="text-green-400 font-bold">✓ Verified</p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                        <div className="space-y-2">
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition">
                                Manage Users
                            </button>
                            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded transition">
                                View Reports
                            </button>
                            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition">
                                Settings
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Section: File Manager */}
                <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h2 className="text-2xl font-bold text-white mb-4">Content Manager</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="md:col-span-1 bg-gray-900 p-4 rounded">
                            <div className="mb-3 flex justify-between items-center">
                                <h3 className="text-white font-semibold">Files</h3>
                                <button
                                    onClick={async () => { loadList(); }}
                                    className="text-sm text-gray-300 hover:text-white"
                                >
                                    Refresh
                                </button>
                            </div>
                            <div className="max-h-64 overflow-auto">
                                {fileList?.length ? (
                                    fileList.map((f) => (
                                        <div
                                            key={f.path}
                                            className={`p-2 rounded cursor-pointer hover:bg-gray-700 ${selected === f.path ? 'bg-gray-700' : ''}`}
                                            onClick={() => loadFile(f.path)}
                                        >
                                            <div className="text-sm text-gray-200">{f.name}</div>
                                            <div className="text-xs text-gray-400">{f.type}</div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-gray-400">No files found</div>
                                )}
                            </div>
                        </div>

                        <div className="md:col-span-2 bg-gray-900 p-4 rounded">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <h3 className="text-white font-semibold">Editor</h3>
                                    <div className="text-xs text-gray-400">Editing: {selected || '—'}</div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={async () => { await saveFile(); }}
                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>

                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full h-64 bg-gray-800 text-white p-3 rounded font-mono text-sm"
                                placeholder="Select a file from the left to edit"
                            />

                            <div className="mt-4">
                                <h4 className="text-white font-medium">Preview (raw)</h4>
                                <pre className="whitespace-pre-wrap text-sm text-gray-200 bg-gray-800 p-3 rounded max-h-64 overflow-auto">{content}</pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
