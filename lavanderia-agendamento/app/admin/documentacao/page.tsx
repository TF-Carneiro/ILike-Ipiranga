import DocumentacaoAdmin from "@/documentacao-admin";
import { AuthGuard } from "@/components/auth-guard";

export default function DocumentacaoAdminPage() {
  return (
    <AuthGuard>
      <DocumentacaoAdmin />
    </AuthGuard>
  );
}
