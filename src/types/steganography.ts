export interface SteganographyResult {
  success: boolean;
  message?: string;
  imageUrl?: string;
  error?: string;
}

export interface ImageData {
  file: File;
  url: string;
  width: number;
  height: number;
}

export interface ProcessingState {
  isProcessing: boolean;
  progress: number;
  status: string;
}