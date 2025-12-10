import React, { useEffect, useState } from 'react';

export function AdminDashboard() {
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

                {/* Content Section */}
                <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h2 className="text-2xl font-bold text-white mb-4">Dashboard Content</h2>
                    <p className="text-gray-400">
                        Add your admin content here. This area is only accessible to authenticated administrators.
                    </p>
                </div>
            </div>
        </div>
    );
}
