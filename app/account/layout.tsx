import { ChildrenType } from "@/types/react";
import SideNavigation from "@/components/SideNavigation";

export default function Layout({ children }: ChildrenType) {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
      <SideNavigation />
      <div className="py-1">{children}</div>
    </div>
  );
}
