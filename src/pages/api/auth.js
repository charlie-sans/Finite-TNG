import { verifyAdminLogin, createAdmin } from '../../DB/connector.js';

export async function POST({ request }) {
    const { action, username, password, email } = await request.json();

    if (action === 'login') {
        try {
            const admin = await verifyAdminLogin(username, password);
            if (admin) {
                return new Response(
                    JSON.stringify({
                        success: true,
                        admin: {
                            id: admin.id,
                            username: admin.username,
                            email: admin.email
                        }
                    }),
                    { status: 200, headers: { 'Content-Type': 'application/json' } }
                );
            } else {
                return new Response(
                    JSON.stringify({ success: false, message: 'Invalid credentials' }),
                    { status: 401, headers: { 'Content-Type': 'application/json' } }
                );
            }
        } catch (error) {
            return new Response(
                JSON.stringify({ success: false, message: error.message }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }
    }

    if (action === 'register') {
        try {
            const id = await createAdmin(username, email, password);
            return new Response(
                JSON.stringify({
                    success: true,
                    message: 'Admin created successfully',
                    id: id
                }),
                { status: 201, headers: { 'Content-Type': 'application/json' } }
            );
        } catch (error) {
            return new Response(
                JSON.stringify({ success: false, message: error.message }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }
    }

    if (action === 'checkAdmin') {
        // Verify if user is admin (you'd typically check a session/token here)
        return new Response(
            JSON.stringify({ success: true, isAdmin: true }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    }

    return new Response(
        JSON.stringify({ success: false, message: 'Invalid action' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
}
