<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ActivityNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public $message;
    public $action; // 'create', 'update', 'delete'
    public $model;
    public $url;

    /**
     * Create a new notification instance.
     */
    public function __construct($message, $action, $model, $url = '#')
    {
        $this->message = $message;
        $this->action = $action;
        $this->model = $model;
        $this->url = $url;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'message' => $this->message,
            'action' => $this->action,
            'model' => $this->model,
            'url' => $this->url,
        ];
    }
}
