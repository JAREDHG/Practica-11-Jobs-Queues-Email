<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Models\Pedido; 
use App\Notifications\ConfirmacionPedidoNotification; 
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log; 
use Throwable;

class EnviarConfirmacionPedido implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;           // reintentos
    public int $timeout = 60;        // segundos máximos

    public function __construct(public Pedido $pedido) {}

    public function handle(): void
    {
        // Enviar la notificación al usuario
        $this->pedido->user->notify(
            new ConfirmacionPedidoNotification($this->pedido)
        );

        // Marcar como enviado
        $this->pedido->update([
            'email_enviado_at' => now()->toDateTimeString()
        ]);
    }

    public function failed(Throwable $e): void
    {
        Log::error('Fallo envío email pedido ' . $this->pedido->id);
    }
}
