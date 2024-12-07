import { SecurityForm } from './_components/security-form';

export default function Security() {
  return (
    <div className="container mx-auto p-6">
      <div className=" mx-auto p-6">
        <h1 className="text-2xl font-bold">Segurança</h1>
        <p className="text-sm text-muted-foreground">
          Altere sua senha de acesso.
        </p>
      </div>
      <SecurityForm />
    </div>
  );
}