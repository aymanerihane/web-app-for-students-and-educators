@php
    $etud=app('App\Http\Controllers\addetudiant')->findetud();
@endphp
<table>
    <tr>
        <td>Nom</td>
        <td>{{auth()->user()->name}}</td>
    </tr>
    <tr>
        <td>CNE</td>
        <td>{{$etud->CNE}}</td>
    </tr>
    <tr>
        <td>Filliere</td>
        <td>{{app('App\Http\Controllers\filieres')->findfil($etud->id_Filiere)->nom}}</td>
    </tr>
        <tr>
            <td>Email</td>
        <td>{{auth()->user()->email}}</td>
    </tr>
</table>
