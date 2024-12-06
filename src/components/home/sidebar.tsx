import { Menu, UserRound } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { User } from '@/domain/entities/user';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '../ui/navigation-menu';
import Link from 'next/link';
import { ItemsHomeMenu } from '@/interfaces';
import ChangeTheme from './ChangeTheme';

interface Props {
  user?: User;
  itemsHomeMenu: ItemsHomeMenu[];
  onLogout: () => void;
}

export default function HomeSidebar({ user, itemsHomeMenu, onLogout }: Props) {
  return (
    <Sheet>
      <div className="flex justify-end pt-2 pr-2 gap-2">
        <ChangeTheme />
        <SheetTrigger className="lg:hidden hover:bg-[#0003] rounded-md p-2" >
          <Menu size={25} className="text-white" />
        </SheetTrigger>
      </div>
      <SheetContent className="gap-2 w-full sm:w-[540px]">
        <SheetHeader className="mb-4">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription></SheetDescription>
          {user && (
            <div className="hover:bg-accent py-2 px-4 rounded-md flex gap-2 mb-4">
              <>
                <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
                  <UserRound className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user?.fullName}
                  </span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </>
            </div>
          )}
        </SheetHeader>
        <NavigationMenu orientation="vertical">
          <NavigationMenuList className=" flex-col gap-4 items-start space-x-1 justify-start">
            {!user && (
              <>
                <NavigationMenuItem className="first:ml-1">
                  <Link
                    href="/auth/login"
                    className="hover:bg-accent py-2 px-4 rounded-md text-sm transition-all"
                  >
                    SIGN IN
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/auth/register"
                    className="hover:bg-accent py-2 px-4 rounded-md text-sm transition-all"
                  >
                    SIGN UP
                  </Link>
                </NavigationMenuItem>
              </>
            )}
            {user?.roles.includes('admin') && (
              <NavigationMenuItem className="first:ml-1">
                <Link
                  href="/dashboard"
                  className="hover:bg-accent py-2 px-4 rounded-md text-sm transition-all"
                >
                  ADMIN
                </Link>
              </NavigationMenuItem>
            )}

            {itemsHomeMenu.map(({ url, title }) => (
              <NavigationMenuItem key={url} className="first:ml-1">
                <Link
                  href={url}
                  className="hover:bg-accent py-2 px-4 rounded-md text-sm transition-all"
                >
                  {title}
                </Link>
              </NavigationMenuItem>
            ))}

            {user && (
              <NavigationMenuItem>
                <span
                  onClick={onLogout}
                  className="hover:bg-accent py-2 px-4 rounded-md text-sm transition-all cursor-pointer"
                >
                  LOGOUT
                </span>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </SheetContent>
    </Sheet>
  );
}
