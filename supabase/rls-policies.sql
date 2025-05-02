-- Enable Row-Level Security
ALTER TABLE "Vendor" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Product" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Order" ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for Vendor table
CREATE POLICY "Allow vendor to insert own data" ON "Vendor"
  FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Allow vendor to update own data" ON "Vendor"
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Allow vendor to select own data" ON "Vendor"
  FOR SELECT
  USING (auth.uid() = id);

-- Create RLS policies for Product table
CREATE POLICY "Allow vendor to insert own products" ON "Product"
  FOR INSERT
  WITH CHECK (auth.uid() = vendorId);

CREATE POLICY "Allow vendor to update own products" ON "Product"
  FOR UPDATE
  USING (auth.uid() = vendorId);

CREATE POLICY "Allow vendor to select own products" ON "Product"
  FOR SELECT
  USING (auth.uid() = vendorId);

-- Create RLS policies for Order table
CREATE POLICY "Allow vendor to insert own orders" ON "Order"
  FOR INSERT
  WITH CHECK (auth.uid() = vendorId);

CREATE POLICY "Allow vendor to update own orders" ON "Order"
  FOR UPDATE
  USING (auth.uid() = vendorId);

CREATE POLICY "Allow vendor to select own orders" ON "Order"
  FOR SELECT
  USING (auth.uid() = vendorId);
