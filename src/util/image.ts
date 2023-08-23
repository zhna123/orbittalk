import { Buffer } from 'buffer';


export const getAvatarDataUri = (avatar: Buffer) => {

  const userAvatarData = Buffer.from(avatar) 

  // Convert the binary data to a Base64-encoded string
  const base64Image = userAvatarData.toString('base64');
  
  // Construct the data URI
  const imageDataUri = `data:image/jpeg;base64,${base64Image}`;

  return imageDataUri
}