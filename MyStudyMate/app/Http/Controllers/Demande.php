<?php

namespace App\Http\Controllers;

use App\Models\Demande as ModelsDemande;
use App\Models\etudiant;
use App\Models\Professeur;
use Illuminate\Http\Request;

class Demande extends Controller
{
    public function add(){
        $etud = etudiant::where('id_utilisiteur', auth()->user()->id)->first();
        $cne = $etud->CNE;
        ModelsDemande::create([
            'objet' => $_POST['object'],
            'TypeDemande' => $_POST['object'], // Assuming 'TypeDemande' should be assigned a different value
            'DescripDemande' => $_POST['discDem'],
            'statutDemande' => "en attente", // Fixed the typo in "en attend"
            'ReponseDemande' => "",
            'CNE' => $cne,
        ]);

        return redirect('/etudiant/home');
    }
    public function find(){
        $idprof=Professeur::where('id_Utilisateur', auth()->user()->id)->first();
        $demandes = ModelsDemande::where('MatriculeProfr', $idprof);
        return $demandes;
    }
    public function findetud($id){
        $idetud=etudiant::where('CNE', $id)->first();
        return $idetud->nom;
    }
    public function findmessage($id){
        $message=ModelsDemande::where('id_demande', $id)->first();
        return $message;
    }
    public function reponse($id){
        $message=ModelsDemande::where('id_demande', $id)->first();
        $message->update([
            'ReponseDemande' => $_POST['reps'],
            'statutDemande' => "Repondu",
        ]);
    }
}
