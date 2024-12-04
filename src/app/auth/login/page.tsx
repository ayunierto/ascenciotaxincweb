import { LoginForm } from '@/components';

export const metadata = {
  title: 'AscencioTaxInc - Login',
  description: 'AscencioTaxInc - Login',
};

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm />
    </div>
  );
}
