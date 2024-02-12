import LoadingSVG from "../assets/loading.svg?react";

export default function Loading() {
  return (
    <div className="absolute left-0 top-0 z-[99999] flex h-full w-full justify-center bg-[#134b139a] pt-80">
      <LoadingSVG className="h-20 w-20" />
    </div>
  );
}
