import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";

// ============================================================================
// Augmentation des types NextAuth
// ============================================================================
declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
  }
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      isAdmin: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    isAdmin?: boolean;
  }
}

// ============================================================================
// Configuration NextAuth — authentification via MongoDB
// ============================================================================
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          await connectDB();

          // .select('+password') car password est exclude:true dans toJSON
          const dbUser = await User.findOne({
            email: credentials.email.toLowerCase().trim(),
          }).lean<{ _id: any; name: string; email: string; password: string; isAdmin: boolean }>();

          if (!dbUser) {
            console.warn(`[Auth] Utilisateur non trouvé: ${credentials.email}`);
            return null;
          }

          if (!dbUser.isAdmin) {
            console.warn(`[Auth] Accès refusé (non-admin): ${credentials.email}`);
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            dbUser.password
          );

          if (!isPasswordValid) {
            console.warn(`[Auth] Mot de passe incorrect: ${credentials.email}`);
            return null;
          }

          console.log(`[Auth] ✅ Connexion réussie: ${dbUser.email}`);

          return {
            id: dbUser._id.toString(),
            name: dbUser.name || dbUser.email,
            email: dbUser.email,
            isAdmin: dbUser.isAdmin,
          };
        } catch (error) {
          console.error("[Auth] Erreur lors de la vérification:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 heures
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.isAdmin = token.isAdmin as boolean;
      }
      return session;
    },
  },

  pages: {
    signIn: "/admin/auth/login",
    error: "/admin/auth/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};