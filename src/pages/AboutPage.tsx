import { motion } from "framer-motion";
import { Award, GraduationCap, Heart, Shield, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import doctorImg from "@/assets/doctor-portrait.jpg";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const AboutPage = () => (
  <>
    <SEOHead
      title="About Dr. Pritam Ghosh | Best Dentist in Sribhumi, Assam"
      description="Learn about Dr. Pritam Ghosh, experienced dental surgeon at Shyam Dental Clinic & Implant Center, Sribhumi. Expert in dental implants, root canal & cosmetic dentistry."
      path="/about"
    />

    <section className="section-padding">
      <div className="container-dental">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
            <div className="overflow-hidden rounded-3xl">
              <img src={doctorImg} alt="Dr. Pritam Ghosh - Dental Surgeon at Shyam Dental Clinic Sribhumi" className="w-full object-cover" loading="eager" />
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>
            <span className="mb-3 inline-block rounded-full bg-dental-blue-light px-4 py-1.5 text-sm font-medium text-primary">
              Meet Your Dentist
            </span>
            <h1 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
              Dr. Pritam Ghosh
            </h1>
            <p className="mb-2 text-lg font-medium text-primary">Dental Surgeon & Implant Specialist</p>
            <p className="mb-6 text-muted-foreground leading-relaxed">
              Dr. Pritam Ghosh is a highly skilled dental surgeon leading Shyam Dental Clinic & Implant Center
              in Sribhumi, Assam. With extensive training in modern dentistry, dental implantology, and cosmetic
              procedures, Dr. Ghosh is committed to providing the highest standard of dental care to patients
              of all ages.
            </p>
            <p className="mb-8 text-muted-foreground leading-relaxed">
              His patient-first philosophy ensures every treatment is comfortable, transparent, and tailored to
              individual needs. Whether it's a routine check-up or a complex implant procedure, Dr. Ghosh's
              gentle approach and expertise make every visit a positive experience.
            </p>

            <Link to="/booking">
              <Button variant="hero" size="lg" className="gap-2">
                <CalendarDays className="h-5 w-5" /> Book an Appointment
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Qualifications */}
    <section className="section-alt section-padding">
      <div className="container-dental">
        <h2 className="mb-12 text-center font-display text-2xl font-bold text-foreground md:text-4xl">
          Qualifications & Expertise
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: GraduationCap, title: "BDS Qualified", desc: "Bachelor of Dental Surgery from a premier institution" },
            { icon: Award, title: "Implant Specialist", desc: "Advanced training in dental implant procedures" },
            { icon: Heart, title: "Patient-First Care", desc: "Compassionate approach to every treatment" },
            { icon: Shield, title: "Modern Techniques", desc: "Uses latest dental technology and methods" },
          ].map((item, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }} className="card-dental text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-dental-green-light">
                <item.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 font-display text-base font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Mission */}
    <section className="section-padding">
      <div className="container-dental mx-auto max-w-3xl text-center">
        <h2 className="mb-6 font-display text-2xl font-bold text-foreground md:text-4xl">Our Mission</h2>
        <p className="mb-4 text-lg text-muted-foreground leading-relaxed">
          At Shyam Dental Clinic, our mission is to make quality dental care accessible to every family in
          Sribhumi and surrounding areas. We believe that a healthy, beautiful smile should be within
          everyone's reach.
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed">
          We are committed to using the latest dental technology, maintaining the highest hygiene standards,
          and creating a warm, welcoming environment where patients feel comfortable and cared for.
        </p>
      </div>
    </section>
  </>
);

export default AboutPage;
