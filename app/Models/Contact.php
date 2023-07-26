<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Contact extends Model
{
    use SoftDeletes;

    protected $fillable = ["nom", "prenom", "cle", "e_mail", "service", 'fonction', 'telephone_fixe', 'organisation_id'];

    public function organisation()
    {
        return $this->belongsTo(Organisation::class);
    }

    public function setPrenomAttribute($value)
    {
        $this->attributes['prenom'] = ucwords($value);
    }

    public function setNomAttribute($value)
    {
        $this->attributes['nom'] = ucwords($value);
    }

    public function setEmailAttribute($value)
    {
        $this->attributes['e_mail'] = strtolower($value);
    }
}
