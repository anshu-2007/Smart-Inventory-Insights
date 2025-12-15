import random

MOCK_DB = {
    "Parle-G Gold Biscuits": {"stock": 7, "threshold": 5},
    "Pepsi Soda Bottle": {"stock": 12, "threshold": 8},
    "Coca Cola": {"stock": 3, "threshold": 5},
    "Dairy Milk": {"stock": 9, "threshold": 5},
    "Maggi Noodles": {"stock": 2, "threshold": 4},
}

def lookup_inventory(item_name):
    if item_name in MOCK_DB:
        return MOCK_DB[item_name]
    stock = random.randint(0, 15)
    threshold = random.randint(3, 8)
    return {"stock": stock, "threshold": threshold}
