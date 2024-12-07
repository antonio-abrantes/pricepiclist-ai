
import { ProfileForm } from './_components/profile-form';

export default function UserMain() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className=" mx-auto p-6">
        <h1 className="text-2xl font-bold">Meus Dados</h1>
        <p className="text-sm text-muted-foreground">
          Mantenha seus dados pessoais atualizados.
        </p>
      </div>
      <ProfileForm />
    </div>
  );
}