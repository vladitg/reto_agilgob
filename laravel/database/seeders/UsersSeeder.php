<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Users;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Users::insert([
            [
                'name' => 'Vladimir Tagle Gonzalez',
                'email' => 'vladitg@gmail.com',
                'password' => Hash::make('password'),
            ]
        ]);
    }
}
