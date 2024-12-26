'use server'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data> // NextApiResponse
) { 
  return res.status(200).json({ name: 'File upload request received.' })
}


// 'use server';
// import type { FileHandle } from 'fs/promises';
// import { open } from 'fs/promises';
// import { join } from 'path';
// import type { ChunkUploadHandler } from 'nextjs-chunk-upload-action';

// export const chunkUploadAction: ChunkUploadHandler<{ name: string }> = async (
//   chunkFormData,
//   metadata
// ) => {
//   const blob = chunkFormData.get('blob');
//   const offset = Number(chunkFormData.get('offset'));
//   const buffer = Buffer.from(await blob.arrayBuffer());
//   const filePath = join('./uploads', metadata.name);

//   let fileHandle: FileHandle | undefined;
//   try {
//     fileHandle = await open(filePath, offset === 0 ? 'w' : 'r+');
//     await fileHandle.write(buffer, 0, buffer.length, offset);
//   } finally {
//     await fileHandle?.close();
//   }
// };