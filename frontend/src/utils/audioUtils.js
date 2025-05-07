/**
 * Utility functions for handling audio in the Realtime Interviewer
 */

// List of formats supported by Whisper API
const SUPPORTED_WHISPER_FORMATS = ["mp3", "mp4", "mpeg", "mpga", "m4a", "wav", "webm", "ogg", "oga", "flac"];

/**
 * Check if a MIME type is supported by the browser's MediaRecorder
 *
 * @param {string} mimeType - The MIME type to check
 * @returns {boolean} - Whether the MIME type is supported
 */
export const isMimeTypeSupported = (mimeType) => {
  if (!window.MediaRecorder) {
    console.warn("MediaRecorder not supported in this browser");
    return false;
  }

  try {
    return MediaRecorder.isTypeSupported(mimeType);
  } catch (e) {
    console.warn(`Error checking mime type support for ${mimeType}:`, e);
    return false;
  }
};

/**
 * Find a supported audio MIME type for recording
 *
 * @param {Array<string>} preferredTypes - List of MIME types to try, in order of preference
 * @param {string} fallbackType - Fallback MIME type if none of the preferred types are supported
 * @returns {Promise<string>} - The selected MIME type
 */
export const getSupportedAudioType = async (preferredTypes, fallbackType = "audio/webm") => {
  // Check browser support for MediaRecorder
  if (!window.MediaRecorder) {
    console.warn("MediaRecorder not supported in this browser");
    return fallbackType;
  }

  // Try each preferred format in order
  for (const mimeType of preferredTypes) {
    if (MediaRecorder.isTypeSupported(mimeType)) {
      return mimeType;
    }
  }

  // If none are supported, try a few well-known formats explicitly
  const commonTypes = ["audio/webm;codecs=opus", "audio/webm", "audio/ogg;codecs=opus", "audio/mp3", "audio/wav"];

  for (const mimeType of commonTypes) {
    if (MediaRecorder.isTypeSupported(mimeType)) {
      return mimeType;
    }
  }

  console.warn(`No specific audio MIME types are supported, falling back to ${fallbackType}`);
  return fallbackType;
};

/**
 * Convert an audio blob to a different format if needed
 * This is a placeholder for when we need more sophisticated conversion
 *
 * @param {Blob} audioBlob - The audio blob to convert
 * @param {string} targetFormat - The target format (e.g., 'wav', 'mp3')
 * @returns {Promise<Blob>} - The converted audio blob
 */
export const convertAudioFormat = async (audioBlob, targetFormat) => {
  // In a real implementation, this would use the Web Audio API to convert formats
  // For now, we're just returning the original blob since browser conversion is complex

  console.log(`Audio conversion requested: ${audioBlob.type} -> ${targetFormat}`);

  // If we already have the right format, just return it
  if (audioBlob.type.includes(targetFormat)) {
    return audioBlob;
  }

  // This is where you would implement conversion if needed
  // For example, using AudioContext to decode and re-encode

  return audioBlob; // Return original for now
};

/**
 * Validate an audio blob before sending it for transcription
 *
 * @param {Blob} audioBlob - The audio blob to validate
 * @returns {boolean} - Whether the audio blob is valid
 */
export const validateAudioBlob = (audioBlob) => {
  // Check if the blob exists and has content
  if (!audioBlob || audioBlob.size <= 0) {
    console.warn("Audio blob is empty or null");
    return false;
  }

  // Check size constraints
  // For real-time applications, we want to avoid excessively small chunks
  // that likely don't contain meaningful speech, but the threshold shouldn't be too high
  if (audioBlob.size < 100) {
    // Extremely small (100 bytes) is likely corrupted
    console.warn(`Audio blob extremely small (${audioBlob.size} bytes), skipping`);
    return false;
  }

  // OpenAI's 25MB limit for the Whisper API
  if (audioBlob.size > 25 * 1024 * 1024) {
    console.warn(`Audio blob too large (${audioBlob.size} bytes), exceeding API limit`);
    return false;
  }

  // Validate the content type is audio
  if (!audioBlob.type.startsWith("audio/")) {
    console.warn(`Not an audio blob: ${audioBlob.type}`);
    return false;
  }

  return true;
};

/**
 * Check if the audio format is supported by Whisper API
 *
 * @param {string} format - The audio format/extension to check
 * @returns {boolean} - Whether the format is supported
 */
export const isWhisperSupportedFormat = (format) => {
  if (!format) return false;

  // Clean up the format string (remove dots, audio/, etc)
  const cleanFormat = format.toLowerCase().replace("audio/", "").replace(".", "").split(";")[0]; // Remove codec info if present

  return SUPPORTED_WHISPER_FORMATS.includes(cleanFormat);
};

/**
 * Get a file extension from a MIME type or file name
 *
 * @param {string} input - MIME type or file name
 * @returns {string} - The file extension
 */
export const getAudioExtension = (input) => {
  // If it's a file name with an extension
  if (input && input.includes(".")) {
    return input.split(".").pop().toLowerCase();
  }

  // If it's a MIME type
  if (input && input.startsWith("audio/")) {
    const format = input.replace("audio/", "").split(";")[0];

    // Map specific MIME subtypes to extensions
    const mimeToExt = {
      webm: "webm",
      wav: "wav",
      wave: "wav",
      "x-wav": "wav",
      mp3: "mp3",
      mpeg: "mp3",
      ogg: "ogg",
      flac: "flac",
      m4a: "m4a",
      mp4: "mp4",
      "x-m4a": "m4a",
    };

    return mimeToExt[format] || "mp3";
  }

  // Default fallback
  return "mp3";
};

export default {
  isMimeTypeSupported,
  getSupportedAudioType,
  convertAudioFormat,
  validateAudioBlob,
  isWhisperSupportedFormat,
  getAudioExtension,
  SUPPORTED_WHISPER_FORMATS,
};
