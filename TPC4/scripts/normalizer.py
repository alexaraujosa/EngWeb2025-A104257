import sys
import json

with open(sys.argv[1], "r", encoding="utf-8") as file:
    data = json.load(file)

atores = {}

movie_index = 0
actor_index = 0
for entry in data["filmes"]:
    entry["id"] = movie_index
    movie_index += 1
    for ator in entry["cast"]:
        if ator not in atores:
            atores[ator] = {
                "id": actor_index,
                "nome": ator,
                "filmes": []
            }
            actor_index += 1
        atores[ator]["filmes"].append(entry["title"])

data["atores"] = list(atores.values())

with open(sys.argv[1], "w", encoding="utf-8") as file:
    json.dump(data, file, ensure_ascii=False, indent=2)    