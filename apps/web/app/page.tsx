import BestBoardSection from "@/components/board/BestBoardSection";
import NewBoardSection from "@/components/board/NewBoardSecton";
import BoardListSectoin from "@/components/board/BoardListSection";
import Header from "@/components/layout/Header";

export default function HomePage() {
  return (
    <>
      <Header />
      <BestBoardSection />
      <NewBoardSection />
      <BoardListSectoin />
    </>
  );
}