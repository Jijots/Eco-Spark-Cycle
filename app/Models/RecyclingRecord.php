<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RecyclingRecord extends Model
{
    protected $fillable = [
        'user_id', 'item_type', 'item_brand', 'weight_kg',
        'points_earned', 'kiosk_id', 'recycled_at',
    ];

    protected $casts = ['recycled_at' => 'datetime'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function kiosk()
    {
        return $this->belongsTo(Kiosk::class);
    }
}
