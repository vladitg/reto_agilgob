<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\States;

class StatesSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        States::create(["name" => "Aguascalientes"]);
        States::create(["name" => "Baja California"]);
        States::create(["name" => "Baja California Sur"]);
        States::create(["name" => "Campeche"]);
        States::create(["name" => "Chiapas"]);
        States::create(["name" => "Chihuahua"]);
        States::create(["name" => "Ciudad de México"]);
        States::create(["name" => "Coahuila"]);
        States::create(["name" => "Colima"]);
        States::create(["name" => "Durango"]);
        States::create(["name" => "Estado de México"]);
        States::create(["name" => "Guanajuato"]);
        States::create(["name" => "Guerrero"]);
        States::create(["name" => "Hidalgo"]);
        States::create(["name" => "Jalisco"]);
        States::create(["name" => "Michoacán"]);
        States::create(["name" => "Morelos"]);
        States::create(["name" => "Nayarit"]);
        States::create(["name" => "Nuevo León"]);
        States::create(["name" => "Oaxaca"]);
        States::create(["name" => "Puebla"]);
        States::create(["name" => "Querétaro"]);
        States::create(["name" => "Quintana Roo"]);
        States::create(["name" => "San Luis Potosí"]);
        States::create(["name" => "Sinaloa"]);
        States::create(["name" => "Sonora"]);
        States::create(["name" => "Tabasco"]);
        States::create(["name" => "Tamaulipas"]);
        States::create(["name" => "Tlaxcala"]);
        States::create(["name" => "Veracruz"]);
        States::create(["name" => "Yucatán"]);
        States::create(["name" => "Zacatecas"]);
    }
}
