import { RegisterForm } from '../../components/auth';

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Register</h1>
      <RegisterForm />
    </div>
  );
}
