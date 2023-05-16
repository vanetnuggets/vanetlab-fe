# VANETLAB - Frontend

Po novom mame zdokerizovane aj toto. 
Mame spraveny docker-compose, ktory vie spustit FE aj s BE cez jeden prikaz. Je potrebne na to mat takuto suborovu strukturu (docs netreba):

```bash
tp
├── vanetlab-be
├── vanetlab-docs
└── vanetlab-fe
```

Nasledne staci spustit prikaz `docker-compose up --build`. Zbuildi images FE aj BE a vsetko fici. Appka bude bezat na `localhost:80`.
