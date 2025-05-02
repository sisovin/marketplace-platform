import { LoginForm } from '../../components/auth';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
