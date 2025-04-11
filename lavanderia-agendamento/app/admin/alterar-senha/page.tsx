"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { AuthGuard } from "@/components/auth-guard";
import { AdminHeader } from "@/components/admin-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, KeyRound, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/footer";

export default function AlterarSenhaPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user, changePassword } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validações
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (newPassword === currentPassword) {
      setError("A nova senha deve ser diferente da senha atual");
      return;
    }

    if (newPassword.length < 6) {
      setError("A nova senha deve ter pelo menos 6 caracteres");
      return;
    }

    try {
      setIsLoading(true);

      if (!user) {
        setError("Usuário não identificado. Faça login novamente.");
        return;
      }

      const success = await changePassword(
        user.username,
        currentPassword,
        newPassword
      );

      if (success) {
        setSuccess("Senha alterada com sucesso");
        toast({
          title: "Senha alterada",
          description: "Sua senha foi alterada com sucesso",
        });

        // Limpar os campos do formulário
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(
          "Não foi possível alterar a senha. Verifique se a senha atual está correta."
        );
      }
    } catch (err) {
      setError(
        "Ocorreu um erro ao comunicar com o servidor. Verifique sua conexão e tente novamente."
      );
      console.error("Erro ao alterar senha:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background flex flex-col">
        <AdminHeader />

        <main className="container mx-auto py-4 sm:py-6 px-3 sm:px-4 flex-1 pt-24 sm:pt-28">
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <Link
                href="/admin"
                className="flex items-center text-primary hover:underline"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Voltar para o painel
              </Link>
            </div>

            <Card>
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <KeyRound className="h-5 w-5 text-primary" />
                  <CardTitle className="text-2xl">Alterar Senha</CardTitle>
                </div>
                <CardDescription className="text-center">
                  Altere sua senha de acesso ao sistema
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {success && (
                    <Alert
                      variant="default"
                      className="bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800"
                    >
                      <AlertDescription>{success}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="current-password">Senha Atual</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Digite sua senha atual"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nova Senha</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Digite sua nova senha"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar Senha</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirme sua nova senha"
                      disabled={isLoading}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Alterando...
                      </>
                    ) : (
                      "Alterar Senha"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </AuthGuard>
  );
}
