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
  Loader2,
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

  const availableSpaces = spaces.filter(
    (space) => space._id !== page.spaceId
  );

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => e.stopPropagation()}
            className="h-8 w-8 opacity-70 transition hover:opacity-100"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">

          {/* Duplicate */}

          <DropdownMenuItem
            disabled={loading}
            onClick={duplicateCurrentPage}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Copy className="mr-2 h-4 w-4" />
            )}

            Duplicate
          </DropdownMenuItem>

          {/* Move */}

          <DropdownMenuSub>

            <DropdownMenuSubTrigger>
              <FolderInput className="mr-2 h-4 w-4" />
              Move to Space
            </DropdownMenuSubTrigger>

            <DropdownMenuSubContent>

              {availableSpaces.length === 0 ? (
                <DropdownMenuItem disabled>
                  No other spaces
                </DropdownMenuItem>
              ) : (
                availableSpaces.map((space) => (
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
                ))
              )}

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
            className="text-red-500 focus:text-red-500"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>

      <ExportDialog
        open={exportOpen}
        onOpenChange={setExportOpen}
        page={page}
      />
    </>
  );
}