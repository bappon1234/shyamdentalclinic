import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { FAQS } from "@/lib/constants";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const FAQPage = () => (
  <>
    <SEOHead
      title="Dental FAQ | Shyam Dental Clinic Sribhumi, Assam"
      description="Frequently asked questions about dental treatments at Shyam Dental Clinic Sribhumi. Learn about root canal, implants, whitening, cleaning & more."
      path="/faq"
    />
    <section className="section-padding">
      <div className="container-dental">
        <div className="mb-12 text-center">
          <h1 className="mb-3 font-display text-3xl font-bold text-foreground md:text-5xl">Frequently Asked Questions</h1>
          <p className="text-muted-foreground">Find answers to common dental questions</p>
        </div>
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="card-dental overflow-hidden border-none">
                <AccordionTrigger className="px-0 font-display text-base font-semibold text-foreground hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
        <div className="mt-12 text-center">
          <p className="mb-4 text-muted-foreground">Have more questions? Contact us or book a consultation!</p>
          <Link to="/booking"><Button variant="hero" size="lg" className="gap-2"><CalendarDays className="h-5 w-5" /> Book Appointment</Button></Link>
        </div>
      </div>
    </section>
  </>
);

export default FAQPage;
