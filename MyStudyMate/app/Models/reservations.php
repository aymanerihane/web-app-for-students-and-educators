<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class reservations extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_reservation',
        'id_local',
        'jour',
        'creneau_horaire'
    ];
}
