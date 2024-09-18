import goldMedal from '@/assets/game/gold_medal.png';

const GameTopPlayerThreeImg = () => {
  return (
    <section className="relative w-1/2">
      <img
        src="https://wizzap.ktwiz.co.kr/files/playerImg/ktImg/69032_2024-03-06_125257.jpg"
        className="border-4 border-kt-red-2"
      />
      <img src={goldMedal} className="absolute left-2 top-0 w-14" />
    </section>
  );
};
export default GameTopPlayerThreeImg;
