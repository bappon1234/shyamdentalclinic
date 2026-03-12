import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { CLINIC_INFO } from "@/lib/constants";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Required";
    if (!form.phone.trim()) errs.phone = "Required";
    else if (!/^[6-9]\d{9}$/.test(form.phone.trim())) errs.phone = "Invalid number";
    if (!form.message.trim()) errs.message = "Required";
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSent(true);
  };

  return (
    <>
      <SEOHead
        title="Contact Us | Shyam Dental Clinic Sribhumi, Assam"
        description="Contact Shyam Dental Clinic & Implant Center, Sribhumi. Call, WhatsApp, or visit us. Dr. Pritam Ghosh - dentist in Sribhumi, Assam."
        path="/contact"
      />
      <section className="section-padding">
        <div className="container-dental">
          <div className="mb-12 text-center">
            <h1 className="mb-3 font-display text-3xl font-bold text-foreground md:text-5xl">Contact Us</h1>
            <p className="text-muted-foreground">We'd love to hear from you. Reach out anytime!</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Info */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="space-y-6">
              <div className="card-dental">
                <h2 className="mb-6 font-display text-xl font-semibold text-foreground">Get in Touch</h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-dental-blue-light"><MapPin className="h-5 w-5 text-primary" /></div>
                    <div>
                      <p className="font-semibold text-foreground">Address</p>
                      <p className="text-sm text-muted-foreground">{CLINIC_INFO.address}</p>
                    </div>
                  </div>
                  <a href={`tel:${CLINIC_INFO.phone}`} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-dental-green-light"><Phone className="h-5 w-5 text-accent" /></div>
                    <div>
                      <p className="font-semibold text-foreground">Phone</p>
                      <p className="text-sm text-muted-foreground">{CLINIC_INFO.phone}</p>
                    </div>
                  </a>
                  <a href={`https://wa.me/${CLINIC_INFO.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: "hsl(142, 70%, 94%)" }}><MessageCircle className="h-5 w-5" style={{ color: "hsl(142, 70%, 45%)" }} /></div>
                    <div>
                      <p className="font-semibold text-foreground">WhatsApp</p>
                      <p className="text-sm text-muted-foreground">Message us for quick response</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-dental-blue-light"><Clock className="h-5 w-5 text-primary" /></div>
                    <div>
                      <p className="font-semibold text-foreground">Clinic Hours</p>
                      <p className="text-sm text-muted-foreground">Mon–Fri: {CLINIC_INFO.hours.weekdays}</p>
                      <p className="text-sm text-muted-foreground">Sat: {CLINIC_INFO.hours.saturday}</p>
                      <p className="text-sm text-muted-foreground">Sun: {CLINIC_INFO.hours.sunday}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency */}
              <div className="card-dental gradient-primary">
                <h3 className="mb-2 font-display text-lg font-semibold text-primary-foreground">Dental Emergency?</h3>
                <p className="mb-4 text-sm text-primary-foreground/85">Don't wait — call us immediately for urgent dental care.</p>
                <a href={`tel:${CLINIC_INFO.phone}`}>
                  <Button className="gap-2 bg-background text-foreground hover:bg-background/90 font-semibold">
                    <Phone className="h-4 w-4" /> Call Emergency Line
                  </Button>
                </a>
              </div>
            </motion.div>

            {/* Form + Map */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }} className="space-y-6">
              <div className="card-dental">
                {sent ? (
                  <div className="text-center py-8">
                    <CheckCircle className="mx-auto mb-4 h-12 w-12 text-accent" />
                    <h3 className="mb-2 font-display text-xl font-semibold text-foreground">Message Sent!</h3>
                    <p className="text-muted-foreground">We'll get back to you shortly.</p>
                  </div>
                ) : (
                  <>
                    <h2 className="mb-6 font-display text-xl font-semibold text-foreground">Send a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <input className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" placeholder="Your Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                      </div>
                      <div>
                        <input className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" placeholder="Mobile Number *" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={10} />
                        {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
                      </div>
                      <input className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" placeholder="Email (optional)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" />
                      <div>
                        <textarea className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" placeholder="Your Message *" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} />
                        {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                      </div>
                      <Button variant="hero" type="submit" className="w-full gap-2">
                        <Send className="h-4 w-4" /> Send Message
                      </Button>
                    </form>
                  </>
                )}
              </div>

              <div className="overflow-hidden rounded-2xl">
                <iframe
                  src={CLINIC_INFO.mapUrl}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Shyam Dental Clinic Location"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
