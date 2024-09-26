import SectionHeading from '@/components/common/typography/SectionHeading';

type SectionLayoutProps = {
  title: string;
  children: React.ReactNode;
};

const SectionLayout = ({ title, children }: SectionLayoutProps) => {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeading title={title} />
      {children}
    </section>
  );
};

export default SectionLayout;
