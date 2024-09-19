import goldMedal from '@/assets/game/gold_medal.png';

const GameTopPlayerThreeImg = () => {
  return (
    <section className="relative w-1/2">
      <img
        src="https://wizzap.ktwiz.co.kr/files/playerImg/ktImg/69032_2024-03-06_125257.jpg"
        className="bg-gradient-to-r from-kt-red-2 to-red-900 p-2"
      />
      <img src={goldMedal} className="absolute left-1 top-1 w-14" />
    </section>
  );
};
export default GameTopPlayerThreeImg;
