import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays, CheckCircle, MessageCircle, Phone, Clock,
  Loader2, ArrowLeft, ArrowRight, User, Smartphone, Stethoscope
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import SEOHead from "@/components/SEOHead";
import { SERVICES, CLINIC_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";

const TIME_SLOTS = [
  "11:00","11:30",
  "12:00","12:30",
  "13:00","13:30",
  "14:00","14:30","15:00","15:30",
  "16:00","16:30","17:00","17:30",
  "18:00","18:30","19:00","19:30",
];

// Replace with your deployed Google Apps Script web app URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbylYdv04DqwvBV-TmNzXdzDi5N7XvAGzSKiW8X_z9Cfs72g_KCoarrjfIKJo4Am9VeOLg/exec";

const STEPS = [
  { label: "Service", icon: Stethoscope },
  { label: "Date & Time", icon: CalendarDays },
  { label: "Details", icon: User },
  { label: "Confirm", icon: CheckCircle },
];

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get("service") || "";

  const [step, setStep] = useState(preselectedService ? 1 : 0);
  const [service, setService] = useState(preselectedService);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch booked slots from Google Sheets when date changes
// fetchBookedSlots ke andar ye logic check karein
const fetchBookedSlots = useCallback(async (selectedDate: Date) => {
  setLoadingSlots(true);
  try {
    // Local Timezone adjustment ke saath date bhein
    const offset = selectedDate.getTimezoneOffset();
    const adjustedDate = new Date(selectedDate.getTime() - (offset * 60 * 1000));
    const dateStr = adjustedDate.toLocaleDateString("en-CA");

    const res = await fetch(
      `${GOOGLE_SCRIPT_URL}?action=getBookedSlots&date=${dateStr}`
    );
    const data = await res.json();
    
    // Normalize string matching
    const normalizedFromAPI = (data.bookedSlots || []).map((slot: string) => slot.trim());
    setBookedSlots(normalizedFromAPI);
  } catch (err) {
    console.error("Fetch error:", err);
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

const availableSlots = TIME_SLOTS.filter((slot) => {
  return !bookedSlots.includes(slot);
});

  const canGoNext = () => {
    switch (step) {
      case 0: return !!service;
      case 1: return !!date && !!time;
      case 2: return !!form.name.trim() && /^[6-9]\d{9}$/.test(form.phone.trim());
      default: return true;
    }
  };

  const validateStep = () => {
    const e: Record<string, string> = {};
    if (step === 0 && !service) e.service = "Please select a service";
    if (step === 1) {
      if (!date) e.date = "Please select a date";
      if (!time) e.time = "Please select a time slot";
    }
    if (step === 2) {
      if (!form.name.trim()) e.name = "Name is required";
      if (!form.phone.trim()) e.phone = "Phone is required";
      else if (!/^[6-9]\d{9}$/.test(form.phone.trim())) e.phone = "Enter a valid 10-digit mobile number";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, 3));
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    setSubmitting(true);
    const dateStr = date!.toLocaleDateString("en-CA");

    const bookingData = {
      name: form.name,
      phone: form.phone,
      service,
      date: dateStr,
      time,
      message: form.message,
    };

    // Save to Google Sheets
    
      try {
        const formData = new URLSearchParams();

formData.append("name", form.name);
formData.append("phone", form.phone);
formData.append("service", service);
formData.append("date", dateStr);
formData.append("time", time);
formData.append("message", form.message);

        const res = await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          // headers: { "Content-Type": "application/json" },
          // body: JSON.stringify({ action: "bookAppointment", ...bookingData }),
          body: formData
        });
        const result = await res.json();
        if (result.status === "conflict") {
          setErrors({ time: "This slot was just booked. Please choose another." });
          await fetchBookedSlots(date!);
          setStep(1);
          setSubmitting(false);
          return;
        }
      } catch {
        // Continue to WhatsApp even if sheet save fails
      }
    

    // Redirect to WhatsApp
    const summary = `📅 *Appointment Booking*\n\n👤 Name: ${form.name}\n📱 Phone: ${form.phone}\n🦷 Service: ${service}\n📆 Date: ${dateStr}\n🕐 Time: ${time}${form.message ? `\n💬 Message: ${form.message}` : ""}`;
    const whatsappUrl = `https://wa.me/${CLINIC_INFO.whatsapp}?text=${encodeURIComponent(summary)}`;
    window.open(whatsappUrl, "_blank");

    setSubmitting(false);
    setSubmitted(true);
  };

  // Confirmation page
  if (submitted) {
    const dateStr = date!.toISOString().split("T")[0];
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

            {/* Step Indicator */}
            <div className="mb-8 flex items-center justify-center gap-1 sm:gap-2">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                const isActive = i === step;
                const isDone = i < step;
                return (
                  <div key={i} className="flex items-center gap-1 sm:gap-2">
                    <div
                      className={cn(
                        "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm",
                        isActive && "bg-primary text-primary-foreground",
                        isDone && "bg-primary/20 text-primary",
                        !isActive && !isDone && "bg-muted text-muted-foreground"
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">{s.label}</span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className={cn("h-0.5 w-4 sm:w-8 rounded", i < step ? "bg-primary" : "bg-border")} />
                    )}
                  </div>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.2 }}
                className="card-dental"
              >
                {/* Step 0: Select Service */}
                {step === 0 && (
                  <div className="space-y-4">
                    <h2 className="font-display text-xl font-semibold text-foreground">Select a Service</h2>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {SERVICES.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setService(s.title)}
                          className={cn(
                            "rounded-xl border-2 p-3 text-left text-sm transition-all hover:border-primary",
                            service === s.title
                              ? "border-primary bg-primary/5 font-semibold text-primary"
                              : "border-border text-foreground"
                          )}
                        >
                          <span className="mr-2">{s.icon}</span> {s.title}
                        </button>
                      ))}
                    </div>
                    {errors.service && <p className="text-xs text-destructive">{errors.service}</p>}
                  </div>
                )}

                {/* Step 1: Date & Time */}
                {step === 1 && (
                  <div className="space-y-5">
                    <h2 className="font-display text-xl font-semibold text-foreground">Choose Date & Time</h2>

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
                  </div>
                )}

                {/* Step 2: Patient Details */}
                {step === 2 && (
                  <div className="space-y-4">
                    <h2 className="font-display text-xl font-semibold text-foreground">Your Details</h2>

                    <div>
                      <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-foreground">
                        <User className="h-3.5 w-3.5" /> Full Name *
                      </label>
                      <input
                        className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Enter your full name"
                      />
                      {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-foreground">
                        <Smartphone className="h-3.5 w-3.5" /> Mobile Number *
                      </label>
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
                  </div>
                )}

                {/* Step 3: Review & Confirm */}
                {step === 3 && (
                  <div className="space-y-4">
                    <h2 className="font-display text-xl font-semibold text-foreground">Review & Confirm</h2>
                    <div className="rounded-xl bg-muted p-4 text-sm space-y-2">
                      <p className="text-foreground"><strong>🦷 Service:</strong> {service}</p>
                      <p className="text-foreground"><strong>📆 Date:</strong> {date?.toLocaleDateString("en-IN")}</p>
                      <p className="text-foreground"><strong>🕐 Time:</strong> {time}</p>
                      <p className="text-foreground"><strong>👤 Name:</strong> {form.name}</p>
                      <p className="text-foreground"><strong>📱 Phone:</strong> {form.phone}</p>
                      {form.message && <p className="text-foreground"><strong>💬 Message:</strong> {form.message}</p>}
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      Clicking "Confirm" will open WhatsApp to send your booking details to the clinic.
                    </p>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-6 flex items-center justify-between gap-3">
                  {step > 0 ? (
                    <Button variant="outline" onClick={handleBack} className="gap-2">
                      <ArrowLeft className="h-4 w-4" /> Back
                    </Button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <Button variant="hero" onClick={handleNext} disabled={!canGoNext()} className="gap-2">
                      Next <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="hero"
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="gap-2"
                    >
                      {submitting ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> Booking...</>
                      ) : (
                        <><MessageCircle className="h-4 w-4" /> Confirm & Book via WhatsApp</>
                      )}
                    </Button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookingPage;
