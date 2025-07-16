export default function Spiner() {
  return (
    <div className="flex justify-center items-center flex-col gap-6 h-screen bg-gradient-to-br  from-slate-900 via-purple-900 to-slate-900">
      <div className="animate-spin h-10 w-10 border-4 border-blue-400 border-t-transparent rounded-full" />
      <p className="animate-pulse text-blue-400 text-lg lg:text-3xl text-center font-bold">Loading.....</p>
    </div>
  );
}
