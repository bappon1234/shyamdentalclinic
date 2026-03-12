import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CalendarDays, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { SERVICES } from "@/lib/constants";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const ServicesPage = () => (
  <>
    <SEOHead
      title="Dental Services in Sribhumi | Implants, Root Canal, Whitening"
      description="Complete dental services at Shyam Dental Clinic Sribhumi. Dental implants, root canal, teeth whitening, cleaning, crowns, veneers, oral surgery & more by Dr. Pritam Ghosh."
      path="/services"
    />

    <section className="section-padding pb-8">
      <div className="container-dental text-center">
        <h1 className="mb-4 font-display text-3xl font-bold text-foreground md:text-5xl">Our Dental Services</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
          Comprehensive dental care for the whole family in Sribhumi, Assam. From preventive care to advanced procedures.
        </p>
      </div>
    </section>

    <section className="section-padding pt-0">
      <div className="container-dental space-y-8">
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.id}
            id={service.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="card-dental scroll-mt-24"
          >
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h2 className="mb-3 font-display text-xl font-bold text-foreground md:text-2xl">{service.title}</h2>
                <p className="mb-4 text-muted-foreground">{service.shortDesc}</p>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <h3 className="mb-1 text-sm font-semibold text-foreground">Who Needs It</h3>
                    <p className="text-sm text-muted-foreground">{service.whoNeeds}</p>
                  </div>
                  <div>
                    <h3 className="mb-1 text-sm font-semibold text-foreground">Benefits</h3>
                    <p className="text-sm text-muted-foreground">{service.benefits}</p>
                  </div>
                  <div>
                    <h3 className="mb-1 text-sm font-semibold text-foreground">Process</h3>
                    <p className="text-sm text-muted-foreground">{service.process}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center lg:justify-end">
                <Link to={`/booking?service=${encodeURIComponent(service.title)}`}>
                  <Button variant="hero" className="gap-2">
                    <CalendarDays className="h-4 w-4" /> Book Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  </>
);

export default ServicesPage;
