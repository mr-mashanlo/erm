CREATE TABLE companies (
  id INT PRIMARY KEY IDENTITY(1, 1),
  name NVARCHAR(100) NOT NULL,
  slug NVARCHAR(100) NOT NULL,
  createdAt BIGINT,
);

CREATE TABLE roles (
  id INT PRIMARY KEY IDENTITY(1, 1),
  name NVARCHAR(100) NOT NULL,
  companyId INT REFERENCES companies(id) NOT NULL,
);

CREATE TABLE users (
  id INT PRIMARY KEY IDENTITY(1, 1),
  email NVARCHAR(100) UNIQUE NOT NULL,
  password NVARCHAR(512) NOT NULL,
  companyId INT REFERENCES companies(id) NOT NULL,
  refreshToken NVARCHAR(512),
  expiredAt BIGINT,
  createdAt BIGINT,
);

CREATE TABLE user_role (
  id INT PRIMARY KEY IDENTITY(1, 1),
  userId INT REFERENCES users(id) NOT NULL,
  roleId INT REFERENCES roles(id) NOT NULL,
);

CREATE TABLE departments (
  id INT PRIMARY KEY IDENTITY(1, 1),
  name NVARCHAR(512) NOT NULL,
  slug NVARCHAR(512) NOT NULL,
  companyId INT REFERENCES companies(id) NOT NULL,
);

CREATE TABLE employees (
  id INT PRIMARY KEY IDENTITY(1, 1),
  name NVARCHAR(100) NOT NULL,
  slug NVARCHAR(100) NOT NULL,
  companyId INT REFERENCES companies(id) NOT NULL,
  departmentId INT REFERENCES departments(id) NOT NULL,
  createdAt BIGINT,
  archived BIT,
);

CREATE TABLE user_employee (
  id INT PRIMARY KEY IDENTITY(1, 1),
  userId INT REFERENCES users(id) NOT NULL,
  employeeId INT REFERENCES employees(id) NOT NULL,
);

CREATE TABLE asset_types (
  id INT PRIMARY KEY IDENTITY(1, 1),
  name NVARCHAR(100) NOT NULL,
  slug NVARCHAR(100) NOT NULL,
  companyId INT REFERENCES companies(id) NOT NULL,
);

CREATE TABLE assets (
  id INT PRIMARY KEY IDENTITY(1, 1),
  name NVARCHAR(100) NOT NULL,
  slug NVARCHAR(100) NOT NULL,
  serialNumber NVARCHAR(100) NOT NULL,
  typeId INT REFERENCES asset_types(id) NOT NULL,
  companyId INT REFERENCES companies(id) NOT NULL,
  archived BIT,
);

CREATE TABLE asset_employee (
  id INT PRIMARY KEY IDENTITY(1, 1),
  assetId INT REFERENCES assets(id) NOT NULL,
  employeeId INT REFERENCES employees(id) NOT NULL,
  assigned_at BIGINT,
  returned_at BIGINT,
  archived BIT,
);