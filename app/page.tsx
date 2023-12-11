import dynamic from "next/dynamic";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { UserButton, auth } from "@clerk/nextjs";
import FavouriteList from "@/components/FavouriteList";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

export default async function Home() {
  const { userId } = auth();

  const events = await prismadb.event.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!userId) {
    return redirect("/sign-in");
  }

  const userFavourites = await prismadb.userFavourite.findUnique({
    where: {
      clerkId: userId,
    },
    include: {
      favouriteEvents: true,
    },
  });

  return (
    <div className="w-full h-full overflow-y-auto lg:overflow-y-hidden bg-[#ededed] dark:bg-[#1e1e1e]">
      <nav className="bg-white dark:bg-[#262626] flex items-center h-12 px-6 border-b dark:border-[#363636] shadow-sm">
        <div className="ml-auto">
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>

      <main className="w-full h-full lg:h-[calc(100%-48px)] flex flex-col lg:flex-row gap-6 p-6">
        <div className="flex flex-1 flex-col gap-6">
          <div className="h-12">Filter</div>

          <Map
            events={events}
            favouriteEventsIds={userFavourites?.favouriteEventsIds || []}
          />
        </div>

        <FavouriteList events={userFavourites?.favouriteEvents || []} />
      </main>
    </div>
  );
}
