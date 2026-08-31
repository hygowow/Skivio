import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { LoginForm } from "./login-form";

export const metadata = {
  title: "Admin Login",
};

export default async function AdminLoginPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.id) {
    redirect("/admin");
  }

  return (
    <div className="mx-auto w-full max-w-md px-6 py-20">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Admin login</h1>
        <p className="mt-2 text-sm text-slate-600">Use your seeded credentials to access the dashboard.</p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
