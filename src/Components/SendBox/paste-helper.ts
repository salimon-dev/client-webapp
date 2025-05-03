export type StringPasteType = {
  type: "string";
  data: string;
};

type FileType = "image/png" | "image/jpg";
export type FilePasteType = {
  type: FileType;
  data: File;
};

export type PasteType = StringPasteType | FilePasteType;

async function getAsString(item: DataTransferItem): Promise<string> {
  return new Promise<string>((resolve) => {
    item.getAsString(resolve);
  });
}

export async function extractClipboardData(
  e: React.ClipboardEvent<HTMLParagraphElement>
): Promise<PasteType[]> {
  const result: PasteType[] = [];
  const items = e.clipboardData.items;
  for (let i = 0; i < items.length; ++i) {
    const item = items[i];
    switch (item.type) {
      case "text/plain": {
        const data = await getAsString(item);
        result.push({ type: "string", data });
        break;
      }
      case "image/png":
      case "image/jpg": {
        const data = item.getAsFile();
        if (!data) break;
        result.push({ type: item.type, data });
        break;
      }
    }
  }
  return result;
}
