import Image from 'next/image';
import Link from 'next/link';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, UserRound } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

interface ItemsSideMenu {
  url: string;
  title: string;
}

const itemsSideMenu: ItemsSideMenu[] = [
  {
    url: '/',
    title: 'HOME',
  },
  {
    url: '/book-now',
    title: 'BOOK NOW',
  },
  {
    url: '/services',
    title: 'SERVICES',
  },
  {
    url: 'free-course',
    title: 'FREE COURSE',
  },
  {
    url: '/our-story',
    title: 'OUR STORY',
  },
  {
    url: '/contact-us',
    title: 'CONTACT US',
  },
  {
    url: '/docs',
    title: 'DOCS',
  },
  {
    url: '/blog',
    title: 'BLOG',
  },
];

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-[#102D5D]">
        <Sheet>
          <div className="flex justify-end pt-2 pr-2">
            <SheetTrigger className="lg:hidden">
              <Menu size={30} className="text-white" />
            </SheetTrigger>
          </div>
          <SheetContent className="gap-2">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <div className="hover:bg-accent py-2 px-4 rounded-md flex gap-2">
              <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
                <UserRound className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">AscencioTaxInc</span>
                <span className="truncate text-xs">email@exmple.com</span>
              </div>
            </div>
            <NavigationMenu>
              <NavigationMenuList className="flex flex-col justify-start items-start gap-1 w-full">
                <Link
                  href="/auth/login"
                  className="hover:bg-accent py-2 px-4 rounded-md text-sm w-full"
                >
                  LOGIN
                </Link>
                <Link
                  href="/auth/register"
                  className="hover:bg-accent py-2 px-4 rounded-md text-sm w-full"
                >
                  REGISTER
                </Link>
                {itemsSideMenu.map(({ url, title }) => (
                  <Link
                    key={url}
                    href={url}
                    className="hover:bg-accent py-2 px-4 rounded-md text-sm w-full"
                  >
                    {title}
                  </Link>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </SheetContent>
        </Sheet>
        <div className=" flex justify-center">
          <div className=" flex items-end flex-wrap 2xl:max-w-[1536px]  overflow-hidden">
            <Image
              src={'/logo.jpg'}
              width={500}
              height={300}
              alt={'logo image'}
              priority
              className="h-auto min-w-64"
            />
            <div className="flex justify-end ml-auto">
              <NavigationMenu className="hidden lg:block">
                <NavigationMenuList>
                  {itemsSideMenu.map(({ url, title }) => (
                    <NavigationMenuItem key={url} className="mb-3 min-w-max">
                      <Link href={url} legacyBehavior passHref>
                        <NavigationMenuLink className="text-white px-3 hover:text-blue-600 transition-all">
                          {title}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}

                  <NavigationMenuItem className="mb-3 min-w-max">
                    <Link href="/auth/login" legacyBehavior passHref>
                      <NavigationMenuLink className="text-white px-3 hover:text-blue-600 transition-all">
                        SIGN IN
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="mb-3 min-w-max">
                    <Link href="/auth/register" legacyBehavior passHref>
                      <NavigationMenuLink className="text-white px-3 hover:text-blue-600 transition-all">
                        SIGN UP
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </div>
      </div>
      <main className="m-4 mt-4 lg:max-w-[1024px] lg:mx-auto">{children}</main>
    </>
  );
}
