const WizParkGuideFacilityInfo = ({
  img,
  label,
  engLabel,
}: {
  img: string;
  label: string;
  engLabel: string;
}) => (
  <div className="flex items-center gap-3">
    <img src={img} className="size-10" />
    <div className="items-center text-left text-sm">
      <p>{label}</p>
      <p className="text-xs text-gray-400">{engLabel}</p>
    </div>
  </div>
);

export default WizParkGuideFacilityInfo;
