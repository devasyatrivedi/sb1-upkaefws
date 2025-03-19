import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: any;
  isBusinessOwner: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isBusinessOwner, setIsBusinessOwner] = useState(false);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      // Check if user is a business owner
      if (session?.user) {
        checkBusinessOwner(session.user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkBusinessOwner(session.user.id);
      } else {
        setIsBusinessOwner(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function checkBusinessOwner(userId: string) {
    const { data } = await supabase
      .from('business_owners')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    setIsBusinessOwner(!!data);
  }

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsBusinessOwner(false);
  };

  return (
    <AuthContext.Provider value={{ user, isBusinessOwner, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}