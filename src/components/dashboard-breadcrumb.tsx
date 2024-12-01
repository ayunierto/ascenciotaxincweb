import { ModeToggle } from '@/components/ModeToggle';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface Props {
  items: Item[];
}

interface Item {
  name: string;
  url: string;
}

export default function DashboardBreadcrumb({ items }: Props) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 pr-4">
      <div className="flex items-center gap-2 px-4 mr-auto">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {items.map((item, index) =>
              index !== items.length - 1 ? (
                <>
                  <BreadcrumbItem key={item.url} className="hidden md:block">
                    <BreadcrumbLink href={item.url}>{item.name}</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                </>
              ) : (
                <BreadcrumbItem key={item.url}>
                  <BreadcrumbPage>{item.name}</BreadcrumbPage>
                </BreadcrumbItem>
              )
            )}
            {/* <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href={'#'}>Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem> */}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <ModeToggle />
    </header>
  );
}
