import { Link } from "react-router-dom";
import { Phone, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CLINIC_INFO } from "@/lib/constants";

const StickyMobileCTA = () => (
  <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-md md:hidden">
    <div className="flex gap-2">
      <Link to="/booking" className="flex-1">
        <Button variant="hero" className="w-full gap-2">
          <CalendarDays className="h-4 w-4" /> Book Now
        </Button>
      </Link>
      <a href={`tel:${CLINIC_INFO.phone}`} className="flex-1">
        <Button variant="call" className="w-full gap-2">
          <Phone className="h-4 w-4" /> Call
        </Button>
      </a>
    </div>
  </div>
);

export default StickyMobileCTA;
