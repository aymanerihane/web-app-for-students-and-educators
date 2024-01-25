<?php

use App\Http\Controllers\addEtudiant;
use App\Http\Controllers\emploisDuTemps;
use App\Http\Controllers\annonces;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();
Route::middleware(['isRole'])->group(function () {
Route::get('auth/home', [App\Http\Controllers\Auth\HomeController::class, 'index'])->name('auth.home');
Route::get('chefDep/choixMode', [App\Http\Controllers\chefDep\HomeController::class, 'index'])->name('chefDep.choixMode');
Route::get('respFil/home', [App\Http\Controllers\respFill\HomeController::class, 'index'])->name('respFil.home');
Route::get('prof/home', [App\Http\Controllers\Professeur\HomeController::class, 'index'])->name('prof.home');
Route::get('etudiant/home', [App\Http\Controllers\etudiant\HomeController::class, 'index'])->name('etudiant.home');
Route::get('landing/home', [App\Http\Controllers\landing\HomeController::class, 'index'])->name('landing.home');
Route::post('auth/addEtudiant', [addEtudiant::class, 'create'])->name('auth.addEtudiant');
Route::post('choixMode/annonces', [annonces::class, 'add'])->name('annonces');
Route::post('prof/annonces', [annonces::class, 'addProf'])->name('profAnnonces');
Route::get('/fetch-annonce', [annonces::class, 'index']);
Route::get('/annonce/{id}/edit', [annonces::class, 'edit'])->name('annonce.edit');;
Route::post('annonce/{id}', [annonces::class, 'update'])->name('annonce.update');
Route::post('prof/annonceProf/{id}', [annonces::class, 'updateProf'])->name('annonce.updateProf');
Route::get('/annonce/{id}', [annonces::class, 'delete'])->name('annonce.delete');
Route::get('addEmploi', [emploisDuTemps::class, 'addEmploi']);
// web.php
Route::get('auth/affectationSalle', [App\Http\Controllers\Auth\HomeController::class, 'index'])->name('auth.affectationSalle');

});
Route::get('auth/emploi', function () {
    return view('auth.emploi');
});
Route::get('auth/affectationSalle', function () {
    return view('auth.affectationSalle');
});
Route::get('auth/addEtudiant', function () {
    return view('auth.addEtudiant');
});
Route::get('auth/emploisTemps', function () {
    return view('auth.emploisTemps');
});
Route::get('auth/list', function () {
    return view('auth.list');
});
Route::get('auth/formationChoix', function () {
    return view('auth.formationChoix');
});
    // Route::get('auth/choixSousFil', function () {
    //     return view('auth.choixSousFil');
    // });
Route::get('chefDep', function () {
    return view('chefDep.home');
});
Route::get('chefDep/annonce', function () {
    return view('chefDep.gererAnnonces');
});
Route::get('prof/annonce', function () {
    return view('prof.gererAnnonces');
});
Route::get('formAn', function () {
    return view('chefDep.formulaire_annance');
});
Route::get('prof/formAn', function () {
    return view('prof.formulaire_annance');
});
Route::get('edit', function () {
    return view('chefDep.editAnnonce');
});
Route::get('prof/edit', function () {
    return view('prof.editAnnonce');
});
Route::get('prof/repondreDemande', function () {
    return view('prof.repondreDemande');
});
Route::get('auth/allMembers', function () {
    return view('auth.allMembers');
});
Route::get('auth/etudMember', function () {
    return view('auth.etudMember');
});
Route::get('auth/profMember', function () {
    return view('auth.profMember');
});


Route::get('etudiant/annonceProf', function () {
    return view('etudiant.annonceProf');
});

