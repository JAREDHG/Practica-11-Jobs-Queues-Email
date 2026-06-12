<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Producto;

class ProductoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Producto 1
        Producto::create([
            'nombre' => 'Monitor NACEB 24 Pulgadas',
            'descripcion' => 'Monitor Full HD ideal para trabajo y gaming básico.',
            'precio' => 2500.00,
            'stock' => 5,
        ]);

        // Producto 2
        Producto::create([
            'nombre' => 'Unidad SSD ADATA 1TB',
            'descripcion' => 'Almacenamiento de estado sólido de alta velocidad.',
            'precio' => 1200.50,
            'stock' => 15,
        ]);

        // Producto 3
        Producto::create([
            'nombre' => 'Teclado Mecánico',
            'descripcion' => 'Teclado con switches azules y retroiluminación RGB.',
            'precio' => 850.00,
            'stock' => 20,
        ]);

        // Producto 4
        Producto::create([
            'nombre' => 'Mouse Inalámbrico',
            'descripcion' => 'Mouse ergonómico con batería recargable.',
            'precio' => 350.00,
            'stock' => 30,
        ]);
    }
}
