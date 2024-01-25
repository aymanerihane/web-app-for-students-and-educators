@vite(["resources/CSS/annonce.css","resources/js/admin_ajax.js"])
<h1>Annonce list</h1>
<div class="listAnnonce">
    @php
        $annonces = app('App\Http\Controllers\Annonces')->showAnnoncesEtud();
    @endphp

    @if(is_countable($annonces) && count($annonces) > 0)
        @foreach ($annonces as $annonce)
            <div class="annonce-card">
                <div class="imgholder">
                    {{-- You can add an image here if needed --}}
                </div>
                <div class="containerAnnonceText" style="width: 100%;">
                    <h1 class="head-card">{{ $annonce->titre }}</h1>
                    <p class="text-card" style="width: 100%;">{{ $annonce->resume }}</p>
                </div>
            </div>
        @endforeach
    @else
        <p>No announcements available.</p>
    @endif
</div>
<script src="https://kit.fontawesome.com/e9d0d16c17.js" crossorigin="anonymous"></script>
