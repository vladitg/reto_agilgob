<?php

namespace App\Http\Controllers;

use App\Models\States;

class StatesController extends Controller
{
    /**
     * Obtiene la lista de todos los estados
     */
    public function getAll()
    {
        $states = States::get();
        return response()->json($states);
    }
}
