const SectionTitle = ({ title, subtitle, center = true }) => {
  return (
    <div className={`mb-12 ${center ? "text-center" : "text-left"}`}>
      <p className="font-semibold uppercase tracking-widest text-blue-600">
        {subtitle}
      </p>

      <h2 className="mt-2 text-4xl font-bold text-slate-900">{title}</h2>
    </div>
  );
};

export default SectionTitle;
