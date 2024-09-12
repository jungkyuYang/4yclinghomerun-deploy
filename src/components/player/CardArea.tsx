const CardArea = ({ children }: { children: React.ReactNode }) => {
  return (
    <article className="">
      <ul
        className={`relative m-auto grid h-full max-w-[1200px] gap-x-[2vw] gap-y-[50px] p-[50px] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}
      >
        {children}
      </ul>
    </article>
  );
};
export default CardArea;
