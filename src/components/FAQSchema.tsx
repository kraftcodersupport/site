import { getFAQSchema, JsonLd } from "@/lib/jsonld";

interface FAQSchemaProps {
  faqs: { question: string; answer: string }[];
}

export default function FAQSchema({ faqs }: FAQSchemaProps) {
  if (!faqs || faqs.length === 0) return null;
  return <JsonLd data={getFAQSchema(faqs)} />;
}
