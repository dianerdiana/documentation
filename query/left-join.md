# Query Left Join dengan column yang sama

```sql
  SELECT table_1.*
  FROM table_1 
  LEFT JOIN table_2 
  ON table_1.column = table_2.column
```