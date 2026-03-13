import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, CheckCircle, MessageCircle, Phone, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import SEOHead from "@/components/SEOHead";
import { SERVICES, CLINIC_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";

const TIME_SLOTS = [
  "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
];

// Replace with your deployed Google Apps Script web app URL
const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL";

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get("service") || "";

  const [service, setService] = useState(preselectedService);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch booked slots when date changes
  const fetchBookedSlots = useCallback(async (selectedDate: Date) => {
    if (GOOGLE_SCRIPT_URL === "YOUR_GOOGLE_APPS_SCRIPT_URL") {
      setBookedSlots([]);
      return;
    }
    setLoadingSlots(true);
    try {
      const dateStr = selectedDate.toLocaleDateString("en-IN");
      const res = await fetch(`${GOOGLE_SCRIPT_URL}?action=getBookedSlots&date=${encodeURIComponent(dateStr)}`);
      const data = await res.json();
      setBookedSlots(data.bookedSlots || []);
    } catch {
      setBookedSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    if (date) {
      setTime("");
      fetchBookedSlots(date);
    }
  }, [date, fetchBookedSlots]);

  const availableSlots = TIME_SLOTS.filter((t) => !bookedSlots.includes(t));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    else if (!/^[6-9]\d{9}$/.test(form.phone.trim())) e.phone = "Enter a valid 10-digit mobile number";
    if (!service) e.service = "Please select a service";
    if (!date) e.date = "Please select a date";
    if (!time) e.time = "Please select a time slot";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);

    const dateStr = date!.toLocaleDateString("en-IN");
    const bookingData = {
      name: form.name,
      phone: form.phone,
      service,
      date: dateStr,
      time,
      message: form.message,
    };

    // Save to Google Sheets
    if (GOOGLE_SCRIPT_URL !== "YOUR_GOOGLE_APPS_SCRIPT_URL") {
      try {
        const res = await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify({ action: "bookAppointment", ...bookingData }),
        });
        const result = await res.json();
        if (result.status === "conflict") {
          setErrors({ time: "This slot was just booked. Please choose another." });
          await fetchBookedSlots(date!);
          setSubmitting(false);
          return;
        }
      } catch {
        // Continue to WhatsApp even if sheet save fails
      }
    }

    // Redirect to WhatsApp
    const summary = `📅 *Appointment Booking*\n\n👤 Name: ${form.name}\n📱 Phone: ${form.phone}\n🦷 Service: ${service}\n📆 Date: ${dateStr}\n🕐 Time: ${time}${form.message ? `\n💬 Message: ${form.message}` : ""}`;
    const whatsappUrl = `https://wa.me/${CLINIC_INFO.whatsapp}?text=${encodeURIComponent(summary)}`;
    window.open(whatsappUrl, "_blank");

    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    const dateStr = date!.toLocaleDateString("en-IN");
    return (
      <>
        <SEOHead title="Booking Confirmed | Shyam Dental Clinic Sribhumi" description="Your appointment booking at Shyam Dental Clinic Sribhumi has been confirmed." path="/booking" />
        <section className="section-padding">
          <div className="container-dental flex min-h-[60vh] items-center justify-center">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card-dental mx-auto max-w-lg text-center">
              <CheckCircle className="mx-auto mb-4 h-16 w-16 text-accent" />
              <h1 className="mb-2 font-display text-2xl font-bold text-foreground">Booking Confirmed!</h1>
              <p className="mb-6 text-muted-foreground">Thank you, {form.name}. We'll contact you shortly to confirm your appointment.</p>
              <div className="mb-6 rounded-xl bg-muted p-4 text-left text-sm space-y-1">
                <p className="text-foreground"><strong>Service:</strong> {service}</p>
                <p className="text-foreground"><strong>Date:</strong> {dateStr}</p>
                <p className="text-foreground"><strong>Time:</strong> {time}</p>
                <p className="text-foreground"><strong>Name:</strong> {form.name}</p>
                <p className="text-foreground"><strong>Phone:</strong> {form.phone}</p>
                {form.message && <p className="text-foreground"><strong>Message:</strong> {form.message}</p>}
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <a href={`https://wa.me/${CLINIC_INFO.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="whatsapp" className="gap-2"><MessageCircle className="h-4 w-4" /> Chat on WhatsApp</Button>
                </a>
                <a href={`tel:${CLINIC_INFO.phone}`}>
                  <Button variant="call" className="gap-2"><Phone className="h-4 w-4" /> Call Clinic</Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEOHead title="Book Appointment | Shyam Dental Clinic Sribhumi" description="Book your dental appointment at Shyam Dental Clinic in Sribhumi, Assam. No login required. Quick and easy booking." path="/booking" />

      <section className="section-padding">
        <div className="container-dental">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 text-center">
              <h1 className="mb-2 font-display text-3xl font-bold text-foreground md:text-4xl">Book Your Appointment</h1>
              <p className="text-muted-foreground">No login needed • Book in under 1 minute</p>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-dental space-y-6">

              {/* Full Name */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Full Name *</label>
                <input
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>

              {/* Mobile Number */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Mobile Number *</label>
                <input
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  type="tel"
                />
                {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
              </div>

              {/* Select Service */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Select Service *</label>
                <select
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                >
                  <option value="">-- Choose a service --</option>
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                  ))}
                </select>
                {errors.service && <p className="mt-1 text-xs text-destructive">{errors.service}</p>}
              </div>

              {/* Select Date */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Select Date *</label>
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => setDate(d)}
                    disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0)) || d.getDay() === 0}
                    className="pointer-events-auto rounded-xl border border-border p-3"
                  />
                </div>
                {errors.date && <p className="mt-1 text-center text-xs text-destructive">{errors.date}</p>}
              </div>

              {/* Select Time Slot */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Select Time Slot *</label>
                {!date ? (
                  <p className="text-sm text-muted-foreground">Please select a date first</p>
                ) : loadingSlots ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" /> Checking available slots...
                  </div>
                ) : availableSlots.length === 0 ? (
                  <p className="text-sm text-destructive">No slots available for this date. Please choose another date.</p>
                ) : (
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {availableSlots.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTime(t)}
                        className={cn(
                          "flex items-center justify-center gap-1 rounded-lg border-2 p-2.5 text-sm transition-colors hover:border-primary",
                          time === t ? "border-primary bg-primary/10 font-semibold text-primary" : "border-border text-foreground"
                        )}
                      >
                        <Clock className="h-3 w-3" /> {t}
                      </button>
                    ))}
                  </div>
                )}
                {errors.time && <p className="mt-1 text-xs text-destructive">{errors.time}</p>}
              </div>

              {/* Message / Symptoms */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Message / Symptoms (optional)</label>
                <textarea
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe your symptoms or concerns"
                  rows={3}
                />
              </div>

              {/* Submit */}
              <Button
                variant="hero"
                className="w-full gap-2 text-base"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Booking...</>
                ) : (
                  <><CalendarDays className="h-4 w-4" /> Confirm & Book via WhatsApp</>
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookingPage;
