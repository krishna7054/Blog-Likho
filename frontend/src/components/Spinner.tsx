export const Spinner = () => {
    return (
      <div role="status" className="flex justify-center items-center">
         
<div className="w-full gap-x-2 flex justify-center items-center">
  <div
    className="w-3 bg-[#d991c2] animate-pulse h-3 rounded-full animate-bounce"
  ></div>
  <div
    className="w-3 animate-pulse h-3 bg-[#9869b8] rounded-full animate-bounce"
  ></div>
  <div
    className="w-3 h-3 animate-pulse bg-[#6756cc] rounded-full animate-bounce"
  ></div>
</div>

      </div>
    );
  };
  