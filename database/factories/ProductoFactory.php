<?php

namespace Database\Factories;

use App\Models\Producto;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Producto>
 */
class ProductoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre'       => $this->faker->words(3, true),
            'descripcion'  => $this->faker->paragraph(),
            'precio'       => $this->faker->randomFloat(2, 10, 500),
            'stock'        => $this->faker->numberBetween(0, 100),
            'categoria_id' => \App\Models\Categoria::factory(),
        ];
    }
}
