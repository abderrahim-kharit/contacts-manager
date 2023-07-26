<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Organisation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $searchQuery = $request->query("search") ?? "";


        $contacts = Contact::where('nom',  "LIKE", "%" . $searchQuery . "%")
            ->orWhere('prenom',  "LIKE", "%" . $searchQuery . "%")
            ->orWhereHas('organisation',  fn ($orgQuery) => $orgQuery->where('nom', 'LIKE', "%" . $searchQuery . "%"))
            ->with('organisation')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Contacts', ['contacts' => $contacts, 'query' => $searchQuery]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validation = $this->validateInputs($request);

        $this->doublon($request);


        $entreprise = Organisation::create([
            "nom" => $validation['organisation_nom'],
            "statut" => $validation['organisation_statut'],
            "ville" => $validation['organisation_ville'],
            "adresse" => $validation['organisation_adresse'],
            "code_postal" => $validation['organisation_code_postal'],
        ]);

        $contact = Contact::create([
            "nom" => $validation['contact_nom'],
            "prenom" => $validation['contact_prenom'],
            "e_mail" => $validation['contact_e_mail'],
            "organisation_id" => $entreprise->id,
        ]);


        return to_route("contacts.index");
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contact $contact)
    {
        $validation = $this->validateInputs($request);

        $contact->update([
            "nom" => $validation['contact_nom'],
            "prenom" => $validation['contact_prenom'],
            "e_mail" => $validation['contact_e_mail'],
        ]);

        $contact->organisation()->update([
            'nom' => $validation['organisation_nom'],
            'statut' => $validation['organisation_statut'],
            'ville' => $validation['organisation_ville'],
            'adresse' => $validation['organisation_adresse'],
            'code_postal' => $validation['organisation_code_postal'],
        ]);


        return to_route("contacts.index");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();
        return to_route("contacts.index");
    }

    /**
     * Validation logique
     */
    private function validateInputs(Request $request)
    {
        return $request->validate([
            "contact_prenom" => "required|alpha",
            "contact_nom" => "required|alpha",
            "contact_e_mail" => "required|email",
            "organisation_nom" => "required|regex:/^[a-zA-Z0-9\s]+$/",
            "organisation_statut" => "required|in:CLIENT,PROSPECT,LEAD",
            "organisation_ville" => "required",
            "organisation_adresse" => "required",
            "organisation_code_postal" => "numeric",
        ]);
    }

    public function doublon(Request $request)
    {
        $contact = Contact::where('nom', $request->contact_nom)
            ->orWhere('prenom', $request->contact_prenom)
            ->exists();

        $organisation = Organisation::where('nom', $request->organisation_nom)
            ->exists();

        if ($contact && $organisation) {
            return response()->json(['doublon' => true, 'table' => 'both']);
        } elseif ($contact) {
            return response()->json(['doublon' => true, 'table' => 'contact']);
        } elseif ($organisation) {
            return response()->json(['doublon' => true, 'table' => 'organisation']);
        } else {
            return response()->json(['doublon' => false]);
        }
    }
}
