export default function ReqsDenied() {
  return (
    <div className="flex h-[92.5vh] flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#2e026d] to-[#15162c] px-24 text-white">
      <h1 className="text-4xl font-bold">Banished...</h1>
      <p className="text-center text-lg">
        The magical forces of Algorion have determined that you do not meet the
        pre-requisites for this problem or encounter. Level up, and come back
        when you&apos;re worthy...
      </p>
      <div className="text-gray-500">Nice Try</div>
    </div>
  );
}
