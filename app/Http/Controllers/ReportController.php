<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\RecyclingRecord;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $user    = $request->user();
        $records = RecyclingRecord::where('user_id', $user->id)->get();

        $byType = $records->groupBy('item_type')->map(fn($g) => [
            'count'  => $g->count(),
            'weight' => round($g->sum('weight_kg'), 2),
            'points' => $g->sum('points_earned'),
        ]);

        $monthly = $records
            ->groupBy(fn($r) => $r->recycled_at?->format('Y-m'))
            ->map(fn($g) => [
                'count'  => $g->count(),
                'co2'    => round($g->sum('weight_kg') * 2.3, 2),
                'points' => $g->sum('points_earned'),
            ])
            ->sortKeys();

        return Inertia::render('SdgReports', [
            'totalCo2'    => round($records->sum('weight_kg') * 2.3, 1),
            'totalItems'  => $records->count(),
            'totalWeight' => round($records->sum('weight_kg'), 1),
            'byType'      => $byType,
            'monthly'     => $monthly,
        ]);
    }
}
