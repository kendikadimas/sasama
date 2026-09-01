<?php

namespace App\Http\Controllers\Concerns;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

trait HandlesImageUpload
{
    /**
     * Store an uploaded file and convert HEIC/HEIF to JPEG if needed.
     * Returns the stored path (relative to the public disk).
     */
    protected function storeImage(UploadedFile $file, string $directory): string
    {
        $path = $file->store($directory, 'public');

        $ext = strtolower($file->getClientOriginalExtension());
        if (in_array($ext, ['heic', 'heif']) && extension_loaded('imagick')) {
            try {
                $fullPath = Storage::disk('public')->path($path);
                $jpegPath = preg_replace('/\.(heic|heif)$/i', '.jpg', $fullPath);

                $imagick = new \Imagick($fullPath);
                $imagick->setImageFormat('jpeg');
                $imagick->setImageCompressionQuality(88);
                $imagick->writeImage($jpegPath);
                $imagick->destroy();

                // Replace the stored file with the JPEG
                unlink($fullPath);
                $path = preg_replace('/\.(heic|heif)$/i', '.jpg', $path);
            } catch (\Exception $e) {
                // Conversion failed — keep original, it will just not display in browsers
                \Illuminate\Support\Facades\Log::warning('HEIC conversion failed: ' . $e->getMessage());
            }
        }

        return $path;
    }
}
