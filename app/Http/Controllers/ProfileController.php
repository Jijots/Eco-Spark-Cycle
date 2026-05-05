<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Redemption;
use App\Models\RecyclingRecord;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function index(Request $request): Response
    {
        $user            = $request->user();
        $redemptions     = Redemption::where('user_id', $user->id)->latest()->get();
        $recyclingRecords = RecyclingRecord::where('user_id', $user->id)->latest('recycled_at')->take(10)->get();

        $rewards = [
            ['name' => 'SM Gift Card ₱100',      'points' => 500,  'icon' => '🎁'],
            ['name' => 'Grab Food Voucher',        'points' => 300,  'icon' => '🍔'],
            ['name' => 'Shopee ₱200 Voucher',      'points' => 800,  'icon' => '🛍️'],
            ['name' => 'Meralco Bill Credit',       'points' => 1200, 'icon' => '⚡'],
            ['name' => 'Lazada ₱150 Voucher',       'points' => 600,  'icon' => '📦'],
            ['name' => 'Plant a Tree',              'points' => 100,  'icon' => '🌱'],
        ];

        return Inertia::render('Profile', [
            'user'             => $user,
            'redemptions'      => $redemptions,
            'recyclingRecords' => $recyclingRecords,
            'availableRewards' => $rewards,
        ]);
    }

    public function redeem(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'reward_name'  => 'required|string|max:255',
            'points_spent' => 'required|integer|min:1',
        ]);

        $user = $request->user();

        if ($user->points_balance < $validated['points_spent']) {
            return back()->withErrors(['points' => 'Insufficient points balance.']);
        }

        Redemption::create([
            'user_id'      => $user->id,
            'reward_name'  => $validated['reward_name'],
            'points_spent' => $validated['points_spent'],
            'status'       => 'pending',
            'redeemed_at'  => now(),
        ]);

        $user->decrement('points_balance', $validated['points_spent']);

        return back()->with('success', 'Reward redeemed successfully!');
    }

    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status'          => session('status'),
        ]);
    }

    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile');
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->validate(['password' => ['required', 'current_password']]);

        $user = $request->user();
        Auth::logout();
        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
