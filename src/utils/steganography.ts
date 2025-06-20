export class SteganographyUtils {
  private static readonly END_MARKER = '1111111111111110'; // 16-bit end marker

  /**
   * Encode text message into image using LSB steganography
   */
  static async encodeMessage(
    imageFile: File,
    message: string,
    password?: string
  ): Promise<{ success: boolean; imageUrl?: string; error?: string }> {
    try {
      const processedMessage = password ? this.encryptMessage(message, password) : message;
      const binaryMessage = this.textToBinary(processedMessage) + this.END_MARKER;
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      
      return new Promise((resolve) => {
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const pixels = imageData.data;
          
          // Check if image is large enough
          const maxBits = Math.floor(pixels.length / 4) * 3; // 3 channels per pixel
          if (binaryMessage.length > maxBits) {
            resolve({ success: false, error: 'Message too long for this image size' });
            return;
          }
          
          // Encode message
          let messageIndex = 0;
          for (let i = 0; i < pixels.length && messageIndex < binaryMessage.length; i += 4) {
            // Modify RGB channels (skip alpha)
            for (let channel = 0; channel < 3 && messageIndex < binaryMessage.length; channel++) {
              const pixelIndex = i + channel;
              const bit = parseInt(binaryMessage[messageIndex]);
              pixels[pixelIndex] = (pixels[pixelIndex] & 0xFE) | bit;
              messageIndex++;
            }
          }
          
          ctx.putImageData(imageData, 0, 0);
          
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              resolve({ success: true, imageUrl: url });
            } else {
              resolve({ success: false, error: 'Failed to create image blob' });
            }
          }, 'image/png');
        };
        
        img.onerror = () => {
          resolve({ success: false, error: 'Failed to load image' });
        };
        
        img.src = URL.createObjectURL(imageFile);
      });
    } catch (error) {
      return { success: false, error: `Encoding failed: ${error}` };
    }
  }

  /**
   * Decode hidden message from image
   */
  static async decodeMessage(
    imageFile: File,
    password?: string
  ): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      
      return new Promise((resolve) => {
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const pixels = imageData.data;
          
          let binaryMessage = '';
          
          // Extract bits from RGB channels
          for (let i = 0; i < pixels.length; i += 4) {
            for (let channel = 0; channel < 3; channel++) {
              const pixelIndex = i + channel;
              const bit = pixels[pixelIndex] & 1;
              binaryMessage += bit;
              
              // Check for end marker
              if (binaryMessage.length >= 16 && 
                  binaryMessage.slice(-16) === this.END_MARKER) {
                const messageBits = binaryMessage.slice(0, -16);
                let decodedMessage = this.binaryToText(messageBits);
                
                if (password) {
                  decodedMessage = this.decryptMessage(decodedMessage, password);
                }
                
                resolve({ success: true, message: decodedMessage });
                return;
              }
            }
          }
          
          resolve({ success: false, error: 'No hidden message found' });
        };
        
        img.onerror = () => {
          resolve({ success: false, error: 'Failed to load image' });
        };
        
        img.src = URL.createObjectURL(imageFile);
      });
    } catch (error) {
      return { success: false, error: `Decoding failed: ${error}` };
    }
  }

  private static textToBinary(text: string): string {
    return text
      .split('')
      .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join('');
  }

  private static binaryToText(binary: string): string {
    const chars = [];
    for (let i = 0; i < binary.length; i += 8) {
      const byte = binary.slice(i, i + 8);
      if (byte.length === 8) {
        chars.push(String.fromCharCode(parseInt(byte, 2)));
      }
    }
    return chars.join('');
  }

  private static encryptMessage(message: string, password: string): string {
    // Simple XOR encryption (for demo purposes)
    let encrypted = '';
    for (let i = 0; i < message.length; i++) {
      const messageChar = message.charCodeAt(i);
      const passwordChar = password.charCodeAt(i % password.length);
      encrypted += String.fromCharCode(messageChar ^ passwordChar);
    }
    return encrypted;
  }

  private static decryptMessage(encrypted: string, password: string): string {
    // XOR decryption (same as encryption for XOR)
    return this.encryptMessage(encrypted, password);
  }

  static getImageCapacity(file: File): Promise<number> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const capacity = Math.floor((img.width * img.height * 3) / 8); // 3 bits per pixel, 8 bits per character
        resolve(capacity);
      };
      img.src = URL.createObjectURL(file);
    });
  }
}