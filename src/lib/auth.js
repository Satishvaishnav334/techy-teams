    // lib/session.ts
    import { SignJWT, jwtVerify } from 'jose';

    const secret = new TextEncoder().encode(process.env.JWT_SECRET); // Use a strong secret from .env

    export async function encrypt(payload) {
      return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' }) // Or a more robust algorithm like 'A256CBC-HS512' for encryption
        .setIssuedAt()
        .setExpirationTime('2h') // Example expiration
        .sign(secret);
    }

    export async function decrypt(session) {
      try {
        const { payload } = await jwtVerify(session, secret, {
          algorithms: ['HS256'], // Or the algorithm used for encryption
        });
        return payload;
      } catch (error) {
        console.error('Failed to verify session:', error);
        return null;
      }
    }