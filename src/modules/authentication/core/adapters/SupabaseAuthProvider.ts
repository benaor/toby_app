import {
  createClient,
  SupabaseClient,
  AuthError as SupabaseAuthError,
  Session as SupabaseSession,
  User as SupabaseUser,
} from "@supabase/supabase-js";
import { AuthProvider } from "../ports/AuthProvider.port";
import { Credentials } from "../models/Credentials.type";
import { Session } from "../models/AuthUser.type";
import { AsyncStorage } from "@shared/storage/storage.interface";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export class SupabaseAuthProvider implements AuthProvider {
  private supabase: SupabaseClient;

  constructor(private storage: AsyncStorage) {
    this.supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: this.storage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    });
  }

  async login(credentials: Credentials): Promise<Session> {
    const res = await this.supabase.auth.signInWithPassword(credentials);
    if (res.error) throw new Error(res.error.message);
    return this.supabaseAuthResponseToAppSession(res.data);
  }

  async logout(): Promise<void> {
    await this.supabase.auth.signOut();
  }

  async getSession(): Promise<Session | null> {
    const res = await this.supabase.auth.getSession();
    return this.supabaseSessionResponseToAppSession(res);
  }

  startAutoRefresh() {
    this.supabase.auth.startAutoRefresh();
  }

  stopAutoRefresh() {
    this.supabase.auth.stopAutoRefresh();
  }

  onAuthStateChange(cb: (session: Session | null) => void) {
    this.supabase.auth.onAuthStateChange((_event, _session) => {
      cb(this.supabaseSessionToAppSession(_session));
    });
  }

  // Mappers
  private supabaseAuthResponseToAppSession(res: SupabaseAuthResponse): Session {
    return {
      user: {
        id: res.user?.id,
        email: res.user?.id,
      },
      accessToken: {
        value: res.session.access_token,
        expiresAt: res.session.expires_at,
      },
      refreshToken: {
        value: res.session.refresh_token,
        expiresAt: res.session.expires_at,
      },
    } satisfies Session;
  }

  private supabaseSessionToAppSession(
    session: SupabaseSession | null,
  ): Session | null {
    if (!session) return null;

    return {
      user: {
        id: session.user?.id,
        email: session.user.email!,
      },
      accessToken: {
        value: session.access_token,
        expiresAt: session.expires_at,
      },
      refreshToken: {
        value: session.refresh_token,
        expiresAt: session.expires_at,
      },
    } satisfies Session;
  }

  private supabaseSessionResponseToAppSession(
    res: SupabaseGetSessionResponse,
  ): Session | null {
    if (res.error) return null;
    if (!res.data.session) return null;

    return {
      user: {
        id: res.data.session.user.id,
        email: res.data.session.user.email!,
      },
      accessToken: {
        value: res.data.session.access_token,
        expiresAt: res.data.session.expires_at,
      },
      refreshToken: {
        value: res.data.session.refresh_token,
      },
    } satisfies Session;
  }
}

type SupabaseAuthResponse = {
  user: SupabaseUser;
  session: SupabaseSession;
};

type SupabaseGetSessionResponse =
  | {
      data: {
        session: SupabaseSession;
      };
      error: null;
    }
  | {
      data: {
        session: null;
      };
      error: SupabaseAuthError;
    }
  | {
      data: {
        session: null;
      };
      error: null;
    };
