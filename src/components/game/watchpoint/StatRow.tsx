type StatRowProps = {
  label: string;
  home: string;
  away: string;
};

const StatRow = ({ label, home, away }: StatRowProps) => (
  <div className="grid grid-cols-3 gap-4 border-b border-gray-600 px-8 py-2">
    <div className="text-right">{away}</div>
    <div className="text-center font-extrabold text-gray-200">{label}</div>
    <div className="text-left">{home}</div>
  </div>
);

export default StatRow;
