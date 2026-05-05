<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Kiosk;

class KioskSeeder extends Seeder
{
    public function run(): void
    {
        $kiosks = [
            ['name' => 'SM Mall of Asia Kiosk',      'address' => 'SM Mall of Asia, Pasay City',         'latitude' => 14.5354, 'longitude' => 120.9827, 'is_active' => true],
            ['name' => 'Robinsons Galleria Kiosk',    'address' => 'Robinsons Galleria, Quezon City',      'latitude' => 14.5843, 'longitude' => 121.0567, 'is_active' => true],
            ['name' => 'Ayala Center Makati Kiosk',   'address' => 'Ayala Center, Makati City',           'latitude' => 14.5547, 'longitude' => 121.0244, 'is_active' => true],
            ['name' => 'SM North EDSA Kiosk',         'address' => 'SM North EDSA, Quezon City',          'latitude' => 14.6560, 'longitude' => 121.0308, 'is_active' => true],
            ['name' => 'BGC High Street Kiosk',       'address' => 'BGC High Street, Taguig City',        'latitude' => 14.5501, 'longitude' => 121.0476, 'is_active' => false],
            ['name' => 'TriNoma Kiosk',               'address' => 'TriNoma Mall, Quezon City',           'latitude' => 14.6528, 'longitude' => 121.0326, 'is_active' => true],
        ];

        foreach ($kiosks as $kiosk) {
            Kiosk::create($kiosk);
        }
    }
}
