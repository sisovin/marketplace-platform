import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Input, Button } from '../../components/ui';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role,
        },
      },
    });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Signup successful! Check your email for confirmation.');
    }
    setLoading(false);
  };

  const handleOAuthSignup = async (provider) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Signup successful!');
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Signup</h1>
        <form onSubmit={handleSignup}>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="mb-4">
            <label className="block mb-2">Select your role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Signup'}
          </Button>
        </form>
        <div className="mt-4">
          <Button onClick={() => handleOAuthSignup('google')} disabled={loading}>
            {loading ? 'Loading...' : 'Signup with Google'}
          </Button>
          <Button onClick={() => handleOAuthSignup('github')} disabled={loading}>
            {loading ? 'Loading...' : 'Signup with GitHub'}
          </Button>
        </div>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
