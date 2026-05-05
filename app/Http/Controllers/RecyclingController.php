<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\RecyclingRecord;
use App\Models\Kiosk;

class RecyclingController extends Controller
{
    public function create()
    {
        return Inertia::render('ScanItem', [
            'kiosks' => Kiosk::where('is_active', true)->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'item_type'  => 'required|string|max:100',
            'item_brand' => 'nullable|string|max:100',
            'weight_kg'  => 'required|numeric|min:0.01|max:100',
            'kiosk_id'   => 'nullable|exists:kiosks,id',
        ]);

        $pointsEarned = $this->calculatePoints($validated['item_type'], (float) $validated['weight_kg']);

        RecyclingRecord::create([
            ...$validated,
            'user_id'      => $request->user()->id,
            'points_earned' => $pointsEarned,
            'recycled_at'  => now(),
        ]);

        $request->user()->increment('points_balance', $pointsEarned);

        return redirect()->route('dashboard')->with('success', "You earned {$pointsEarned} points!");
    }

    private function calculatePoints(string $itemType, float $weight): int
    {
        $baseRates = [
            'Smartphone' => 40, 'Laptop' => 100, 'Tablet' => 80,
            'Monitor' => 60, 'Desktop' => 90, 'Keyboard' => 30,
            'Mouse' => 20, 'Printer' => 70, 'Battery Pack' => 50,
            'Earbuds' => 25, 'Headphones' => 35, 'Camera' => 55,
        ];

        $rate = $baseRates[$itemType] ?? 30;
        return (int) round($rate + ($weight * 20));
    }
}
