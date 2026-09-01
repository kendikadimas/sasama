<?php

namespace App\Observers;

use App\Models\User;
use App\Notifications\ActivityNotification;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;

class ActivityObserver
{
    public function created($model)
    {
        $this->notify($model, 'create');
    }

    public function updated($model)
    {
        $this->notify($model, 'update');
    }

    public function deleted($model)
    {
        $this->notify($model, 'delete');
    }

    protected function notify($model, $action)
    {
        // Avoid feedback loop if model is Notification
        if ($model instanceof \Illuminate\Notifications\DatabaseNotification) {
            return;
        }

        $user = auth()->user();
        $userName = $user ? $user->name : 'System';

        $modelName = class_basename($model);

        // Translate model names for better UX
        $modelMap = [
            'Post' => 'Berita',
            'Potential' => 'Potensi',
            'Announcement' => 'Pengumuman',
            'Development' => 'Pembangunan',
            'User' => 'Pengguna',
            'Demographic' => 'Data Statistik',
            'Institution' => 'Lembaga',
            'ServiceRequest' => 'Layanan',
            'VillageOfficial' => 'Perangkat Desa',
            'VillageStat' => 'Statistik Desa',
        ];

        $readableModel = $modelMap[$modelName] ?? $modelName;

        // Try to get a recognizable title/name
        $title = $model->title ?? $model->name ?? $model->label ?? 'Data';
        $title = Str::limit($title, 30);

        $actionMap = [
            'create' => 'menambahkan',
            'update' => 'memperbarui',
            'delete' => 'menghapus',
        ];

        $verb = $actionMap[$action] ?? $action;

        $message = "$userName $verb $readableModel: $title";

        $url = '#';

        // Notify all admins (assuming all users are admins for now in single role system)
        $admins = User::all();

        Notification::send($admins, new ActivityNotification($message, $action, $readableModel, $url));
    }
}
