#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}=>${NC} $1"
}

print_error() {
    echo -e "${RED}ERROR:${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}WARNING:${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18 or later"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version must be 18 or greater. Current version: $(node -v)"
    exit 1
fi

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    print_warning "MySQL is not installed. Please ensure you have MySQL 8+ installed and running"
fi

print_status "Installing dependencies..."
npm install

# Check if .env file exists
if [ ! -f .env ]; then
    print_status "Creating .env file from example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        print_status "Please configure your .env file with appropriate values"
    else
        print_error ".env.example file not found"
        exit 1
    fi
fi

# Setup database
print_status "Setting up database..."
print_status "Running Prisma migrations..."
npx prisma migrate dev

print_status "Seeding database..."
npx prisma db seed

print_status "Installation completed successfully!"
print_status "You can now start the development server with: npm run dev"
print_status "Access the application at: http://localhost:3000"