

function ColorLines() {
  return (
    <div className="w-sm lg:w-lg px-4 relative bottom-20 lg:left-135">
      <p className="bg-blue-600 mx-18 min-h-1 w-4/5 rounded-full"></p>
      <div className="mt-2 flex gap-4">
        <p className="bg-purple-600 min-h-1  rounded-full w-sm"></p>
        <p className="bg-accent min-h-1  rounded-full w-1/2"></p>
      </div>
      <div className="mt-2 flex gap-4">
        <p className="bg-indigo-600 min-h-1  rounded-full w-1/3"></p>
        <p className="bg-blue-500 min-h-1  rounded-full w-sm"></p>
      </div>
    </div>
  );
}

export default ColorLines;
