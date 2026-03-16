import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { CLINIC_INFO } from "@/lib/constants";

const Footer = () => (
  <footer className="border-t border-border bg-foreground text-primary-foreground">
    <div className="container-dental section-padding pb-22 md:pb-8">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <h3 className="mb-4 font-display text-xl font-bold">{CLINIC_INFO.shortName}</h3>
          <p className="mb-4 text-sm opacity-80">
            Trusted dental care in Sribhumi, Assam by {CLINIC_INFO.doctor}. Modern treatments, gentle care, and beautiful smiles.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-4 font-display text-lg font-semibold">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm opacity-80">
            <Link to="/about" className="hover:opacity-100">About Doctor</Link>
            <Link to="/services" className="hover:opacity-100">Our Services</Link>
            <Link to="/booking" className="hover:opacity-100">Book Appointment</Link>
            <Link to="/reviews" className="hover:opacity-100">Patient Reviews</Link>
            <Link to="/faq" className="hover:opacity-100">FAQs</Link>
            <Link to="/contact" className="hover:opacity-100">Contact Us</Link>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="mb-4 font-display text-lg font-semibold">Popular Services</h4>
          <div className="flex flex-col gap-2 text-sm opacity-80">
            <Link to="/services#dental-implants" className="hover:opacity-100">Dental Implants</Link>
            <Link to="/services#root-canals" className="hover:opacity-100">Root Canal</Link>
            <Link to="/services#teeth-whitening" className="hover:opacity-100">Teeth Whitening</Link>
            <Link to="/services#teeth-cleaning" className="hover:opacity-100">Teeth Cleaning</Link>
            <Link to="/services#veneers-crowns" className="hover:opacity-100">Veneers & Crowns</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-4 font-display text-lg font-semibold">Contact</h4>
          <div className="flex flex-col gap-3 text-sm opacity-80">
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{CLINIC_INFO.address}</span>
            </div>
            <a href={`tel:${CLINIC_INFO.phone}`} className="flex items-center gap-2 hover:opacity-100">
              <Phone className="h-4 w-4 shrink-0" />
              <span>{CLINIC_INFO.phone}</span>
            </a>
            <a href={`mailto:${CLINIC_INFO.email}`} className="flex items-center gap-2 hover:opacity-100">
              <Mail className="h-4 w-4 shrink-0" />
              <span>{CLINIC_INFO.email}</span>
            </a>
            <div className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0" />
              <div>
                <p>Mon–Sun: {CLINIC_INFO.hours.weekdays}</p>
                <p>Thu: {CLINIC_INFO.hours.thursday}</p>
                <p> 3rd of every month: closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-primary-foreground/20 pt-6 text-center text-sm opacity-60">
        <p>© {new Date().getFullYear()} {CLINIC_INFO.name}. All rights reserved.</p>
        <p className="mt-1">Best Dental Clinic in Sribhumi, Assam</p>

        {/* Developer Credit */}
        <div className="mt-4 flex flex-col items-center gap-9 md:gap-3">

          <div className="flex items-center gap-2">

            {/* BN Tech Logo */}
            <a
              href="https://bntech-innovations.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/src/assets/bnlogo.png"
                alt="BN Tech Innovations"
                className="h-8 w-30 cursor-pointer"
              />
            </a>

            {/* Developer Text */}
            <p className="text-sm font-semibold tracking-wide">
              Website Developed by{" "}
              <a
                href="https://bntech-innovations.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-cyan-400 hover:text-cyan-300"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                BN Tech Innovations
              </a>
            </p>

          </div>

          <p className="text-xs opacity-100">
            Need a website for your business? Contact BN Tech Innovations
          </p>

        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
