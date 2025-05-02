import { useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

const useRealtime = (table, callback) => {
  useEffect(() => {
    const subscription = supabase
      .from(`${table}`)
      .on('INSERT', payload => {
        callback(payload.new);
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, [table, callback]);
};

export default useRealtime;
