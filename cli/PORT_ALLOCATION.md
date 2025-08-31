# Dynamic Port Allocation System

## Overview

The Create T3 Chill App CLI now includes an intelligent port allocation system that automatically handles port conflicts when starting Supabase containers. This prevents the common issue where container startup fails due to ports already being in use.

## How It Works

### 1. Port Discovery

- **Checks default ports**: The system first tries to use the standard Supabase ports (54321-54327)
- **Detects conflicts**: Scans the system to identify which ports are already in use
- **Finds alternatives**: Automatically finds the next available ports when conflicts are detected

### 2. Configuration Updates

- **Supabase config**: Updates `supabase/config.toml` with the allocated ports
- **Environment files**: Updates `.env` and `.env.local` with correct database URLs and API endpoints
- **Template files**: Generates `.env.example` files with port-specific configurations

### 3. Retry Mechanism

- **Multiple attempts**: Tries up to 3 times to start containers with different port allocations
- **Graceful recovery**: If startup fails, automatically finds new ports and retries
- **Clean shutdown**: Properly stops partially started containers before retrying

## Default Port Mapping

| Service          | Default Port | Alternative Range |
| ---------------- | ------------ | ----------------- |
| API Server       | 54321        | 54322+            |
| Database         | 54322        | 54323+            |
| Studio Dashboard | 54323        | 54324+            |
| Inbucket (Email) | 54324        | 54325+            |
| Analytics        | 54327        | 54328+            |
| Shadow DB        | 54320        | 54321+            |

## Features

### ✅ **Automatic Conflict Resolution**

- No more manual port configuration
- Seamless handling of existing services
- Clear logging of port changes

### ✅ **Environment Synchronization**

- Automatic update of database URLs
- Correct API endpoints in environment files
- Template files reflect actual configuration

### ✅ **Robust Retry Logic**

- Multiple startup attempts with different ports
- Graceful error handling and recovery
- Detailed error messages and suggestions

### ✅ **Clear User Feedback**

- Port allocation status during setup
- Final service URLs displayed on completion
- Conflict resolution logged with explanations

## Error Handling

If port allocation fails after all retries, the CLI provides helpful suggestions:

- Ensure Docker Desktop is running
- Check for applications using the required ports
- Manual commands to resolve conflicts
- Docker troubleshooting steps

## Configuration Files Updated

The system automatically updates these files with the allocated ports:

- `supabase/config.toml` - Supabase service configuration
- `.env` - Database connection strings
- `.env.local` - Public API URLs and Supabase configuration
- `.env.example` - Template with port-specific examples
- `.env.local.example` - Template for public configuration

## Benefits

1. **Zero Configuration**: Works out of the box without user intervention
2. **Development Friendly**: Multiple instances can run simultaneously
3. **Production Ready**: Proper environment file management
4. **Error Resistant**: Handles edge cases and provides clear feedback
5. **Developer Experience**: No more manual port juggling

## Technical Implementation

The port allocation system consists of three main components:

1. **Port Finder** (`utils/port-finder.ts`): Discovers available ports
2. **Config Updater** (`utils/config-updater.ts`): Updates configuration files
3. **Container Manager** (`services/container-manager.ts`): Orchestrates the startup process

This system ensures that your development environment starts reliably every time, regardless of what other services might be running on your system.
