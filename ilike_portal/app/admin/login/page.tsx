"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  AlertCircle,
  ArrowLeft,
  HelpCircle,
  LogIn,
} from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Footer } from "@/components/footer";

/**
 * Página de login para acesso administrativo
 */
export default function LoginPage() {
  // Estado para login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  // Se já estiver autenticado, redirecionar para o painel
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, router]);

  // Função para processar o login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    try {
      setIsLoading(true);
      const success = await login(username, password);

      if (success) {
        router.push("/admin");
      } else {
        setError("Credenciais inválidas. Verifique seu usuário e senha.");
      }
    } catch (err) {
      setError("Ocorreu um erro ao fazer login. Tente novamente mais tarde.");
      console.error("Erro ao fazer login:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Se já estiver autenticado, não renderizar o formulário
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-foreground">
              Redirecionando para o painel administrativo...
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background p-4">
      {/* Adicionar o botão de alternar tema no canto superior direito */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      {/* Adicionar o botão de voltar no canto superior esquerdo */}
      <div className="absolute top-4 left-4">
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 text-xs h-8"
          >
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Voltar</span>
          </Button>
        </Link>
      </div>

      {/* Centralizar o card de login */}
      <div className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-[90vw] sm:max-w-md">
          <CardHeader className="space-y-1 p-4 sm:p-6">
            <div className="flex justify-center mb-3">
              <div className="relative h-10 w-28 sm:h-12 sm:w-32">
                <Image
                  src="/logo.png"
                  alt="I Like Ipiranga"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <CardTitle className="text-xl sm:text-2xl text-center">
              Acesso Administrativo
            </CardTitle>
            <CardDescription className="text-center text-xs sm:text-sm">
              Entre com suas credenciais ou recupere sua senha
            </CardDescription>
          </CardHeader>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger
                value="login"
                className="text-xs sm:text-sm flex items-center gap-1"
              >
                <LogIn className="h-3 w-3 sm:h-4 sm:w-4" />
                Login
              </TabsTrigger>
              <TabsTrigger
                value="recover-password"
                className="text-xs sm:text-sm flex items-center gap-1"
              >
                <HelpCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                Recuperar Senha
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <CardContent className="p-4 sm:p-6">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-3 sm:space-y-4"
                >
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                      <AlertDescription className="text-xs sm:text-sm">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="username" className="text-xs sm:text-sm">
                      Usuário
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Digite seu usuário"
                      disabled={isLoading}
                      className="h-8 sm:h-10 text-xs sm:text-sm"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="password" className="text-xs sm:text-sm">
                      Senha
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Digite sua senha"
                      disabled={isLoading}
                      className="h-8 sm:h-10 text-xs sm:text-sm"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-8 sm:h-10 text-xs sm:text-sm"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4 animate-spin" />
                        Entrando...
                      </>
                    ) : (
                      "Entrar"
                    )}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>

            <TabsContent value="recover-password">
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                  <Alert
                    variant="default"
                    className="bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800"
                  >
                    <AlertDescription className="text-sm">
                      Para recuperação de senha entre em contato com o
                      administrador do sistema por e-mail ou WhatsApp:
                      thiagof.carneiro@outlook.com ou (11) 99324-7746.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
