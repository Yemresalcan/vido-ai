#!/bin/bash

# Vido AI Release Script
# Usage: ./scripts/create-release.sh [version]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Get version from argument or prompt
if [ $# -eq 0 ]; then
    echo -e "${YELLOW}Enter the release version (e.g., 1.0.0):${NC}"
    read -r VERSION
else
    VERSION=$1
fi

# Validate version format
if [[ ! $VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    log_error "Invalid version format. Use semantic versioning (e.g., 1.0.0)"
    exit 1
fi

log_info "Creating release for version $VERSION"

# Check if we're on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    log_warning "You're not on main branch. Current branch: $CURRENT_BRANCH"
    echo "Do you want to continue? (y/N)"
    read -r CONTINUE
    if [ "$CONTINUE" != "y" ]; then
        log_info "Release cancelled"
        exit 0
    fi
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    log_error "You have uncommitted changes. Please commit or stash them first."
    exit 1
fi

# Update version in package.json files
log_info "Updating version in package.json files..."

# Backend setup.py
if [ -f "app/setup.py" ]; then
    sed -i.bak "s/version=\".*\"/version=\"$VERSION\"/" app/setup.py
    rm app/setup.py.bak
    log_success "Updated app/setup.py"
fi

# Frontend package.json
if [ -f "vido-site/package.json" ]; then
    sed -i.bak "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" vido-site/package.json
    rm vido-site/package.json.bak
    log_success "Updated vido-site/package.json"
fi

# Update API version in vido_api.py
if [ -f "app/vido_api.py" ]; then
    sed -i.bak "s/version=\".*\"/version=\"$VERSION\"/" app/vido_api.py
    rm app/vido_api.bak
    log_success "Updated API version in vido_api.py"
fi

# Commit version updates
git add .
git commit -m "chore: bump version to $VERSION"

# Create and push tag
log_info "Creating Git tag v$VERSION..."
git tag -a "v$VERSION" -m "Release version $VERSION"

log_info "Pushing changes and tags..."
git push origin main
git push origin "v$VERSION"

log_success "Release v$VERSION created successfully!"
log_info "GitHub Actions will automatically:"
log_info "  • Create a GitHub release"
log_info "  • Build and push Docker images"
log_info "  • Generate release notes"

echo
log_info "🔗 View release at: https://github.com/Yemresalcan/vido-ai/releases/tag/v$VERSION"
log_info "🐳 Docker images will be available at:"
log_info "  • yemresalcan/vido-ai-backend:$VERSION"
log_info "  • yemresalcan/vido-ai-frontend:$VERSION" 