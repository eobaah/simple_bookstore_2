\copy event(title,venue,event_date,start_time,price,details,image_url,genre) FROM './src/models/schema/seed/flyers_store.csv' DELIMITER ',' CSV HEADER;
