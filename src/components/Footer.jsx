'use client'
import { StackedCircularFooter } from "@/components/ui/stacked-circular-footer";
import { usePathname } from "next/navigation";

function StackedCircularFooterDemo() {
  const path = usePathname()
  return (
    <div className={path.split('/').includes('admin')  ? "hidden ": "block"}>
      <StackedCircularFooter />
 </div>
  );
}

export default StackedCircularFooterDemo;
