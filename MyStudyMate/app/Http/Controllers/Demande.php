<?php

namespace App\Http\Controllers;

use App\Models\Demande as ModelsDemande;
use App\Models\etudiant;
use App\Models\User;
use App\Models\Professeur;
use Illuminate\Http\Request;

class Demande extends Controller
{
    public function add(){
        $etud = etudiant::where('id_Utilisateur', auth()->user()->id)->first();
        $cne = $etud->CNE;
        ModelsDemande::create([
            'objet' => $_POST['object'],
            'TypeDemande' => $_POST['object'], // Assuming 'TypeDemande' should be assigned a different value
            'DescripDemande' => $_POST['discDem'],
            'statutDemande' => "En attente", // Fixed the typo in "en attend"
            'ReponseDemande' => "",
            'CNE' => $cne,
            'MatriculeProf' => $_POST['matcProf'],
            'id_departement' => 1,
        ]);

        return redirect('/etudiant/home');
    }
    public function find(){
        $prof = Professeur::where('id_Utilisateur', auth()->user()->id)->first();
        $idprof = $prof->MatriculeProf;
        $demandes = ModelsDemande::where('MatriculeProf', $idprof)->where('statutDemande', 'En attente')->get();
        return $demandes;
    }
    public function etuddemande(){
        $etud=etudiant::where('id_Utilisateur', auth()->user()->id)->first();
        $demandes = ModelsDemande::where('CNE', $etud->CNE)->get();
        return $demandes;
    }
    public function findetud($id){
        $idetud=etudiant::where('CNE', $id)->first();
        $iduser=User::where('id', $idetud->id_Utilisateur)->first();
        return $iduser;
    }
    public function findmessage($id){
        $message=ModelsDemande::where('id_demande', $id)->first();
        return $message;
    }
    public function reponse($id){
    ModelsDemande::where('id_demande', $id)->update([
                'ReponseDemande' => $_POST['reps'],
                'statutDemande' => $_POST['etat'],
            ]);
            return redirect('/prof/home');
     }
}
