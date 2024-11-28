'use client';

// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
// } from '@/components/ui/navigation-menu';

import Image from 'next/image';
// import Link from 'next/link';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="bg-[#102D5D] flex items-end">
        <Image
          src={'/logo.jpg'}
          width={500}
          height={300}
          alt={'logo image'}
          priority
          className="h-auto w-auto"
        />
        {/* <div className="flex justify-end w-full"> */}
        {/* <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className="mb-3">
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className="px-3 hover:text-blue-600">
                    BOOK NOW
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="mb-3">
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className="px-3 hover:text-blue-600">
                    HOME
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="mb-3">
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className="px-3 hover:text-blue-600">
                    SERVICES
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="mb-3">
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className="px-3 hover:text-blue-600">
                    FREE COURSE
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="mb-3">
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className="px-3 hover:text-blue-600">
                    OUR STORY
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="mb-3">
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className="px-3 hover:text-blue-600">
                    CONTACT US
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="mb-3">
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className="px-3 hover:text-blue-600">
                    DOCS
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="mb-3">
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className="px-3 hover:text-blue-600">
                    BLOG
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu> */}
        {/* </div> */}
      </header>
      <div>{children}</div>
    </>
  );
}
