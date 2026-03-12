import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CLINIC_INFO } from "@/lib/constants";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/booking", label: "Book Appointment" },
  { to: "/reviews", label: "Reviews" },
  { to: "/gallery", label: "Gallery" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="container-dental flex items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary font-display text-lg font-bold text-primary-foreground">
            S
          </div>
          <div className="hidden sm:block">
            <p className="font-display text-sm font-bold leading-tight text-foreground">Shyam Dental</p>
            <p className="text-xs text-muted-foreground">& Implant Center</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted ${
                location.pathname === link.to ? "bg-muted text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a href={`tel:${CLINIC_INFO.phone}`} className="hidden sm:block">
            <Button variant="call" size="sm" className="gap-1.5">
              <Phone className="h-4 w-4" /> Call Now
            </Button>
          </a>
          <button
            className="rounded-lg p-2 text-foreground lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background px-4 pb-4 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                location.pathname === link.to ? "bg-muted text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a href={`tel:${CLINIC_INFO.phone}`} className="mt-2 block">
            <Button variant="call" className="w-full gap-2">
              <Phone className="h-4 w-4" /> Call Now
            </Button>
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
