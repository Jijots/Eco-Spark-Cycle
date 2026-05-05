<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\RecyclingRecord;
use App\Models\Redemption;
use App\Models\Kiosk;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(KioskSeeder::class);

        $user = User::factory()->create([
            'name'           => 'Alex Rivera',
            'email'          => 'alex@example.com',
            'password'       => bcrypt('password'),
            'points_balance' => 2450,
        ]);

        $kiosks = Kiosk::all();

        $items = [
            ['item_type' => 'Smartphone',  'item_brand' => 'Samsung',  'weight_kg' => 0.18, 'points_earned' => 45],
            ['item_type' => 'Laptop',      'item_brand' => 'Dell',     'weight_kg' => 1.80, 'points_earned' => 180],
            ['item_type' => 'Tablet',      'item_brand' => 'Apple',    'weight_kg' => 0.50, 'points_earned' => 75],
            ['item_type' => 'Smartphone',  'item_brand' => 'Apple',    'weight_kg' => 0.17, 'points_earned' => 42],
            ['item_type' => 'Monitor',     'item_brand' => 'LG',       'weight_kg' => 4.20, 'points_earned' => 210],
            ['item_type' => 'Keyboard',    'item_brand' => 'Logitech', 'weight_kg' => 0.85, 'points_earned' => 42],
            ['item_type' => 'Battery Pack','item_brand' => 'Anker',    'weight_kg' => 0.30, 'points_earned' => 60],
            ['item_type' => 'Earbuds',     'item_brand' => 'Sony',     'weight_kg' => 0.05, 'points_earned' => 20],
        ];

        foreach ($items as $i => $item) {
            RecyclingRecord::create(array_merge($item, [
                'user_id'     => $user->id,
                'kiosk_id'    => $kiosks[$i % $kiosks->count()]->id,
                'recycled_at' => now()->subDays(rand(1, 60)),
            ]));
        }

        Redemption::create([
            'user_id'      => $user->id,
            'reward_name'  => 'SM Gift Card ₱100',
            'points_spent' => 500,
            'status'       => 'completed',
            'redeemed_at'  => now()->subDays(15),
        ]);

        Redemption::create([
            'user_id'      => $user->id,
            'reward_name'  => 'Grab Food Voucher',
            'points_spent' => 300,
            'status'       => 'pending',
            'redeemed_at'  => now()->subDays(2),
        ]);
    }
}
