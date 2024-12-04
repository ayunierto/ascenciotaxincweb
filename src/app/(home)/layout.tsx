'use client';

import Image from 'next/image';
import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { useAuthStore } from '@/store/auth-store';
import { ItemsHomeMenu } from '@/interfaces';
import HomeSidebar from '@/components/home/sidebar';

const itemsHomeMenu: ItemsHomeMenu[] = [
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
  const { user, logout } = useAuthStore();

  const onLogout = async () => {
    await logout();
  };

  return (
    <>
      <div className="bg-[#102D5D]">
        <HomeSidebar
          itemsHomeMenu={itemsHomeMenu}
          onLogout={onLogout}
          user={user}
        />
        <header className="flex justify-center">
          <div className="flex items-end flex-wrap 2xl:max-w-[1536px] overflow-hidden">
            <Image
              src={'/logo.jpg'}
              width={500}
              height={300}
              alt={'logo image'}
              priority
              className="h-auto w-auto min-w-64"
            />
            <div className="flex justify-end ml-auto">
              <NavigationMenu className="hidden lg:block h-full">
                <NavigationMenuList className="">
                  {itemsHomeMenu.map(({ url, title }) => (
                    <NavigationMenuItem key={url} className="mb-3 min-w-max">
                      <Link href={url} legacyBehavior passHref>
                        <NavigationMenuLink className="text-white px-3 hover:text-blue-600 transition-all">
                          {title}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}

                  {!user && (
                    <>
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
                    </>
                  )}
                  {user && (
                    <>
                      {user.roles.includes('admin') && (
                        <NavigationMenuItem className="mb-3 min-w-max">
                          <Link href="/dashboard" legacyBehavior passHref>
                            <NavigationMenuLink className="text-white px-3 hover:text-blue-600 transition-all">
                              ADMIN
                            </NavigationMenuLink>
                          </Link>
                        </NavigationMenuItem>
                      )}
                      <NavigationMenuItem className="mt-auto">
                        <Link
                          href={'#'}
                          className="text-white px-3 hover:text-blue-600 transition-all"
                          onClick={onLogout}
                        >
                          LOGOUT
                        </Link>
                      </NavigationMenuItem>
                    </>
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </header>
      </div>
      <main className="m-4 mt-4 lg:max-w-[1024px] lg:mx-auto">{children}</main>
    </>
  );
}
