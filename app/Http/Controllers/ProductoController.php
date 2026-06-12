<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductoRequest;
use App\Models\Producto;
use Illuminate\Http\Request;
use App\Http\Resources\ProductoResource;
use App\Http\Controllers\Controller;

class ProductoController extends Controller
{
    public function index(Request $request)
    {
        $productos = Producto::with('categoria')
            ->buscar($request->busqueda) 
            ->deCategoria($request->categoria_id) 
            ->rangoPrecio($request->precio_min, $request->precio_max) 
            ->orderBy($request->get('orden', 'nombre'), $request->get('dir', 'asc')) 
            ->paginate($request->get('por_pagina', 15)); 

        return ProductoResource::collection($productos); 
    }

    public function store(StoreProductoRequest $request)
    {
        $this->authorize('create', Producto::class);

        $data = $request->validated();

        if ($request->hasFile('imagen')) {
            $data['imagen'] = $request->file('imagen')->store('productos', 'public');
        }

        $producto = Producto::create($data);
        return new ProductoResource($producto);
    }

    public function show(Producto $producto)
    {
        return new ProductoResource($producto);
    }

    public function update(Request $request, Producto $producto)
    {
        $this->authorize('update', $producto);

        $request->validate([
            'nombre'  => 'sometimes|string',
            'precio'  => 'sometimes|numeric',
            'stock' => 'sometimes|numeric',
            'imagen'  => 'nullable|image|mimes:jpg,png,webp|max:2048',
        ]);

        $data = $request->only(['nombre', 'descripcion', 'precio', 'stock']);

        if ($request->hasFile('imagen')) {
            $data['imagen'] = $request->file('imagen')->store('productos', 'public');
        }

        $producto->update($data);
        return new ProductoResource($producto);
    }

    public function destroy(Producto $producto)
    {
        $this->authorize('delete', $producto);
        $producto->delete();
        return response()->json(null, 204);
    }
}
