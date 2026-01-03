// ===================================================================================
// EnvirosAgro Global View (UI)
// Page: Login / Main Entry
// Description: This is the main login page for the application. It provides the
//              user interface for authentication and communicates securely with the
//              EAOS via the /api/auth BFF.
// ===================================================================================

import { useState } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'login', email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage(`Login Successful! Your token is: ${data.token}`);
                // In a real app, you'd store the token securely and redirect
            } else {
                throw new Error(data.message || 'An unknown error occurred.');
            }
        } catch (error) {
            setMessage(`Login Failed: ${error.message}`);
        }
        finally {
            setIsLoading(false);
        }
    };
    
    // A similar function would exist for registration
    const handleRegister = async (e) => {
      // ... implementation for registration form ...
    }

    return (
        <div style={styles.container}>
            <div style={styles.loginBox}>
                <h1 style={styles.title}>EnvirosAgro Global View</h1>
                <p style={styles.subtitle}>The future of sustainable agriculture, powered by EAOS.</p>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        style={styles.input}
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        style={styles.input}
                        required
                    />
                    <button type="submit" style={styles.button} disabled={isLoading}>
                        {isLoading ? 'Processing...' : 'Secure Login'}
                    </button>
                </form>
                {message && <p style={styles.message}>{message}</p>}
            </div>
        </div>
    );
}

// Basic inline styles for demonstration purposes
const styles = {
    container: {
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        backgroundColor: '#f0f2f5'
    },
    loginBox: {
        padding: '40px', 
        borderRadius: '8px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
        backgroundColor: 'white', 
        textAlign: 'center'
    },
    title: { 
        color: '#0C3B2E'
    },
    subtitle: {
        color: '#666', 
        marginBottom: '30px'
    },
    input: {
        width: 'calc(100% - 20px)', 
        padding: '10px', 
        marginBottom: '15px', 
        border: '1px solid #ccc', 
        borderRadius: '4px'
    },
    button: {
        width: '100%', 
        padding: '10px', 
        border: 'none', 
        borderRadius: '4px', 
        backgroundColor: '#1A73E8', 
        color: 'white', 
        cursor: 'pointer',
        fontSize: '16px'
    },
    message: {
        marginTop: '20px',
        color: 'red'
    }
};