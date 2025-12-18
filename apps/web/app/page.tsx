import BestBoardSection from "@/components/board/BestBoardSection";
import NewBoardSection from "@/components/board/NewBoardSecton";
import BoardListSection from "@/components/board/BoardListSection";

export default function HomePage() {
  return (
    <>
      <BestBoardSection />
      <NewBoardSection />
      <BoardListSection />
    </>
  );
}