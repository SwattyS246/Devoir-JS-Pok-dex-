document.addEventListener("DOMContentLoaded", function() {
  const body = document.querySelector("body");

  // Création des éléments HTML
  const header = document.createElement("header");
  header.innerHTML = `
    <div class="logo">
      <img src="téléchargé.png" alt="Logo">
    </div>
    <div class="search-bar">
      <input type="text" id="search-input" placeholder="Rechercher un Pokémon...">
      <button id="search-button">Rechercher</button>
    </div>
  `;
  body.appendChild(header);

  const container = document.createElement("div");
  container.className = "container";
  container.innerHTML = `
    <h1>Tous les Pokémons</h1>
    <div id="pokemon-list"></div>
  `;
  body.appendChild(container);

  const footer = document.createElement("footer");
  footer.innerHTML = `
    <p>Ce site est un projet Pokémon</p>
  `;
  body.appendChild(footer);

  // Fonction pour récupérer les données détaillées d'un Pokémon en utilisant son ID
  async function fetchPokemonDetails(id) {
    const apiUrl = "https://pokebuildapi.fr/api/v1/pokemon/";
    try {
      const response = await fetch(apiUrl + id);
      const pokemon = await response.json();
      console.log("Détails du Pokémon récupérés :", pokemon); // Vérification des données récupérées
      displayPokemonDetails(pokemon);
    } catch (error) {
      console.error("Erreur lors de la récupération des détails du Pokémon :", error);
    }
  }

  // Fonction pour afficher les détails d'un Pokémon
  function displayPokemonDetails(pokemon) {
    const pokemonListDiv = document.getElementById("pokemon-list");
    const pokemonDetailsDiv = document.getElementById("pokemon-details");

    // Cacher la liste des Pokémon
    pokemonListDiv.style.display = "none";

    // Effacer le conteneur des détails
    pokemonDetailsDiv.innerHTML = "";

    // Afficher le conteneur des détails
    pokemonDetailsDiv.style.display = "block";

    const detailsDiv = document.createElement("div");
    detailsDiv.className = "details-container";
    detailsDiv.innerHTML = `
      <h2>${pokemon.name}</h2>
      <img src="${pokemon.image}" alt="${pokemon.name}">
      <p><strong>Types:</strong> ${pokemon.apiTypes.map(type => type.name).join(", ")}</p>
      <p><strong>Stats:</strong></p>
      <ul>
        <li>HP: ${pokemon.stats.HP}</li>
        <li>Attaque: ${pokemon.stats.attack}</li>
        <li>Défense: ${pokemon.stats.defense}</li>
        <li>Attaque Spéciale: ${pokemon.stats.special_attack}</li>
        <li>Défense Spéciale: ${pokemon.stats.special_defense}</li>
        <li>Vitesse: ${pokemon.stats.speed}</li>
      </ul>
    `;
    pokemonDetailsDiv.appendChild(detailsDiv);
  }

  // Appel initial pour afficher la liste des Pokémon
  fetchPokemonList();

  // Fonction pour récupérer la liste des Pokémon depuis l'API
  async function fetchPokemonList() {
    const apiUrl = "https://pokebuildapi.fr/api/v1/pokemon/";
    try {
      const response = await fetch(apiUrl);
      const pokemons = await response.json();
      console.log("Liste des Pokémon récupérée :", pokemons); // Vérification des données récupérées
      displayPokemonList(pokemons);
    } catch (error) {
      console.error("Erreur lors de la récupération de la liste des Pokémon :", error);
    }
  }

  // Fonction pour afficher la liste des Pokémon
  function displayPokemonList(pokemons) {
    const pokemonListDiv = document.getElementById("pokemon-list");

    pokemons.forEach(pokemon => {
      const pokemonDiv = document.createElement("div");
      pokemonDiv.className = "pokemon";
      pokemonDiv.innerHTML = `
        <img src="${pokemon.image}" alt="${pokemon.name}">
        <h3>${pokemon.name}</h3>
        <p><strong>Types:</strong> ${pokemon.apiTypes.map(type => type.name).join(", ")}</p>
        <p><strong>Stats:</strong></p>
        <ul>
          <li>HP: ${pokemon.stats.HP}</li>
          <li>Attaque: ${pokemon.stats.attack}</li>
          <li>Défense: ${pokemon.stats.defense}</li>
          <li>Attaque Spéciale: ${pokemon.stats.special_attack}</li>
          <li>Défense Spéciale: ${pokemon.stats.special_defense}</li>
          <li>Vitesse: ${pokemon.stats.speed}</li>
        </ul>
      `;
      pokemonDiv.addEventListener("click", () => fetchPokemonDetails(pokemon.id));
      pokemonListDiv.appendChild(pokemonDiv);
    });
  }

  // Fonction pour rechercher un Pokémon par nom
  function searchPokemon() {
    const searchTerm = document.getElementById("search-input").value.trim().toLowerCase();
    const pokemonListDiv = document.getElementById("pokemon-list");
    pokemonListDiv.innerHTML = ""; // Effacer la liste des Pokémon actuelle

    if (searchTerm === "") {
      // Si la recherche est vide, afficher tous les Pokémon
      fetchPokemonList();
    } else {
      // Sinon, afficher uniquement les Pokémon dont le nom contient le terme de recherche
      const apiUrl = "https://pokebuildapi.fr/api/v1/pokemon/";
      fetch(apiUrl)
        .then(response => response.json())
        .then(pokemons => {
          const filteredPokemons = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
          displayPokemonList(filteredPokemons);
        })
        .catch(error => console.error("Erreur lors de la recherche de Pokémon :", error));
    }
  }

  // Événement pour le clic sur le bouton de recherche
  const searchButton = document.getElementById("search-button");
  searchButton.addEventListener("click", searchPokemon);
});
