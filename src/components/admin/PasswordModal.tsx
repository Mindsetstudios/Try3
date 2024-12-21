import React, { useState } from 'react';
import { Lock, AlertCircle } from 'lucide-react';
import { checkAdminPassword } from '../../lib/adminAuth';

interface PasswordModalProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ onSuccess, onCancel }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (checkAdminPassword(password)) {
      onSuccess();
    } else {
      setError('Invalid password');
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Lock className="w-6 h-6" />
          Admin Access
        </h2>

        {error && (
          <div className="bg-red-500/20 text-red-300 p-4 rounded-lg flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-500"
              placeholder="Enter admin password"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-300 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Access Admin Panel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;