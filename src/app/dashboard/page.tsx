import DashboardBreadcrumb from '@/components/dashboard-breadcrumb';

export default function Page() {
  return (
    <>
      <DashboardBreadcrumb items={[{ name: 'Dashboard', url: '/dashboard' }]} />
      <main>
        <div className="p-4">
          <h1>Dashboard Page</h1>
        </div>
      </main>
    </>
  );
}
