<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kiosk extends Model
{
    protected $fillable = ['name', 'address', 'latitude', 'longitude', 'is_active'];
}
