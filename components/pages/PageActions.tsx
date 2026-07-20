"use client";

import { useState } from "react";

import {
  MoreHorizontal,
  Copy,
  FolderInput,
  Download,
  Archive,
  Trash2,
  Star,
  StarOff,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { useSpaces } from "@/hooks/useSpaces";

import {
  Page,
  useDuplicatePage,
  useMovePage,
  useUpdatePage,
} from "@/hooks/usePages";

import ExportDialog from "./ExportDialog";

interface Props {
  page: Page;
}

export default function PageActions({
  page,
}: Props) {
  const updatePage = useUpdatePage();
  const duplicate = useDuplicatePage();
  const movePage = useMovePage();

  const { data: spaces = [] } = useSpaces();

  const [loading, setLoading] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  function duplicateCurrentPage() {
    setLoading(true);

    duplicate.mutate(page._id, {
      onSettled() {
        setLoading(false);
      },
    });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">

          {/* Duplicate */}

          <DropdownMenuItem
            onClick={duplicateCurrentPage}
            disabled={loading}
          >
            <Copy className="mr-2 h-4 w-4" />
            Duplicate
          </DropdownMenuItem>

          {/* Move */}

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <FolderInput className="mr-2 h-4 w-4" />
              Move to Space
            </DropdownMenuSubTrigger>

            <DropdownMenuSubContent>
              {spaces
                .filter(
                  (space) => space._id !== page.spaceId
                )
                .map((space) => (
                  <DropdownMenuItem
                    key={space._id}
                    onClick={() =>
                      movePage.mutate({
                        id: page._id,
                        spaceId: space._id,
                      })
                    }
                  >
                    <span className="mr-2">
                      {space.icon}
                    </span>

                    {space.name}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          {/* Export */}

          <DropdownMenuItem
            onClick={() => setExportOpen(true)}
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Favorite */}

          <DropdownMenuItem
            onClick={() =>
              updatePage.mutate({
                id: page._id,
                data: {
                  favorite: !page.favorite,
                },
              })
            }
          >
            {page.favorite ? (
              <>
                <StarOff className="mr-2 h-4 w-4" />
                Remove Favorite
              </>
            ) : (
              <>
                <Star className="mr-2 h-4 w-4" />
                Add Favorite
              </>
            )}
          </DropdownMenuItem>

          {/* Archive */}

          <DropdownMenuItem disabled>
            <Archive className="mr-2 h-4 w-4" />
            Archive
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Delete */}

          <DropdownMenuItem
            disabled
            className="text-red-500"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>

      {/* Export Dialog */}

      <ExportDialog
        open={exportOpen}
        onOpenChange={setExportOpen}
        page={page}
      />
    </>
  );
}