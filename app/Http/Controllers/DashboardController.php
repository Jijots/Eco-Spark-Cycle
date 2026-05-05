<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\RecyclingRecord;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $recent = RecyclingRecord::where('user_id', $user->id)
            ->with('kiosk')
            ->latest('recycled_at')
            ->take(5)
            ->get();

        $monthlyCount = RecyclingRecord::where('user_id', $user->id)
            ->whereMonth('recycled_at', now()->month)
            ->whereYear('recycled_at', now()->year)
            ->count();

        return Inertia::render('Dashboard', [
            'user'           => $user,
            'recentActivity' => $recent,
            'monthlyCount'   => $monthlyCount,
            'stats'          => [
                'totalItems'   => RecyclingRecord::where('user_id', $user->id)->count(),
                'totalWeight'  => round(RecyclingRecord::where('user_id', $user->id)->sum('weight_kg'), 1),
                'co2Avoided'   => round(RecyclingRecord::where('user_id', $user->id)->sum('weight_kg') * 2.3, 1),
                'pointsEarned' => RecyclingRecord::where('user_id', $user->id)->sum('points_earned'),
            ],
        ]);
    }
}
