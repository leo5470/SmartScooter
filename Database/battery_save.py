import json
import psycopg2

# Load the JSON data
with open('battery.json', 'r') as f:
    data = json.load(f)

print("scooter.json loaded successfully.")

# Connect to the PostgreSQL database
conn = psycopg2.connect(
    host="esoeoop23.postgres.database.azure.com",
    database="deploy",
    user="lcheng",
    password="b10505058!"
)

print("PostgreSQL db connected.")

# Open a cursor to perform database operations
cur = conn.cursor()

# Insert each location into the database
for location in data:
    cur.execute("""
        INSERT INTO station (id, lat, lng)
        VALUES (%s, %s, %s)
    """, (location['no'], location['lat'], location['lng']))

# Commit the changes and close the cursor and connection
conn.commit()
cur.close()
conn.close()

print("Insertion completed, connection closed.")
