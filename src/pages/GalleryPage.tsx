import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import heroImg from "@/assets/hero-clinic.jpg";
import clinicImg from "@/assets/clinic-interior.jpg";
import doctorImg from "@/assets/doctor.png";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const images = [
  { src: heroImg, alt: "Modern dental treatment room at Shyam Dental Clinic Sribhumi" },
  { src: clinicImg, alt: "Welcoming reception area at Shyam Dental Clinic" },
  { src: doctorImg, alt: "Dr. Pritam Ghosh - Dental Surgeon" },
  { src: heroImg, alt: "Advanced dental equipment and technology" },
  { src: clinicImg, alt: "Comfortable patient waiting area" },
  { src: doctorImg, alt: "Dr. Ghosh with patient consultation" },
];

const GalleryPage = () => (
  <>
    <SEOHead
      title="Clinic Gallery | Shyam Dental Clinic Sribhumi"
      description="View photos of Shyam Dental Clinic & Implant Center, Sribhumi. See our modern facilities, equipment, and welcoming environment."
      path="/gallery"
    />
    <section className="section-padding">
      <div className="container-dental">
        <div className="mb-12 text-center">
          <h1 className="mb-3 font-display text-3xl font-bold text-foreground md:text-5xl">Clinic Gallery</h1>
          <p className="text-muted-foreground">Take a look at our modern clinic and facilities</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }} className="overflow-hidden rounded-2xl">
              <img src={img.src} alt={img.alt} className="aspect-[4/3] w-full object-cover transition-transform duration-300 hover:scale-105" loading="lazy" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default GalleryPage;
