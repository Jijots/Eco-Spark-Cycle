<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Kiosk;

class KioskController extends Controller
{
    public function index()
    {
        return Inertia::render('MapView', [
            'kiosks' => Kiosk::all(),
        ]);
    }
}
