import { MessageCircle } from "lucide-react";
import { CLINIC_INFO } from "@/lib/constants";

const WhatsAppFloat = () => (
  <a
    href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hi%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Shyam%20Dental%20Clinic.`}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110 md:bottom-6 md:right-6"
    style={{ backgroundColor: "hsl(142, 70%, 45%)" }}
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle className="h-7 w-7" style={{ color: "white" }} />
  </a>
);

export default WhatsAppFloat;
