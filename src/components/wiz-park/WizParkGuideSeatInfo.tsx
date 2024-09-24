import { cn } from '@/utils/cn';

const WizParkGuideSeatInfo = ({
  color,
  label,
}: {
  color: string;
  label: string;
}) => (
  <div className="flex items-center">
    <div
      className={cn('mr-2 h-6 w-6 rounded-full border-2 border-white', color)}
    />
    <p className="text-sm">{label}</p>
  </div>
);

export default WizParkGuideSeatInfo;
