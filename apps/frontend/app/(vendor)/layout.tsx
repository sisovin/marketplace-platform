import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const user = supabase.auth.user();
      if (user) {
        setAuthenticated(true);
      } else {
        router.push('/login');
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!authenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
