type CategoryButtonProps = {
  label: string;
  category: string;
  onClick: (category: string) => void;
};

const CategoryButton = ({ label, category, onClick }: CategoryButtonProps) => {
  return (
    <div>
      <button onClick={() => onClick(category)}>{label}</button>
    </div>
  );
};
export default CategoryButton;
