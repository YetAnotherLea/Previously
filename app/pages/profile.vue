<script>
    const fetchUserMovies = async () => {
        const myHeaders = new Headers();
        myHeaders.append("X-BetaSeries-Key", config.public.betaseriesClientId)
    
         const res = await fetch(`https://api.betaseries.com/movies/member`, {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        })
        
        if (!res.ok) {
            console.error('Erreur API :', res.status)
            return
        }
    }
    const result = await res.json()
    shows.value = result.shows
</script>

<template>
    <main>
        <h1>Profile</h1>
    </main>
</template>