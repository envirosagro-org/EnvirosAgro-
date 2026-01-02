
import React, { useState, useEffect } from 'react';
import { Auth } from './Auth';
import { NetworkInputHub } from './NetworkInputHub';
import { View, User } from '../types';
import { auth, db } from '../lib/firebase';
import { 
  signInWithRedirect, 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  getRedirectResult,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

function App() {
  const [view, setView] = useState(View.AUTH);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setUser({ uid: firebaseUser.uid, ...userDoc.data() } as User);
          setView(View.HOME);
        } else {
          // This could happen if a user is authenticated but their data is not in Firestore
          setError("User data not found. Please contact support.");
          await signOut(auth); // Sign them out
          setUser(null);
          setView(View.AUTH);
        }
      } else {
        setUser(null);
        setView(View.AUTH);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          setIsLoading(true);
          const firebaseUser = result.user;
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (!userDoc.exists()) {
             // This flow is for Google sign-in which creates a user document if it doesn't exist.
             // For email/password, the user document should already exist.
            const userData: Omit<User, 'uid'> = {
              name: firebaseUser.displayName || 'New User',
              email: firebaseUser.email || '',
              role: 'Farmer', // Default role
              joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
              avatar: firebaseUser.photoURL || undefined,
            };
            await setDoc(doc(db, 'users', firebaseUser.uid), userData);
            setUser({ uid: firebaseUser.uid, ...userData });
          } else {
            setUser({ uid: firebaseUser.uid, ...userDoc.data() } as User);
          }
          setView(View.HOME);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    handleRedirectResult();
  }, []);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      console.error(err);
      setIsLoading(false);
    }
  };
  
  const handleEmailLogin = async (email: string, password: string) => {
      setIsLoading(true);
      setError(null);
      try {
          await signInWithEmailAndPassword(auth, email, password);
          // onAuthStateChanged will handle the view change
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
        console.error(err);
      } finally {
          setIsLoading(false);
      }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setView(View.AUTH);
  };

  if (isLoading) {
    return <div>Loading...</div>; // A global loading indicator
  }

  if (view === View.AUTH) {
    return <Auth 
      onGoogleLogin={handleGoogleLogin}
      onEmailLogin={handleEmailLogin}
      isLoading={isLoading}
      error={error}
    />;
  }

  if (view === View.HOME && user) {
      return <NetworkInputHub 
        user={user} 
        onNavigate={setView} 
        onLogout={handleLogout} 
      />;
  }

  // As a fallback, show Auth
  return <Auth onGoogleLogin={handleGoogleLogin} onEmailLogin={handleEmailLogin} isLoading={isLoading} error={error} />;
}

export default App;
