import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="w-full h-full bg-white dark:bg-[#1e1e1e] p-6">
      <main className="w-full h-full flex flex-col md:flex-row gap-6">
        <div className="flex flex-1 flex-col gap-6">
          <div className="h-12">Filter</div>

          <Map />
        </div>

        <div className="w-full max-w-xs">favourite</div>
      </main>
    </div>
  );
}
