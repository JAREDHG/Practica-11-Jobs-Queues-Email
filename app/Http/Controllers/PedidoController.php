<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pedido;
use App\Models\Producto;
use App\Jobs\EnviarConfirmacionPedido;
use Illuminate\Support\Facades\DB;

class PedidoController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'items' => 'required|array|min:1',
        ]);

        // 1. Usar transacción para garantizar integridad 
        $pedido = DB::transaction(function () use ($request) {
            $pedido = Pedido::create([
                'user_id' => auth()->id(),
                'total'   => collect($request->items)->sum(fn($i) => $i['precio'] * $i['cantidad']),
            ]);

            foreach ($request->items as $item) {
                // Guardar detalle en pedido_items
                $pedido->items()->create([
                    'producto_id'    => $item['producto_id'],
                    'cantidad'       => $item['cantidad'],
                    'precio_unitario'=> $item['precio'],
                ]);

                // 2. Descontar stock
                Producto::find($item['producto_id'])->decrement('stock', $item['cantidad']);
            }
            return $pedido;
        });

        // 3. Despachar el Job en segundo plano
        EnviarConfirmacionPedido::dispatch($pedido)->delay(now()->addSeconds(5));

        return response()->json(['pedido_id' => $pedido->id], 201);
    }

    public function show($id)
    {
        return Pedido::where('user_id', auth()->id())->findOrFail($id);
    }
}