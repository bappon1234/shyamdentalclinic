import { CLINIC_INFO } from "@/lib/constants";

const SchemaMarkup = () => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Dentist", "LocalBusiness", "MedicalBusiness"],
        "@id": "https://shyamdentalclinic.com/#dentist",
        name: CLINIC_INFO.name,
        image: "https://shyamdentalclinic.com/hero-clinic.jpg",
        url: "https://shyamdentalclinic.com",
        telephone: CLINIC_INFO.phone,
        email: CLINIC_INFO.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Main Road",
          addressLocality: "Sribhumi",
          addressRegion: "Assam",
          addressCountry: "IN",
        },
        geo: { "@type": "GeoCoordinates", latitude: "24.68", longitude: "92.35" },
        openingHoursSpecification: [
          { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Friday","Saturday","Sunday"], opens: "11:00", closes: "20:00" },
          { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "11:00", closes: "18:00" },
        ],
        priceRange: "₹₹",
        medicalSpecialty: "Dentistry",
        description: "Best dental clinic in Sribhumi, Assam. Dr. Pritam Ghosh offers dental implants, root canal, teeth whitening, and more.",
        founder: {
          "@type": "Person",
          name: "Dr. Pritam Ghosh",
          jobTitle: "Dental Surgeon",
        },
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "150" },
      },
      {
        "@type": "FAQPage",
        "@id": "https://shyamdentalclinic.com/faq#faq",
        mainEntity: [
          { "@type": "Question", name: "Is root canal treatment painful?", acceptedAnswer: { "@type": "Answer", text: "Modern root canal treatment is virtually painless with advanced anesthesia." } },
          { "@type": "Question", name: "How long do dental implants last?", acceptedAnswer: { "@type": "Answer", text: "With proper care, dental implants can last a lifetime." } },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default SchemaMarkup;
