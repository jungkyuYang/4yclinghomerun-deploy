import { TopPlayerInfoType, PitchInfoType } from '@/types/WatchPointType';

type PlayerAvatarProps = {
  player: TopPlayerInfoType | PitchInfoType;
  isLoading: boolean;
  imageUrl: string;
};

const PlayerAvatar = ({ player, isLoading, imageUrl }: PlayerAvatarProps) => {
  return (
    <figure className="text-center">
      {isLoading ? (
        <div className="animate-pulse h-32 w-32 rounded-full border-2 border-kt-gray-2 bg-gray-800"></div>
      ) : (
        <img
          src={imageUrl}
          alt={player.name}
          className="mb-4 h-32 w-32 rounded-full border-2 border-kt-gray-2 object-cover"
        />
      )}
      <figcaption className="text-xl font-bold">{player.name}</figcaption>
    </figure>
  );
};

export default PlayerAvatar;
