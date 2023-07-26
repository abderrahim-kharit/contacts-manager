<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Organisation extends Model
{
    use SoftDeletes;

    protected $fillable = ["nom", "adresse", "cle", "code_postal", "ville", 'statut'];

    public function contacts()
    {
        return $this->hasMany(Contact::class);
    }

    public function setNomAttribute($value)
    {
        $this->attributes['nom'] = ucwords($value);
    }

    public function setVilleAttribute($value)
    {
        $this->attributes['ville'] = ucwords($value);
    }
}
