import Section from "@/layouts/Section";

export default function NotFound() {
  return (
    <Section className="flex flex-1 items-center justify-center">
      <div className="text-center">
        <div className="mb-4 text-xl">404 Not Found</div>
        <a href="/" className="text-sm underline">
          Go to home page
        </a>
      </div>
    </Section>
  );
}
