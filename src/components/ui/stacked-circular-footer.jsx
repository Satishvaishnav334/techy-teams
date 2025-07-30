import { Icons } from "./icons.jsx"
import { Button } from "./button.jsx"
import { Input } from "./Input.jsx"
import { Label } from "./label.jsx"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import logo from "../../../public/logo.png"
function StackedCircularFooter() {
  const items = [
    { label: 'Tasks', href: '/tasks' },
    { label: 'Teams', href: '/teams' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Pricing', href: '/pricing' },
  ]
  return (
    <footer className="p-10 border-t border-gray-500 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          <div className="mb-8 rounded-full  p-8">
            <h1 className="text-2xl lg:text-4xl font-extrabold ">Techy_Teams</h1>
          </div>
          <nav className="mb-8 flex flex-wrap justify-center gap-6">
            {items.map((item, index) => (
              <Link key={index} href={item.href} className='hover:text-[#111111d1] transition-colors duration-300'>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mb-8 flex space-x-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <Link href='#'>  <Facebook className="h-4 w-4" /></Link>
              <span className="sr-only">Facebook</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Link href='#'>   <Twitter className="h-4 w-4" /></Link>
              <span className="sr-only">Twitter</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Link href='#'> <Instagram className="h-4 w-4" /></Link>
              <span className="sr-only">Instagram</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Link href='#'>   <Linkedin className="h-4 w-4" /></Link>
              <span className="sr-only">LinkedIn</span>
            </Button>
          </div>
          <div className="mb-8 w-full max-w-md">
            <form className="flex space-x-2">
              <div className="flex-grow">
                <Label htmlFor="email" className="sr-only">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  className="rounded-full" />
              </div>
              <Button type="submit" className="rounded-full">Subscribe</Button>
            </form>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Your Company. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { StackedCircularFooter }