<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Redemption extends Model
{
    protected $fillable = [
        'user_id', 'reward_name', 'points_spent', 'status', 'redeemed_at',
    ];

    protected $casts = ['redeemed_at' => 'datetime'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
