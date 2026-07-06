import { WhiteboardLayout } from "@/components/whiteboard/whiteboard-layout";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function WhiteboardPage({
  params,
}: PageProps) {
  const { id } = await params;

  return <WhiteboardLayout boardId={id} />;
}