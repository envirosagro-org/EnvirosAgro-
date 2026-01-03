// ===================================================================================
// EnvirosAgro Global View (UI)
// API Route: /api/auth
// Description: This is a Backend-for-Frontend (BFF). It acts as a secure proxy
//              between the client-side UI and the EAOS. The browser sends login/
//              registration requests here, and this server-side code securely
//              communicates with the EAOS core services.
// ===================================================================================

// IMPORTANT: The EAOS services are NOT imported directly into the API route in a real
// production app. Instead, this API route would make an HTTP/gRPC call to the
// independently running EAOS services. For this demonstration, we will instantiate
// them directly to show the flow.

import { RegistryService } from '../../../eaos/core/registry/registry_service';
import { AuthService } from '../../../eaos/core/identity/auth_service';

// --- A mock function to simulate instantiating the EAOS on the server ---
// In a real microservices architecture, this would be handled by a service discovery
// mechanism and an API gateway.
function getEAOSAuthService() {
    const registry = new RegistryService("mock-connection-string");
    const auth = new AuthService(registry);
    return auth;
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    try {
        const { action, email, password } = req.body;
        const authService = getEAOSAuthService();

        if (action === 'register') {
            const newUser = await authService.register_user(email, password);
            res.status(201).json({ status: 'SUCCESS', userId: newUser._id });
        }
        else if (action === 'login') {
            const token = await authService.login_user(email, password);
            // In a real app, this token would be set in a secure, httpOnly cookie
            res.status(200).json({ status: 'SUCCESS', token: token });
        }
        else {
            res.status(400).json({ message: 'Invalid action specified.' });
        }
    }
    catch (error) {
        // The EAOS services raise ValueErrors, which we catch here and send
        // back as a user-friendly error message.
        res.status(401).json({ status: 'FAILED', message: error.message });
    }
}
