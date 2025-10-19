import { Link, useLocation } from "wouter";
import { Button } from "./ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { APP_TITLE, APP_LOGO, getLoginUrl } from "@/const";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/sermons", label: "Sermons" },
    { href: "/events", label: "Events" },
    { href: "/prayer", label: "Prayer" },
    { href: "/contact", label: "Contact" },
    { href: "/give", label: "Give" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <nav className="container py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <img src={APP_LOGO} alt="Logo" className="w-10 h-10 object-contain" />
                <span className="text-xl font-semibold text-foreground">
                  {APP_TITLE}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                      isActive(link.href)
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* Auth Section */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-muted-foreground">
                    {user?.name}
                  </span>
                  {user?.role === "admin" && (
                    <Link href="/admin">
                      <Button variant="outline" size="sm">
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => logout()}>
                    Logout
                  </Button>
                </>
              ) : (
                <Button size="sm" asChild>
                  <a href={getLoginUrl()}>Sign In</a>
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t pt-4">
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <span
                      className={`block py-2 text-sm font-medium transition-colors cursor-pointer ${
                        isActive(link.href)
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </span>
                  </Link>
                ))}
                <div className="border-t pt-3 mt-2">
                  {isAuthenticated ? (
                    <>
                      <p className="text-sm text-muted-foreground mb-2">
                        {user?.name}
                      </p>
                      {user?.role === "admin" && (
                        <Link href="/admin">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full mb-2"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Admin
                          </Button>
                        </Link>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" className="w-full" asChild>
                      <a href={getLoginUrl()}>Sign In</a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-muted mt-auto">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">{APP_TITLE}</h3>
              <p className="text-sm text-muted-foreground">
                A place of worship, fellowship, and community.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about">
                    <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer">
                      About Us
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/sermons">
                    <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer">
                      Sermons
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/events">
                    <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer">
                      Events
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Get Involved</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/prayer">
                    <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer">
                      Prayer Requests
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/give">
                    <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer">
                      Give
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer">
                      Contact Us
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <p className="text-sm text-muted-foreground mb-2">
                123 Church Street
                <br />
                Atlanta, GA 30303
              </p>
              <p className="text-sm text-muted-foreground">
                Email: info@christiantabernacleatlanta.org
                <br />
                Phone: (404) 555-1234
              </p>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} {APP_TITLE}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

