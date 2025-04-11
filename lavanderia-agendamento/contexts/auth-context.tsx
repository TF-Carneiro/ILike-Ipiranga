"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";

// Tipo para o usuário
export type User = {
  username: string;
};

// Interface para o contexto de autenticação
interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  changePassword: (
    username: string,
    currentPassword: string,
    newPassword: string
  ) => Promise<boolean>;
}

// Criar o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Chave para armazenar o usuário no localStorage
const USER_STORAGE_KEY = "lavanderia_admin_user";

/**
 * Provider do contexto de autenticação
 * Gerencia o estado de autenticação do usuário
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar se o usuário já está autenticado ao carregar a página
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  /**
   * Função de login
   * Verifica as credenciais e autentica o usuário
   */
  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      console.log("Tentando login com:", username);

      // Verificar se as variáveis de ambiente estão definidas
      if (
        !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ) {
        console.error("Variáveis de ambiente do Supabase não configuradas");
        return false;
      }

      // Verificar credenciais no Supabase
      const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("username", username)
        .eq("password", password)
        .single();

      if (error) {
        console.error("Erro na consulta ao Supabase:", error);
        return false;
      }

      if (!data) {
        console.log("Nenhum usuário encontrado com essas credenciais");
        return false;
      }

      console.log("Usuário encontrado:", data);

      const userObj: User = {
        username: data.username,
      };

      setUser(userObj);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userObj));
      return true;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Função de logout
   * Remove o usuário da sessão
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  /**
   * Função para alterar a senha do usuário
   * Verifica as credenciais atuais e, se corretas, atualiza a senha
   */
  const changePassword = async (
    username: string,
    currentPassword: string,
    newPassword: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Verifica se as variáveis de ambiente estão definidas
      if (
        !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ) {
        console.error("Variáveis de ambiente do Supabase não configuradas");
        return false;
      }

      // Verificar credenciais atuais no Supabase
      const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("username", username)
        .eq("password", currentPassword)
        .single();

      // Se ocorrer erro na consulta
      if (error) {
        console.error("Erro ao verificar credenciais atuais:", error);
        return false;
      }

      // Se não encontrar um usuário com as credenciais fornecidas
      if (!data) {
        console.error("Usuário ou senha atual incorretos");
        return false;
      }

      // Atualizar a senha no Supabase
      const { error: updateError } = await supabase
        .from("usuarios")
        .update({ password: newPassword })
        .eq("username", username);

      if (updateError) {
        console.error("Erro ao atualizar senha:", updateError);
        return false;
      }

      console.log("Senha atualizada com sucesso");
      return true;
    } catch (error) {
      console.error("Erro ao alterar senha:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook para usar o contexto de autenticação
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
