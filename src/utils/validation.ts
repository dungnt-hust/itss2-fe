import { FilesWithId, FileWithId, ImagesPreview } from "@/@interfaces/file"
import { getRandomId } from "./random"

type ImagesData = {
  imagesPreviewData: ImagesPreview
  selectedImagesData: FilesWithId
}

const IMAGE_EXTENSIONS = ["apng", "avif", "gif", "jpg", "jpeg", "jfif", "pjpeg", "pjp", "png", "svg", "webp"] as const

type ImageExtensions = (typeof IMAGE_EXTENSIONS)[number]

function isValidImageExtension(extension: string): extension is ImageExtensions {
  return IMAGE_EXTENSIONS.includes(extension.split(".").pop()?.toLowerCase() as ImageExtensions)
}

export function isValidImage(name: string, bytes: number): boolean {
  return isValidImageExtension(name) && bytes < 5 * Math.pow(1024, 2)
}

export function getImagesData(files: FileList | null, currentFiles?: number): ImagesData | null {
  if (!files || !files.length) return null

  const singleEditingMode = currentFiles === undefined

  const rawImages =
    singleEditingMode || !(currentFiles === 4 || files.length > 4 - currentFiles)
      ? Array.from(files).filter(({ name, size }) => isValidImage(name, size))
      : null

  if (!rawImages || !rawImages.length) return null

  const imagesId = rawImages.map(({ name }) => {
    const randomId = getRandomId()
    return {
      id: randomId,
      name: name === "image.png" ? `${randomId}.png` : null,
    }
  })

  const imagesPreviewData = rawImages.map((image, index) => {
    return {
      id: imagesId[index].id,
      src: URL.createObjectURL(image),
      alt: imagesId[index].name ?? image.name,
      file: image,
    }
  })

  const selectedImagesData = rawImages.map((image, index) =>
    renameFile(image, imagesId[index].id, imagesId[index].name)
  )

  return { imagesPreviewData, selectedImagesData }
}

function renameFile(file: File, newId: string, newName: string | null): FileWithId {
  return Object.assign(
    newName
      ? new File([file], newName, {
          type: file.type,
          lastModified: file.lastModified,
        })
      : file,
    { id: newId }
  )
}
