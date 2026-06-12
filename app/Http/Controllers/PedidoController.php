<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pedido; // Asegúrate de tener tu modelo Pedido

class PedidoController extends Controller
{
    public function store(Request $request)
    {
        // Validar que recibimos los items del carrito
        $request->validate([
            'items' => 'required|array|min:1',
        ]);

        // Crear el pedido asociado al usuario autenticado 
        $pedido = Pedido::create([
            'user_id' => auth()->id(),
            'total' => collect($request->items)->sum(fn($i) => $i['precio'] * $i['cantidad'])
        ]);

        // Guardar la relación de productos (asumiendo relación many-to-many)
        foreach ($request->items as $item) {
            $pedido->productos()->attach($item['id'], ['cantidad' => $item['cantidad']]);
        }

        return response()->json(['message' => 'Pedido registrado con éxito'], 201);
    }
}