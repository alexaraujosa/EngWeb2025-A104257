import json

with open("dataset.json", "r", encoding="utf-8") as file:
    data = json.load(file)
    count = 0
    for entry in data:
        entry["_id"] = count
        entry["author"] = entry["author"].split(", ")
        entry["genres"] = entry["genres"][1:-1].strip().replace("'", "").split(", ")
        entry["characters"] = entry["characters"][1:-1].strip().replace("'", "").replace("\"", "").split(", ")
        entry["awards"] = entry["awards"][1:-1].strip().replace("'", "").replace("\"","").split(", ")
        entry["ratingsByStars"] = entry["ratingsByStars"][1:-1].strip().replace("'", "").split(", ")
        tmp = entry["setting"][1:-1].strip().split("',")
        new_setting = []
        for entry2 in tmp:
            new_setting.append(entry2.strip().replace("'", ""))
        entry["setting"] = new_setting
        count += 1

with open("data.json", "w", encoding="utf-8") as file:
    json.dump(data, file, indent=2, ensure_ascii=False)