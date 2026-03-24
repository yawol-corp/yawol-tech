import { useQuery, useMutation } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import type { Id } from "../../../../convex/_generated/dataModel"
import { Button } from "@workspace/ui/components/button"
import { Trash, DownloadSimple } from "@phosphor-icons/react"

export function MediaLibraryPage() {
  const files = useQuery(api.storage.listFiles)
  const deleteFile = useMutation(api.storage.deleteFile)
  const generateUploadUrl = useMutation(api.storage.generateUploadUrl)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const uploadUrl = await generateUploadUrl()
      const response = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      })
      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`)
      }
    } catch (error) {
      console.error("Upload error:", error)
    } finally {
      e.target.value = ""
    }
  }

  const handleDelete = async (storageId: Id<"_storage">) => {
    if (confirm("Delete this file permanently?")) {
      await deleteFile({ storageId })
    }
  }

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold">Media Library</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {files?.length ?? 0} files stored on Convex Storage
          </p>
        </div>
        <label className="cursor-pointer">
          <div className="inline-flex h-9 items-center justify-center rounded-none bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 gap-2 transition-colors">
            <DownloadSimple size={16} />
            Upload File
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {files?.map((file) => {
          const isImage = file.contentType?.startsWith("image/")
          return (
            <div
              key={file._id}
              className="group relative border border-border bg-background rounded-sm overflow-hidden"
            >
              <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
                {isImage ? (
                  <MediaPreview storageId={file._id as Id<"_storage">} />
                ) : (
                  <span className="font-mono text-xs text-muted-foreground">
                    {file.contentType ?? "FILE"}
                  </span>
                )}
              </div>
              <div className="p-2">
                <p className="text-[0.65rem] font-mono text-muted-foreground truncate">
                  {(file._id as string).slice(-12)}
                </p>
                <p className="text-[0.65rem] font-mono text-muted-foreground">
                  {formatBytes(file.size ?? 0)}
                </p>
              </div>
              <button
                onClick={() => handleDelete(file._id as Id<"_storage">)}
                className="absolute top-1.5 right-1.5 p-1 rounded-sm bg-background/90 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash size={14} />
              </button>
            </div>
          )
        })}
      </div>

      {files?.length === 0 && (
        <div className="text-center py-20 text-muted-foreground font-mono text-sm">
          NO_FILES_FOUND — Upload your first image to get started.
        </div>
      )}
    </div>
  )
}

function MediaPreview({ storageId }: { storageId: Id<"_storage"> }) {
  const url = useQuery(api.storage.getUrl, { storageId })
  if (!url) return <div className="w-full h-full bg-muted animate-pulse" />
  return (
    <img
      src={url}
      alt=""
      className="w-full h-full object-cover"
    />
  )
}
