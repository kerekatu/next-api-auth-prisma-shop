# Migration `20201117102545-product-model`

This migration has been generated by Konrad Rosa at 11/17/2020, 11:25:45 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Product" (
"id" SERIAL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,

    PRIMARY KEY ("id")
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201117102545-product-model
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,15 @@
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Product {
+  id          Int     @id @default(autoincrement())
+  title       String
+  description String?
+  image       String?
+}
```


