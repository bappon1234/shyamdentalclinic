import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, CheckCircle, MessageCircle, Phone, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import SEOHead from "@/components/SEOHead";
import { SERVICES, CLINIC_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";

const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
];

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get("service") || "";

  const [step, setStep] = useState(preselectedService ? 2 : 1);
  const [service, setService] = useState(preselectedService);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [isEmergency, setIsEmergency] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", age: "", message: "", callback: false });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    else if (!/^[6-9]\d{9}$/.test(form.phone.trim())) e.phone = "Enter a valid 10-digit mobile number";
    if (!form.age.trim()) e.age = "Age is required";
    else if (isNaN(Number(form.age)) || Number(form.age) < 1 || Number(form.age) > 120) e.age = "Enter a valid age";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setSubmitted(true);
  };

  if (submitted) {
    const summary = `Service: ${service}\nDate: ${date?.toLocaleDateString()}\nTime: ${time}\nName: ${form.name}\nPhone: ${form.phone}${form.email ? `\nEmail: ${form.email}` : ""}\nAge: ${form.age}${form.message ? `\nMessage: ${form.message}` : ""}${isEmergency ? "\n⚠️ EMERGENCY REQUEST" : ""}`;

    return (
      <>
        <SEOHead title="Booking Confirmed | Shyam Dental Clinic Sribhumi" description="Your appointment booking at Shyam Dental Clinic Sribhumi has been confirmed." path="/booking" />
        <section className="section-padding">
          <div className="container-dental flex min-h-[60vh] items-center justify-center">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card-dental mx-auto max-w-lg text-center">
              <CheckCircle className="mx-auto mb-4 h-16 w-16 text-accent" />
              <h1 className="mb-2 font-display text-2xl font-bold text-foreground">Booking Confirmed!</h1>
              <p className="mb-6 text-muted-foreground">Thank you, {form.name}. We'll contact you shortly to confirm your appointment.</p>
              <div className="mb-6 rounded-xl bg-muted p-4 text-left text-sm">
                <pre className="whitespace-pre-wrap font-body text-foreground">{summary}</pre>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <a href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=${encodeURIComponent("Appointment Booking:\n" + summary)}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="whatsapp" className="gap-2"><MessageCircle className="h-4 w-4" /> Confirm via WhatsApp</Button>
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
      <SEOHead title="Book Appointment | Shyam Dental Clinic Sribhumi" description="Book your dental appointment at Shyam Dental Clinic in Sribhumi, Assam. No login required. Quick and easy booking in under 1 minute." path="/booking" />

      <section className="section-padding">
        <div className="container-dental">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 text-center">
              <h1 className="mb-2 font-display text-3xl font-bold text-foreground md:text-4xl">Book Your Appointment</h1>
              <p className="text-muted-foreground">No login needed • Book in under 1 minute</p>
            </div>

            {/* Emergency toggle */}
            <div className="mb-6">
              <button
                onClick={() => setIsEmergency(!isEmergency)}
                className={cn("flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-colors", isEmergency ? "border-destructive bg-destructive/5" : "border-border")}
              >
                <AlertTriangle className={cn("h-5 w-5", isEmergency ? "text-destructive" : "text-muted-foreground")} />
                <div>
                  <p className="text-sm font-semibold text-foreground">Emergency Appointment</p>
                  <p className="text-xs text-muted-foreground">Need urgent dental care? Mark this for priority scheduling</p>
                </div>
              </button>
            </div>

            {/* Steps indicator */}
            <div className="mb-8 flex items-center justify-center gap-2">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className={cn("flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors", step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                  {s}
                </div>
              ))}
            </div>

            {/* Step 1: Service */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="mb-4 font-display text-xl font-semibold text-foreground">Select Service</h2>
                <div className="grid gap-2 sm:grid-cols-2">
                  {SERVICES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => { setService(s.title); setStep(2); }}
                      className={cn("rounded-xl border-2 p-3 text-left text-sm transition-colors hover:border-primary", service === s.title ? "border-primary bg-dental-blue-light" : "border-border")}
                    >
                      <span className="font-medium text-foreground">{s.title}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Date */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="mb-4 font-display text-xl font-semibold text-foreground">Choose Date</h2>
                <p className="mb-2 text-sm text-muted-foreground">Selected service: <strong className="text-foreground">{service}</strong></p>
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => { setDate(d); if (d) setStep(3); }}
                    disabled={(d) => d < new Date() || d.getDay() === 0}
                    className="pointer-events-auto rounded-xl border border-border p-3"
                  />
                </div>
                <Button variant="outline" className="mt-4" onClick={() => setStep(1)}>Back</Button>
              </motion.div>
            )}

            {/* Step 3: Time */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="mb-4 font-display text-xl font-semibold text-foreground">Choose Time Slot</h2>
                <p className="mb-4 text-sm text-muted-foreground">{date?.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {TIME_SLOTS.map((t) => (
                    <button
                      key={t}
                      onClick={() => { setTime(t); setStep(4); }}
                      className={cn("flex items-center justify-center gap-1 rounded-lg border-2 p-2 text-sm transition-colors hover:border-primary", time === t ? "border-primary bg-dental-blue-light" : "border-border")}
                    >
                      <Clock className="h-3 w-3" /> {t}
                    </button>
                  ))}
                </div>
                <Button variant="outline" className="mt-4" onClick={() => setStep(2)}>Back</Button>
              </motion.div>
            )}

            {/* Step 4: Details */}
            {step === 4 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="mb-4 font-display text-xl font-semibold text-foreground">Your Details</h2>
                <div className="mb-4 rounded-xl bg-muted p-3 text-sm text-muted-foreground">
                  {service} • {date?.toLocaleDateString()} • {time}
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">Full Name *</label>
                    <input className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
                    {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">Mobile Number *</label>
                    <input className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="10-digit mobile number" maxLength={10} />
                    {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-foreground">Age *</label>
                      <input className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} placeholder="Age" />
                      {errors.age && <p className="mt-1 text-xs text-destructive">{errors.age}</p>}
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-foreground">Email (optional)</label>
                      <input className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email address" type="email" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">Message / Symptoms (optional)</label>
                    <textarea className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Describe your symptoms or concerns" rows={3} />
                  </div>
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <input type="checkbox" checked={form.callback} onChange={(e) => setForm({ ...form, callback: e.target.checked })} className="rounded" />
                    Request a callback before appointment
                  </label>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep(3)}>Back</Button>
                    <Button variant="hero" className="flex-1 gap-2" onClick={handleSubmit}>
                      <CalendarDays className="h-4 w-4" /> Confirm Booking
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BookingPage;
