import DashboardBreadcrumb from '@/components/dashboard/dashboard-breadcrumb';

import Profile from '@/components/dashboard/users/profile';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditUserPage(props: Props) {
  const params = await props.params;
  const { id } = params;

  return (
    <>
      <DashboardBreadcrumb
        items={[
          { name: 'Dashboard', url: '/dashboard' },
          { name: 'Users', url: '/dashboard/users' },
          { name: 'Edit User', url: '/dashboard/users/edit' },
        ]}
      />
      <main className="p-4 space-y-4">
        <Profile id={id} />
      </main>
    </>
  );
}
