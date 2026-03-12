import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, MessageCircle, CalendarDays, Award, Cpu, Heart, BookOpen, Star, MapPin, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { CLINIC_INFO, SERVICES, TESTIMONIALS, FAQS } from "@/lib/constants";
import heroImg from "@/assets/hero-clinic.jpg";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const HomePage = () => (
  <>
    <SEOHead
      title="Best Dentist in Sribhumi | Shyam Dental Clinic & Implant Center"
      description="Trusted dental care in Sribhumi, Assam by Dr. Pritam Ghosh. Dental implants, root canal, teeth whitening, cleaning & more. Book appointment today!"
      path="/"
    />

    {/* Hero */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Modern dental clinic interior at Shyam Dental Clinic Sribhumi" className="h-full w-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-foreground/60" />
      </div>
      <div className="container-dental relative z-10 px-4 py-20 md:px-8 md:py-32 lg:py-40">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }} className="max-w-2xl">
          <span className="mb-4 inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-sm">
            🦷 Sribhumi's Most Trusted Dental Clinic
          </span>
          <h1 className="mb-4 font-display text-3xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
            Trusted Dental Care in Sribhumi by Dr. Pritam Ghosh
          </h1>
          <p className="mb-8 text-lg text-primary-foreground/85 md:text-xl">
            Modern treatments, gentle care, and advanced technology — your family's smile is in expert hands.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/booking">
              <Button variant="hero" size="lg" className="gap-2 text-base">
                <CalendarDays className="h-5 w-5" /> Book Appointment
              </Button>
            </Link>
            <a href={`tel:${CLINIC_INFO.phone}`}>
              <Button variant="call" size="lg" className="gap-2 text-base">
                <Phone className="h-5 w-5" /> Call Now
              </Button>
            </a>
            <a href={`https://wa.me/${CLINIC_INFO.whatsapp}`} target="_blank" rel="noopener noreferrer">
              <Button variant="whatsapp" size="lg" className="gap-2 text-base">
                <MessageCircle className="h-5 w-5" /> WhatsApp
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Highlight Cards */}
    <section className="container-dental -mt-12 relative z-20 px-4 md:px-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Award, title: "Experienced Dentist", desc: "Years of expertise by Dr. Pritam Ghosh" },
          { icon: Cpu, title: "Modern Equipment", desc: "State-of-the-art dental technology" },
          { icon: Heart, title: "Gentle Treatment", desc: "Comfortable, pain-free procedures" },
          { icon: BookOpen, title: "Easy Booking", desc: "Book in under 1 minute, no login needed" },
        ].map((item, i) => (
          <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1, duration: 0.5 }} className="card-dental flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-dental-blue-light">
              <item.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-base font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Clinic Intro */}
    <section className="section-padding">
      <div className="container-dental text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}>
          <h2 className="mb-4 font-display text-2xl font-bold text-foreground md:text-4xl">
            Welcome to {CLINIC_INFO.name}
          </h2>
          <p className="mx-auto max-w-3xl text-muted-foreground md:text-lg">
            Located in the heart of Sribhumi, Assam, our clinic offers comprehensive dental care for the entire family.
            Led by {CLINIC_INFO.doctor}, we combine modern technology with a gentle, patient-first approach to deliver
            outstanding results. From routine check-ups to advanced dental implants, we're here for your smile.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Featured Services */}
    <section className="section-alt section-padding">
      <div className="container-dental">
        <div className="mb-12 text-center">
          <h2 className="mb-3 font-display text-2xl font-bold text-foreground md:text-4xl">Our Dental Services</h2>
          <p className="text-muted-foreground">Comprehensive dental care for every need</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.slice(0, 8).map((s, i) => (
            <motion.div key={s.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.05, duration: 0.5 }}>
              <Link to={`/services#${s.id}`} className="card-dental block h-full">
                <h3 className="mb-2 font-display text-base font-semibold text-foreground">{s.title}</h3>
                <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{s.shortDesc}</p>
                <span className="inline-flex items-center text-sm font-medium text-primary">
                  Learn more <ChevronRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/services">
            <Button variant="outline" size="lg">View All Services</Button>
          </Link>
        </div>
      </div>
    </section>

    {/* Why Choose Us */}
    <section className="section-padding">
      <div className="container-dental">
        <div className="mb-12 text-center">
          <h2 className="mb-3 font-display text-2xl font-bold text-foreground md:text-4xl">Why Choose Shyam Dental Clinic?</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Expert Care", desc: "Dr. Pritam Ghosh brings years of experience and advanced training in dental implants and cosmetic dentistry." },
            { title: "Patient Comfort First", desc: "We use gentle techniques and modern anesthesia so every visit is comfortable and stress-free." },
            { title: "Affordable Quality", desc: "Premium dental care at honest, transparent pricing. Flexible payment options available." },
          ].map((item, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }} className="card-dental text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-dental-green-light">
                <Star className="h-7 w-7 text-accent" />
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="section-alt section-padding">
      <div className="container-dental">
        <div className="mb-12 text-center">
          <h2 className="mb-3 font-display text-2xl font-bold text-foreground md:text-4xl">What Our Patients Say</h2>
          <p className="text-muted-foreground">Real experiences from our happy patients in Sribhumi</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.slice(0, 3).map((t, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }} className="card-dental">
              <div className="mb-3 flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="mb-4 text-sm text-muted-foreground italic">"{t.text}"</p>
              <p className="font-display text-sm font-semibold text-foreground">{t.name}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/reviews"><Button variant="outline">Read All Reviews</Button></Link>
        </div>
      </div>
    </section>

    {/* FAQ Preview */}
    <section className="section-padding">
      <div className="container-dental">
        <div className="mb-12 text-center">
          <h2 className="mb-3 font-display text-2xl font-bold text-foreground md:text-4xl">Frequently Asked Questions</h2>
        </div>
        <div className="mx-auto max-w-3xl space-y-4">
          {FAQS.slice(0, 4).map((faq, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="card-dental">
              <h3 className="mb-2 font-display text-base font-semibold text-foreground">{faq.q}</h3>
              <p className="text-sm text-muted-foreground">{faq.a}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/faq"><Button variant="outline">View All FAQs</Button></Link>
        </div>
      </div>
    </section>

    {/* Map & Contact */}
    <section className="section-alt section-padding">
      <div className="container-dental">
        <div className="mb-12 text-center">
          <h2 className="mb-3 font-display text-2xl font-bold text-foreground md:text-4xl">Visit Our Clinic</h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl">
            <iframe
              src={CLINIC_INFO.mapUrl}
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Shyam Dental Clinic Location Sribhumi"
            />
          </div>
          <div className="flex flex-col justify-center gap-6">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-display font-semibold text-foreground">Address</p>
                <p className="text-sm text-muted-foreground">{CLINIC_INFO.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-display font-semibold text-foreground">Opening Hours</p>
                <p className="text-sm text-muted-foreground">Mon–Fri: {CLINIC_INFO.hours.weekdays}</p>
                <p className="text-sm text-muted-foreground">Saturday: {CLINIC_INFO.hours.saturday}</p>
                <p className="text-sm text-muted-foreground">Sunday: {CLINIC_INFO.hours.sunday}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/booking">
                <Button variant="hero" className="gap-2">
                  <CalendarDays className="h-4 w-4" /> Book Appointment
                </Button>
              </Link>
              <a href={`tel:${CLINIC_INFO.phone}`}>
                <Button variant="call" className="gap-2">
                  <Phone className="h-4 w-4" /> Call Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Emergency Banner */}
    <section className="gradient-primary section-padding py-12">
      <div className="container-dental text-center">
        <h2 className="mb-3 font-display text-2xl font-bold text-primary-foreground md:text-3xl">
          Dental Emergency? We're Here to Help!
        </h2>
        <p className="mb-6 text-primary-foreground/85">
          Call us immediately for urgent dental care in Sribhumi
        </p>
        <a href={`tel:${CLINIC_INFO.phone}`}>
          <Button size="lg" className="gap-2 bg-background text-foreground hover:bg-background/90 font-semibold">
            <Phone className="h-5 w-5" /> Call Emergency Line
          </Button>
        </a>
      </div>
    </section>
  </>
);

export default HomePage;
