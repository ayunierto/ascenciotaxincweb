'use client';

import { useEffect, useState } from 'react';
import { getUsers } from '@/actions/users/get-users';
import LoadingPage from '@/components/loading';
import { Badge } from '@/components/ui';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { User } from '@/domain/entities';
import { MoreHorizontal, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/';
import DashboardBreadcrumb from '@/components/dashboard/dashboard-breadcrumb';
import Link from 'next/link';
import { deleteUser } from '@/actions/users/delete-user';
import { toast } from '@/hooks/use-toast';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await getUsers();
        setUsers(result);
      } catch (err) {
        setError(`Error fetching data ${err}`);
      } finally {
        setLoading(false);
      }
    };
    fetchDataAsync();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }
  if (error) {
    return <div>{error}</div>;
  }

  const onDeleteUser = async (id: string) => {
    const deletedUser = await deleteUser(id);

    if (deletedUser) {
      toast({
        description: `Deleted user ${deletedUser.fullName}`,
        variant: 'success',
      });
      setUsers(users.filter((user) => user.id !== id));
      return;
    }

    toast({
      description: `Error deleteting user`,
      variant: 'destructive',
    });
  };

  return (
    <>
      <DashboardBreadcrumb
        items={[
          { name: 'Dashboard', url: '/dashboard' },
          { name: 'Users', url: '/dashboard/users' },
        ]}
      />

      <main className="px-4 space-y-4">
        <div className="flex justify-end">
          <Link href={'users'}>
            <Button variant={'secondary'}>
              <Plus /> Add user
            </Button>
          </Link>
        </div>
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Roles</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.phoneNumber ? user.phoneNumber : 'Not found'}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size={'sm'}>
                        {user.roles.length}{' '}
                        {user.roles.length === 1 ? 'role' : 'roles'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Roles list</DialogTitle>
                        <DialogDescription />
                      </DialogHeader>
                      <div className="flex gap-2">
                        {user.roles.map((role) => (
                          <Badge variant={'secondary'} key={role}>
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>
                  {user.isActive ? (
                    <Badge variant={'secondary'}>Active</Badge>
                  ) : (
                    <Badge variant={'destructive'}>Disable</Badge>
                  )}
                </TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <Link href={`/dashboard/users/edit/${user.id}`}>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="focus:bg-red-500"
                        onClick={() => onDeleteUser(user.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </>
  );
}
