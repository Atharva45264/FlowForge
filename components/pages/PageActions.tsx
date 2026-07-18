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
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { Page, useUpdatePage, useDuplicatePage } from "@/hooks/usePages";

interface Props {
  page: Page;
}

export default function PageActions({
  page,
}: Props) {
  const updatePage = useUpdatePage();

  const [loading, setLoading] = useState(false);

  const duplicate = useDuplicatePage();

function duplicateCurrentPage() {
  duplicate.mutate(page._id);
}

  return (
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

        <DropdownMenuItem
          onClick={duplicateCurrentPage}
          disabled={loading}
        >
          <Copy className="mr-2 h-4 w-4" />
          Duplicate
        </DropdownMenuItem>

        <DropdownMenuItem disabled>
          <FolderInput className="mr-2 h-4 w-4" />
          Move
        </DropdownMenuItem>

        <DropdownMenuItem disabled>
          <Download className="mr-2 h-4 w-4" />
          Export
        </DropdownMenuItem>

        <DropdownMenuSeparator />

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

        <DropdownMenuItem disabled>
          <Archive className="mr-2 h-4 w-4" />
          Archive
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          disabled
          className="text-red-500"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>
  );
}