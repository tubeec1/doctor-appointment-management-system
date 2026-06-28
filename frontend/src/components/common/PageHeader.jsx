import Container from "./Container";

const PageHeader = ({ title, description }) => {
  return (
    <section className="border-b border-slate-200 bg-white py-16">
      <Container>
        <h1 className="text-4xl font-bold text-slate-900">{title}</h1>

        <p className="mt-3 max-w-2xl text-slate-600">{description}</p>
      </Container>
    </section>
  );
};

export default PageHeader;
