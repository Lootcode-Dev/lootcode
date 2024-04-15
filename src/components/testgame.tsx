export default function Testgame() {
  return (
    <div className="grid h-[92.5vh] grid-cols-2 bg-[#282A36] text-white">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center space-y-12">
          <div>Player</div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center space-y-12">
          <div>Enemy</div>
          <div>Enemy 2</div>
        </div>
      </div>
    </div>
  );
}
