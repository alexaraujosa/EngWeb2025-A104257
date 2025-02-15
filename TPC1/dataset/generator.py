import sys
import json

def open_json(filename):
    with open(filename, "r", encoding = "utf-8") as file:
        data = json.load(file)
    
    return data

def save_json(filename, data):
    with open(filename, "w", encoding = "utf-8") as file:
        json.dump(data, file, indent = 4, ensure_ascii=False)

def main(path):
    data = open_json(path)
    final_dictionary = {}

    lista_reparacoes = []
    id_reparacao = 0
    lista_intervencoes = []
    lista_viaturas = []

    for reparacao in data["reparacoes"]:
        entry_reparacao = {
            "id" : id_reparacao,
            "nif" : reparacao["nif"],
            "nome" : reparacao["nome"],
            "data" : reparacao["data"],
            "marca" : reparacao["viatura"]["marca"],
            "modelo" : reparacao["viatura"]["modelo"],
            "nr_intervencoes" : reparacao["nr_intervencoes"],
            "intervencoes" : []
        }
        for intervencao in reparacao["intervencoes"]:
            entry_reparacao["intervencoes"].append(intervencao["codigo"])
            if intervencao not in lista_intervencoes:
                lista_intervencoes.append(intervencao)
        
        lista_viaturas.append(reparacao["viatura"])
        lista_reparacoes.append(entry_reparacao)
        id_reparacao += 1


    final_dictionary.update({"reparacoes" : lista_reparacoes})
    final_dictionary.update({"intervencoes" : lista_intervencoes})
    final_dictionary.update({"viaturas" : lista_viaturas})
    
    # Final
    save_json("dataset_atualizado.json", final_dictionary)

if __name__ == "__main__":
    if len(sys.argv) >= 2:
        main(sys.argv[1])
    else:
        print("Missing arguments. usage: $ python3 generator.py dataset.json")