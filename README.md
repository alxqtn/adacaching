# Caching avec Redis - Exercices Progressifs

Ce projet contient deux exercices pour apprendre le caching, de la mémorisation en mémoire simple au rate limiting avec Redis.

## 🚀 Installation

```bash
npm install
```

## Exercice 1 : Mémorisation (`src/ex1-memoize.ts`)

### 📚 Concepts

La mémorisation est une technique de caching qui permet de stocker les résultats d'une **fonction pure** pour éviter de recalculer les mêmes valeurs.

Une fonction pure est une fonction qui :

- retourne toujours le même résultat pour les mêmes arguments
- n'a pas d'effets de bord (ne modifie pas l'état externe)

**Cas d'usage courants :**

- Calculs coûteux (algorithmes complexes, traitement d'images)
- Fonctions récursives (fibonacci, factorielle)
- Appels API qui retournent les mêmes données
- Requêtes de base de données coûteuses

### À vous de jouer

**Objectif :** Implémenter une fonction `memoize` qui met en cache les résultats d'une fonction pure.

C'est une **fonction d'ordre supérieur** : elle prend une fonction en paramètre et retourne une nouvelle fonction qui "enveloppe" l'originale.

**Lancer l'exercice :**

```bash
npm run ex1
```

**Compléter :**

- La fonction `memoize` dans `src/ex1-memoize.ts`
- Décommentez le code de test une fois implémenté

## Exercice 2 : Rate Limiting avec Redis (`src/ex2-rate-limit.ts`)

### 📚 Concepts

Le rate limiting (limitation de débit) limite le nombre de requêtes qu'un utilisateur peut effectuer sur une période donnée.

**Pourquoi c'est important ?**

- Protéger vos serveurs contre la surcharge (DDoS, abus)
- Assurer une utilisation équitable des ressources
- Prévenir les abus et les attaques par force brute
- Gérer les coûts (APIs payantes, infrastructure)

**Plusieurs couches de protection**

Le rate limiting est souvent implémenté à plusieurs niveaux :

1. **Niveau réseau / firewall** — La première ligne de défense contre les attaques volumétriques (DDoS). Les firewalls et reverse proxies (nginx, Cloudflare, AWS WAF) filtrent le trafic avant qu'il n'atteigne vos serveurs.

2. **Niveau application** — Une couche supplémentaire pour un contrôle plus fin :
   - **Protéger les routes coûteuses** — Les opérations lourdes (génération de rapports, exports) consomment beaucoup de ressources. Un rate limit spécifique empêche la surcharge de ces routes.
   - **Sécuriser l'authentification** — Les endpoints de login sont vulnérables aux attaques par force brute. Un rate limit strict (ex: 5 tentatives/heure) protège contre ce type d'attaque ciblée.
   - **Différencier les utilisateurs** — Les utilisateurs authentifiés ou payants peuvent avoir des limites plus généreuses que les anonymes.

**La "clé" de rate limiting identifie ce qu'on limite :**

La ressource, souvent une route / un endpoint +

- **Adresse IP** - le plus courant, mais limité (IPs partagées)
- **ID utilisateur** - si l'utilisateur est authentifié
- **Token d'API** - pour les APIs avec authentification par token
- **Combinaison** - IP + endpoint, ou user ID + endpoint

### Installation & Configuration Redis

Vous avez deux options :

#### Option 1 : Redis local

**macOS :**

```bash
brew install redis
brew services start redis
```

**Windows (WSL) :**

```bash
sudo apt-get install redis-server
sudo service redis-server start
```

**Windows (Docker) :**

```bash
docker run -d -p 6379:6379 redis
```

Ensuite, installez le driver Redis (choisissez-en un) :

```bash
npm install ioredis
```

#### Option 2 : Upstash Redis (cloud)

1. Créez un compte gratuit sur [upstash.com](https://upstash.com)
2. Créez une base de données Redis
3. Copiez l'URL REST et le token
4. Créez un fichier `.env` à la racine du projet :

```bash
cp .env.example .env
```

Et ajoutez vos credentials Upstash dans le fichier `.env` :

```bash
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token_here
```

Installez le SDK Upstash :

```bash
npm install @upstash/redis
```

### À vous de jouer

**Objectif :** Implémenter un rate limiter distribué avec Redis.

**Étapes :**

1. Initialiser le client Redis (choisissez ioredis ou Upstash, allez lire la doc)
2. Implémenter la fonction `isAllowed`

**Lancer l'exercice :**

```bash
npm run ex2
```

**Compléter :**

- L'initialisation du client Redis dans `src/ex2-rate-limit.ts`
- La fonction `isAllowed`

**Note :** La fonction `createRateLimiter` est déjà implémentée pour vous. C'est un exemple de fonction d'ordre supérieur, similaire à `memoize` de l'exercice 1 !

## 🔗 Ressources

- [Commandes Redis](https://redis.io/commands/)
- [ioredis Documentation](https://github.com/luin/ioredis)
- [Upstash Redis Documentation](https://docs.upstash.com/redis)

## 📄 Licence

MIT
