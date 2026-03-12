import { motion } from "framer-motion";
import { Star, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { TESTIMONIALS } from "@/lib/constants";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const ReviewsPage = () => (
  <>
    <SEOHead
      title="Patient Reviews | Shyam Dental Clinic Sribhumi"
      description="Read real patient reviews of Shyam Dental Clinic & Implant Center, Sribhumi. See why patients trust Dr. Pritam Ghosh for dental care."
      path="/reviews"
    />
    <section className="section-padding">
      <div className="container-dental">
        <div className="mb-12 text-center">
          <h1 className="mb-3 font-display text-3xl font-bold text-foreground md:text-5xl">Patient Reviews</h1>
          <p className="text-muted-foreground">Real experiences from happy patients in Sribhumi</p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-primary text-primary" />)}</div>
            <span className="font-semibold text-foreground">4.9/5</span>
            <span className="text-muted-foreground">({TESTIMONIALS.length * 25}+ reviews)</span>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }} className="card-dental">
              <div className="mb-3 flex gap-1">{Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="h-4 w-4 fill-primary text-primary" />)}</div>
              <p className="mb-4 text-sm text-muted-foreground italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-dental-blue-light font-display text-sm font-bold text-primary">
                  {t.name.charAt(0)}
                </div>
                <p className="font-display text-sm font-semibold text-foreground">{t.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="mb-4 text-muted-foreground">Happy with our service? Book your next visit!</p>
          <Link to="/booking"><Button variant="hero" size="lg" className="gap-2"><CalendarDays className="h-5 w-5" /> Book Appointment</Button></Link>
        </div>
      </div>
    </section>
  </>
);

export default ReviewsPage;
